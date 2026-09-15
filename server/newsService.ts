import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';
import { Article, CategoryId, NewsSourceConfig, NewsSourceStatus } from '../src/types';
import { storeService } from './store';

// Storage path for dynamic configuration override (if user saves settings through UI)
const CONFIG_FILE_PATH = path.join(process.cwd(), 'news-config.json');

// HTML Entity decoder helper
function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&#8217;|&#8216;/g, "'")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
    .replace(/&#8211;|&#8212;|&ndash;|&mdash;/g, '—')
    .replace(/&#038;|&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .trim();
}

// Strip HTML tags and clean whitespace
function stripHtmlTags(html: string): string {
  if (!html) return '';
  return decodeHtmlEntities(
    html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

// Extract first image URL from HTML content
function extractFirstImage(html: string): string | null {
  if (!html) return null;
  const match = html.match(/<img[^>]+src=["']([^"'>]+)["']/i);
  return match ? match[1] : null;
}

// Parse HTML content into readable paragraph array
function htmlToParagraphs(html: string): string[] {
  if (!html) return [];
  // Split by paragraph or double line breaks
  const rawParts = html
    .split(/<\/(?:p|div|blockquote|h[1-6]|li)>/i)
    .map(p => stripHtmlTags(p))
    .filter(p => p.length > 20);

  if (rawParts.length > 0) return rawParts;

  // Fallback: split by newlines
  const text = stripHtmlTags(html);
  return text
    .split(/\n+/)
    .map(t => t.trim())
    .filter(t => t.length > 20);
}

// Map any category title/slug to one of our 6 standard categories
function normalizeCategory(catStr?: string): CategoryId {
  if (!catStr) return 'kitaifa';
  const c = catStr.toLowerCase();

  if (c.includes('michezo') || c.includes('sport') || c.includes('football') || c.includes('simba') || c.includes('yanga') || c.includes('ligikuu') || c.includes('nbc')) {
    return 'michezo';
  }
  if (c.includes('burudani') || c.includes('entertainment') || c.includes('muziki') || c.includes('music') || c.includes('bongo') || c.includes('filamu') || c.includes('cinema') || c.includes('celebrity')) {
    return 'burudani';
  }
  if (c.includes('biashara') || c.includes('business') || c.includes('uchumi') || c.includes('economy') || c.includes('fedha') || c.includes('finance') || c.includes('soko') || c.includes('market')) {
    return 'biashara';
  }
  if (c.includes('teknolojia') || c.includes('tech') || c.includes('science') || c.includes('digital') || c.includes('simu') || c.includes('ai') || c.includes('sayansi')) {
    return 'teknolojia';
  }
  if (c.includes('kimataifa') || c.includes('international') || c.includes('dunia') || c.includes('world') || c.includes('foreign') || c.includes('kenya') || c.includes('uganda') || c.includes('afrika') || c.includes('global')) {
    return 'kimataifa';
  }

  return 'kitaifa';
}

// Format date relative or Swahili timestamp
function formatSwahiliDate(dateStr?: string): string {
  if (!dateStr) return 'Leo • Imesawazishwa';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;

    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Hivi punde';
    if (diffMins < 60) return `Dakika ${diffMins} zilizopita`;
    if (diffHours < 24) return `Masaa ${diffHours} yaliyopita`;
    if (diffDays === 1) return 'Jana';
    if (diffDays < 7) return `Siku ${diffDays} zilizopita`;

    return d.toLocaleDateString('sw-TZ', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// Default fallback image if none found
const FALLBACK_IMAGES: Record<CategoryId, string> = {
  'habari-leo': 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&q=80',
  kitaifa: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&q=80',
  kimataifa: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=1200&q=80',
  michezo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&q=80',
  burudani: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80',
  jamii: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80',
  biashara: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&q=80',
  teknolojia: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
};

// In-Memory Cache Store
interface CacheStore {
  articles: Article[];
  timestamp: number;
  sourceUrl: string;
  sourceType: string;
  status: 'connected' | 'syncing' | 'error' | 'fallback';
  errorMessage?: string;
}

let memoryCache: CacheStore = {
  articles: [],
  timestamp: 0,
  sourceUrl: '',
  sourceType: '',
  status: 'fallback',
};

export class NewsService {
  private rssParser: Parser;

  constructor() {
    this.rssParser = new Parser({
      customFields: {
        item: [
          ['media:content', 'mediaContent', { keepArray: true }],
          ['media:thumbnail', 'mediaThumbnail', { keepArray: true }],
          ['content:encoded', 'contentEncoded'],
          ['dc:creator', 'dcCreator'],
        ],
      },
    });
  }

  // Retrieve current active configuration
  public getConfig(): NewsSourceConfig {
    // Check saved file override first
    try {
      if (fs.existsSync(CONFIG_FILE_PATH)) {
        const fileContent = fs.readFileSync(CONFIG_FILE_PATH, 'utf-8');
        const parsed = JSON.parse(fileContent);
        if (parsed.url && parsed.type) {
          return {
            type: parsed.type,
            url: parsed.url,
            apiKey: parsed.apiKey || process.env.NEWS_API_KEY || '',
            cacheTtlSeconds: Number(parsed.cacheTtlSeconds) || Number(process.env.NEWS_CACHE_TTL_SECONDS) || 300,
            autoSyncIntervalMinutes: Number(parsed.autoSyncIntervalMinutes) || 5,
            name: parsed.name || 'Tovuti Kuu ya Habari',
          };
        }
      }
    } catch (e) {
      console.warn('[NewsService] Could not read config file, falling back to env:', e);
    }

    // Default to Environment Variables or Radio Joy 90.5 FM official website
    const type = (process.env.NEWS_SOURCE_TYPE || 'wordpress') as NewsSourceConfig['type'];
    const url = process.env.NEWS_SOURCE_URL || 'https://radiojoyfm.co.tz';
    const apiKey = process.env.NEWS_API_KEY || '';
    const cacheTtlSeconds = Number(process.env.NEWS_CACHE_TTL_SECONDS) || 300;

    return {
      type,
      url,
      apiKey,
      cacheTtlSeconds,
      autoSyncIntervalMinutes: 5,
      name: type === 'editorial'
        ? 'Chumba cha Habari cha Radio Joy 90.5 FM (Editorial Newsroom)'
        : 'Tovuti Rasmi ya Radio Joy 90.5 FM (radiojoyfm.co.tz)',
    };
  }

  // Update and persist configuration
  public updateConfig(newConfig: Partial<NewsSourceConfig>): NewsSourceConfig {
    const current = this.getConfig();
    const updated: NewsSourceConfig = {
      ...current,
      ...newConfig,
    };

    try {
      fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8');
    } catch (err) {
      console.error('[NewsService] Failed to write config file:', err);
    }

    // Invalidate cache immediately on configuration change
    this.invalidateCache();
    return updated;
  }

  // Invalidate in-memory cache
  public invalidateCache(): void {
    memoryCache.timestamp = 0;
  }

  // Fetch articles from WordPress REST API
  private async fetchWordPressArticles(baseUrl: string, apiKey?: string): Promise<Article[]> {
    // Normalise base url: strip trailing slash
    const cleanUrl = baseUrl.replace(/\/+$/, '');
    // Support either direct wp-json link or root domain
    const endpoint = cleanUrl.includes('/wp-json')
      ? `${cleanUrl}?_embed=1&per_page=50`
      : `${cleanUrl}/wp-json/wp/v2/posts?_embed=1&per_page=50`;

    const headers: Record<string, string> = {
      'User-Agent': 'RadioJoyFM-App/2.0 (Mobile News Aggregator; +https://radiojoyfm.co.tz)',
      'Accept': 'application/json',
    };
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch(endpoint, {
      headers,
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (!response.ok) {
      throw new Error(`WordPress API returned HTTP ${response.status}: ${response.statusText}`);
    }

    const posts = await response.json();
    if (!Array.isArray(posts)) {
      throw new Error('WordPress API response did not contain an array of posts');
    }

    const topicImages: Record<string, string> = {
      ardhi: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
      maji: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f2?w=1200&q=80',
      afya: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&q=80',
      elimu: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80',
      michezo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&q=80',
      barabara: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1200&q=80',
      polisi: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
      soko: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=1200&q=80',
      mwenge: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1200&q=80',
      tamasha: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80',
      default: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&q=80',
    };

    const getTopicImage = (t: string): string => {
      const lower = t.toLowerCase();
      if (lower.includes('ardhi') || lower.includes('e-ardhi')) return topicImages.ardhi;
      if (lower.includes('maji') || lower.includes('luhuru') || lower.includes('nyamnyunsi')) return topicImages.maji;
      if (lower.includes('mama') || lower.includes('afya') || lower.includes('njiti') || lower.includes('fefo') || lower.includes('wajawazito')) return topicImages.afya;
      if (lower.includes('sekondari') || lower.includes('shule') || lower.includes('madawati') || lower.includes('bwalo') || lower.includes('elimu') || lower.includes('malezi')) return topicImages.elimu;
      if (lower.includes('cup') || lower.includes('mayeye') || lower.includes('mpira') || lower.includes('soka')) return topicImages.michezo;
      if (lower.includes('barabara') || lower.includes('tarura') || lower.includes('wahandisi')) return topicImages.barabara;
      if (lower.includes('polisi') || lower.includes('takukuru') || lower.includes('ulinzi') || lower.includes('mahakama')) return topicImages.polisi;
      if (lower.includes('soko') || lower.includes('usafi') || lower.includes('pamba') || lower.includes('mpunga') || lower.includes('biashara')) return topicImages.soko;
      if (lower.includes('mwenge')) return topicImages.mwenge;
      if (lower.includes('tamasha') || lower.includes('urithi')) return topicImages.tamasha;
      return topicImages.default;
    };

    const getSmartCategory = (title: string, text: string): CategoryId => {
      const t = (title + ' ' + text).toLowerCase();
      if (t.includes('cup') || t.includes('mpira') || t.includes('michezo') || t.includes('soka') || t.includes('ligi')) return 'michezo';
      if (t.includes('afya') || t.includes('dawa') || t.includes('mama') || t.includes('hospitali') || t.includes('njiti') || t.includes('fefo') || t.includes('magonjwa')) return 'jamii';
      if (t.includes('e-ardhi') || t.includes('ardhi') || t.includes('tehama') || t.includes('teknolojia') || t.includes('kielektroniki')) return 'teknolojia';
      if (t.includes('soko') || t.includes('pamba') || t.includes('biashara') || t.includes('famasi') || t.includes('uchumi') || t.includes('shilingi') || t.includes('milioni') || t.includes('bilioni')) return 'biashara';
      if (t.includes('tamasha') || t.includes('urithi') || t.includes('muziki') || t.includes('burudani')) return 'burudani';
      if (t.includes('elimu') || t.includes('shule') || t.includes('madawati') || t.includes('bwalo') || t.includes('maji') || t.includes('nyamnyunsi') || t.includes('malezi')) return 'jamii';
      return 'habari-leo';
    };

    const extractReporterName = (rawHtml: string): string => {
      const reporters = [
        'Josephine Kiravu',
        'Orida Sayon',
        'Lucas Hoha',
        'Hagai Ruyagila',
        'Emmanuel Kamangu',
        'Sadick Kibwana',
        'Wazo Mwang’onda'
      ];
      for (const r of reporters) {
        if (rawHtml.toLowerCase().includes(r.toLowerCase())) {
          return r;
        }
      }
      if (rawHtml.includes('Mwandishi wetu') || rawHtml.includes('Mwandishi Wetu')) {
        return 'Mwandishi Wetu';
      }
      return 'Chumba cha Habari cha Radio Joy';
    };

    return posts.map((post: any, index: number): Article => {
      const title = decodeHtmlEntities(post.title?.rendered || 'Habari Isiyo na Kichwa');
      const excerpt = stripHtmlTags(post.excerpt?.rendered || '');
      const rawHtml = post.content?.rendered || '';
      const content = htmlToParagraphs(rawHtml);
      if (content.length === 0 && excerpt) {
        content.push(excerpt);
      }

      // Smart category and image matching
      const category = getSmartCategory(title, excerpt + ' ' + rawHtml);
      const media = post._embedded?.['wp:featuredmedia']?.[0];
      const imageUrl =
        media?.source_url ||
        media?.media_details?.sizes?.large?.source_url ||
        post.featured_media_src_url ||
        extractFirstImage(rawHtml) ||
        getTopicImage(title + ' ' + excerpt);

      // Extract author
      const authorName = extractReporterName(rawHtml);
      const authorAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80';

      // Published date
      const dateStr = post.date || post.date_gmt || new Date().toISOString();
      const publishedAt = formatSwahiliDate(dateStr);

      // Estimated read time
      const wordCount = (excerpt + ' ' + content.join(' ')).split(/\s+/).length;
      const readTimeMinutes = Math.max(2, Math.round(wordCount / 180));

      // Extract location tags
      const tags: string[] = [];
      const fullSearch = (title + ' ' + excerpt).toLowerCase();
      if (fullSearch.includes('uvinza')) tags.push('Uvinza');
      if (fullSearch.includes('kibondo')) tags.push('Kibondo');
      if (fullSearch.includes('kasulu')) tags.push('Kasulu');
      if (fullSearch.includes('buhigwe')) tags.push('Buhigwe');
      if (fullSearch.includes('kakonko')) tags.push('Kakonko');
      if (fullSearch.includes('kigoma')) tags.push('Kigoma');
      if (fullSearch.includes('mwenge')) tags.push('Mwenge wa Uhuru');
      if (tags.length === 0) tags.push('Kigoma', 'Habari');

      return {
        id: `joy-${post.id || index}`,
        title,
        summary: excerpt || content[0] || 'Soma taarifa kamili mtandaoni.',
        content: content.length > 0 ? content : ['Soma habari hii kamili kwenye tovuti yetu.'],
        rawHtml,
        category,
        imageUrl,
        caption: decodeHtmlEntities(media?.caption?.rendered || title),
        author: {
          name: authorName,
          role: 'Mwandishi wa Habari • Radio Joy 90.5 FM',
          avatar: authorAvatar,
        },
        publishedAt,
        readTimeMinutes,
        tags,
        isBreaking: index === 0,
        isTrending: index >= 1 && index <= 3,
        viewsCount: 600 + (posts.length - index) * 50,
        sharesCount: 40 + (posts.length - index) * 7,
        originalUrl: post.link || baseUrl,
        sourceType: 'wordpress',
      };
    });
  }

  // Fetch articles from RSS / Atom Feed
  private async fetchRssArticles(feedUrl: string): Promise<Article[]> {
    let targetUrl = feedUrl;
    if (!targetUrl.includes('.xml') && !targetUrl.includes('feed') && !targetUrl.includes('rss')) {
      targetUrl = targetUrl.replace(/\/+$/, '') + '/feed';
    }

    const feed = await this.rssParser.parseURL(targetUrl);
    if (!feed || !feed.items || feed.items.length === 0) {
      throw new Error('RSS Feed did not return any items.');
    }

    return feed.items.map((item: any, index: number): Article => {
      const title = decodeHtmlEntities(item.title || 'Habari Mpya');
      const rawHtml = item.contentEncoded || item['content:encoded'] || item.content || item.summary || '';
      const excerpt = stripHtmlTags(item.contentSnippet || item.summary || item.description || '');
      const content = htmlToParagraphs(rawHtml);
      if (content.length === 0 && excerpt) {
        content.push(excerpt);
      }

      // Image resolution: enclosure, media:content, media:thumbnail, or parsed img tag
      let imageUrl: string | null = null;
      if (item.enclosure?.url) {
        imageUrl = item.enclosure.url;
      } else if (item.mediaContent?.[0]?.$?.url) {
        imageUrl = item.mediaContent[0].$.url;
      } else if (item.mediaThumbnail?.[0]?.$?.url) {
        imageUrl = item.mediaThumbnail[0].$.url;
      } else {
        imageUrl = extractFirstImage(rawHtml) || extractFirstImage(item.description || '');
      }

      const primaryCat = item.categories?.[0] || '';
      const category = normalizeCategory(typeof primaryCat === 'string' ? primaryCat : primaryCat?._ || '');
      if (!imageUrl) {
        imageUrl = FALLBACK_IMAGES[category];
      }

      const authorName = decodeHtmlEntities(item.dcCreator || item.creator || item.author || feed.title || 'Mhariri wa Mwangaza');
      const publishedAt = formatSwahiliDate(item.pubDate || item.isoDate);

      const wordCount = (excerpt + ' ' + content.join(' ')).split(/\s+/).length;
      const readTimeMinutes = Math.max(2, Math.round(wordCount / 180));

      return {
        id: `rss-${index}-${Date.now()}`,
        title,
        summary: excerpt || (content[0] ? content[0].slice(0, 200) + '...' : 'Soma taarifa kamili.'),
        content: content.length > 0 ? content : ['Soma habari hii kamili kwenye tovuti yetu.'],
        rawHtml,
        category,
        imageUrl,
        author: {
          name: authorName,
          role: 'Chumba cha Habari',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        },
        publishedAt,
        readTimeMinutes,
        tags: Array.isArray(item.categories) ? item.categories.slice(0, 3).map((c: any) => typeof c === 'string' ? c : c?._ || '') : [],
        isBreaking: index === 0,
        isTrending: index < 3,
        viewsCount: Math.floor(Math.random() * 800) + 150,
        sharesCount: Math.floor(Math.random() * 90) + 10,
        originalUrl: item.link || targetUrl,
        sourceType: 'rss',
      };
    });
  }

  // Fetch articles from Generic JSON or Custom REST API
  private async fetchCustomJsonArticles(apiUrl: string, apiKey?: string): Promise<Article[]> {
    const headers: Record<string, string> = {
      'User-Agent': 'MwangazaFM-App/2.0 (Custom JSON Feed)',
      'Accept': 'application/json',
    };
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch(apiUrl, {
      headers,
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`Custom JSON API error HTTP ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    const rawList = Array.isArray(json)
      ? json
      : Array.isArray(json.articles)
      ? json.articles
      : Array.isArray(json.posts)
      ? json.posts
      : Array.isArray(json.data)
      ? json.data
      : [];

    if (rawList.length === 0) {
      throw new Error('Could not find articles array in JSON API response');
    }

    return rawList.map((item: any, idx: number): Article => {
      const title = decodeHtmlEntities(item.title || item.name || item.heading || 'Habari');
      const excerpt = stripHtmlTags(item.excerpt || item.summary || item.description || '');
      const rawHtml = item.content || item.body || item.text || '';
      const content = Array.isArray(item.content)
        ? item.content
        : htmlToParagraphs(rawHtml);

      const category = normalizeCategory(item.category || item.genre || item.section);
      const imageUrl = item.imageUrl || item.image || item.featuredImage || item.thumbnail || FALLBACK_IMAGES[category];

      return {
        id: `custom-${item.id || idx}-${Date.now()}`,
        title,
        summary: excerpt || content[0] || '',
        content: content.length > 0 ? content : ['Taarifa kamili ya habari hii ipo mtandaoni.'],
        rawHtml: typeof rawHtml === 'string' ? rawHtml : undefined,
        category,
        imageUrl,
        author: {
          name: typeof item.author === 'string' ? item.author : item.author?.name || 'Mwandishi',
          role: item.author?.role || 'Mhariri',
          avatar: item.author?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
        },
        publishedAt: formatSwahiliDate(item.publishedAt || item.published_at || item.date || item.createdAt),
        readTimeMinutes: Number(item.readTimeMinutes) || 3,
        tags: Array.isArray(item.tags) ? item.tags : [category],
        viewsCount: Number(item.viewsCount) || 450,
        sharesCount: Number(item.sharesCount) || 35,
        originalUrl: item.url || item.link || apiUrl,
        sourceType: 'custom',
      };
    });
  }

  // Test connection to any given URL and return sample articles
  public async testConnection(type: NewsSourceConfig['type'], url: string, apiKey?: string): Promise<{ success: boolean; message: string; count: number; sample?: Article }> {
    if (type === 'editorial') {
      const articles = storeService.getArticles();
      return {
        success: true,
        message: `Dawati la Habari la Radio Joy 90.5 FM lipo tayari! Habari ${articles.length} zimehaririwa na zipo hewani.`,
        count: articles.length,
        sample: articles[0],
      };
    }

    try {
      if (!url || !url.startsWith('http')) {
        return {
          success: false,
          message: 'Tafadhali weka URL sahihi inayoanza na https:// au http://',
          count: 0,
        };
      }

      let articles: Article[] = [];
      if (type === 'wordpress') {
        articles = await this.fetchWordPressArticles(url, apiKey);
      } else if (type === 'rss') {
        articles = await this.fetchRssArticles(url);
      } else if (type === 'json' || type === 'custom') {
        articles = await this.fetchCustomJsonArticles(url, apiKey);
      }

      return {
        success: true,
        message: `Muunganisho umefanikiwa! Habari ${articles.length} zimepatikana kutoka kwenye tovuti yako.`,
        count: articles.length,
        sample: articles[0],
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Hitilafu ya kuunganisha: ${err.message || 'Haikuweza kupokea taarifa kutoka kwenye URL uliyoweka.'}`,
        count: 0,
      };
    }
  }

  // Main method: Retrieve articles with caching, fallback, and pagination
  public async getArticles(options?: {
    forceRefresh?: boolean;
    page?: number;
    perPage?: number;
    category?: string;
    search?: string;
  }): Promise<{
    articles: Article[];
    pagination: {
      page: number;
      perPage: number;
      total: number;
      totalPages: number;
      hasMore: boolean;
    };
    sourceStatus: NewsSourceStatus;
  }> {
    const config = this.getConfig();
    const now = Date.now();
    const ttlMs = config.cacheTtlSeconds * 1000;
    const isCacheValid = (now - memoryCache.timestamp) < ttlMs && memoryCache.articles.length > 0;
    const isEditorialMode = config.type === 'editorial' || !config.url;

    if (isEditorialMode) {
      // In editorial mode, load station editorial database with zero remote network failure
      const currentArticles = storeService.getArticles();
      if (memoryCache.articles.length === 0 || memoryCache.sourceType !== 'editorial' || memoryCache.articles.length !== currentArticles.length) {
        memoryCache = {
          articles: currentArticles.map(a => ({
            ...a,
            sourceType: 'editorial',
            originalUrl: a.originalUrl || `https://radiojoyfm.co.tz/habari/${a.id}`,
          })),
          timestamp: now,
          sourceUrl: 'Chumba cha Habari cha Ndani (Radio Joy 90.5 FM Editorial Desk)',
          sourceType: 'editorial',
          status: 'connected',
        };
      }
    } else {
      const shouldFetchFresh = options?.forceRefresh || !isCacheValid || memoryCache.sourceUrl !== config.url;

      if (shouldFetchFresh) {
        memoryCache.status = 'syncing';
        try {
          let freshArticles: Article[] = [];

          if (config.type === 'wordpress') {
            freshArticles = await this.fetchWordPressArticles(config.url, config.apiKey);
          } else if (config.type === 'rss') {
            freshArticles = await this.fetchRssArticles(config.url);
          } else if (config.type === 'json' || config.type === 'custom') {
            freshArticles = await this.fetchCustomJsonArticles(config.url, config.apiKey);
          }

          if (freshArticles && freshArticles.length > 0) {
            memoryCache = {
              articles: freshArticles,
              timestamp: now,
              sourceUrl: config.url,
              sourceType: config.type,
              status: 'connected',
            };
          } else {
            throw new Error('No articles returned from website source');
          }
        } catch (error: any) {
          // Graceful fallback to verified store archive without logging noisy error/warn
          const currentArticles = storeService.getArticles();
          if (memoryCache.articles.length === 0) {
            memoryCache = {
              articles: currentArticles.map(a => ({
                ...a,
                sourceType: 'editorial',
                originalUrl: a.originalUrl || `${config.url}/habari/${a.id}`,
              })),
              timestamp: now,
              sourceUrl: config.url,
              sourceType: config.type,
              status: 'fallback',
              errorMessage: `Tovuti kwa sasa haipatikani moja kwa moja. Programu inaonyesha habari zilizohifadhiwa.`,
            };
          } else {
            memoryCache.status = 'fallback';
            memoryCache.errorMessage = `Data ya akiba inaonyeshwa wakati wa kusubiri tovuti.`;
          }
        }
      }
    }

    // Filter by Category
    let result = [...memoryCache.articles];
    if (options?.category && options.category !== 'all') {
      result = result.filter(a => a.category === options.category);
    }

    // Filter by Search Query
    if (options?.search && options.search.trim()) {
      const q = options.search.toLowerCase().trim();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.author.name.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Pagination
    const page = Math.max(1, Number(options?.page) || 1);
    const perPage = Math.max(1, Number(options?.perPage) || 9);
    const total = result.length;
    const totalPages = Math.ceil(total / perPage) || 1;
    const startIndex = (page - 1) * perPage;
    const paginatedArticles = result.slice(startIndex, startIndex + perPage);

    const sourceStatus: NewsSourceStatus = {
      sourceType: config.type,
      sourceUrl: config.url,
      lastSyncedAt: new Date(memoryCache.timestamp).toLocaleTimeString('sw-TZ', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      isCached: isCacheValid && !options?.forceRefresh,
      totalCached: memoryCache.articles.length,
      status: memoryCache.status,
      errorMessage: memoryCache.errorMessage,
    };

    return {
      articles: paginatedArticles,
      pagination: {
        page,
        perPage,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
      sourceStatus,
    };
  }
}

export const newsService = new NewsService();
