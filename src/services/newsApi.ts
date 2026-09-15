import { Article, NewsApiResponse, NewsPagination, NewsSourceConfig, NewsSourceStatus } from '../types';
import { ARTICLES as FALLBACK_ARTICLES } from '../data/mockData';

const CLIENT_CACHE_KEY = 'radiojoy_official_news_articles_v3';
const CLIENT_CACHE_TIME_KEY = 'radiojoy_official_news_articles_timestamp_v3';
const CLIENT_CACHE_MAX_AGE_MS = 10 * 60 * 1000; // 10 minutes client-side storage cache

// Helper to read from local storage
export function getStoredOfflineArticles(): { articles: Article[]; timestamp: number } | null {
  try {
    const raw = localStorage.getItem(CLIENT_CACHE_KEY);
    const rawTime = localStorage.getItem(CLIENT_CACHE_TIME_KEY);
    if (raw) {
      const articles = JSON.parse(raw);
      const timestamp = rawTime ? parseInt(rawTime, 10) : Date.now();
      return { articles, timestamp };
    }
  } catch (e) {
    console.warn('[newsApi] Failed to load offline cache from localStorage:', e);
  }
  return null;
}

// Helper to save to local storage
export function saveArticlesToOfflineStorage(articles: Article[]): void {
  try {
    localStorage.setItem(CLIENT_CACHE_KEY, JSON.stringify(articles));
    localStorage.setItem(CLIENT_CACHE_TIME_KEY, Date.now().toString());
  } catch (e) {
    console.warn('[newsApi] Failed to store articles in localStorage:', e);
  }
}

export interface FetchNewsParams {
  page?: number;
  perPage?: number;
  category?: string;
  search?: string;
  refresh?: boolean;
}

export async function fetchNewsArticles(params: FetchNewsParams = {}): Promise<NewsApiResponse> {
  const query = new URLSearchParams();
  if (params.page) query.set('page', params.page.toString());
  if (params.perPage) query.set('per_page', params.perPage.toString());
  if (params.category && params.category !== 'all') query.set('category', params.category);
  if (params.search) query.set('search', params.search);
  if (params.refresh) query.set('refresh', 'true');

  try {
    const res = await fetch(`/api/news?${query.toString()}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Server returned status ${res.status}`);
    }

    const data: NewsApiResponse = await res.json();

    // If first page of all articles, cache in localStorage for instant offline access
    if ((!params.page || params.page === 1) && (!params.category || params.category === 'all') && !params.search) {
      if (data.articles && data.articles.length > 0) {
        saveArticlesToOfflineStorage(data.articles);
      }
    }

    return data;
  } catch (err: any) {
    console.warn('[newsApi] Fetch failed, checking local browser cache:', err);

    // Attempt to load from offline browser cache
    const offline = getStoredOfflineArticles();
    let sourceArticles = offline?.articles && offline.articles.length > 0
      ? offline.articles
      : FALLBACK_ARTICLES;

    // Apply filtering
    if (params.category && params.category !== 'all') {
      sourceArticles = sourceArticles.filter(a => a.category === params.category);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      sourceArticles = sourceArticles.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    const page = params.page || 1;
    const perPage = params.perPage || 9;
    const total = sourceArticles.length;
    const totalPages = Math.ceil(total / perPage) || 1;
    const paginated = sourceArticles.slice((page - 1) * perPage, page * perPage);

    const fallbackStatus: NewsSourceStatus = {
      sourceType: 'wordpress',
      sourceUrl: 'https://mwangazafm.co.tz',
      lastSyncedAt: offline ? new Date(offline.timestamp).toLocaleTimeString() : 'Awamu Iliyopita',
      isCached: true,
      totalCached: sourceArticles.length,
      status: 'fallback',
      errorMessage: 'Mtandao hafifu au muunganisho wa nje haupatikani. Programu inatumia nakala ya hifadhi ya ndani.',
    };

    return {
      articles: paginated,
      pagination: {
        page,
        perPage,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
      sourceStatus: fallbackStatus,
    };
  }
}

// Trigger immediate sync on server to pull newly published articles
export async function syncNewsWithWebsite(): Promise<{ success: boolean; message: string; articles: Article[]; total: number }> {
  try {
    const res = await fetch('/api/news/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`Sync failed with HTTP ${res.status}`);
    }
    const data = await res.json();
    if (data.articles && data.articles.length > 0) {
      saveArticlesToOfflineStorage(data.articles);
    }
    return {
      success: true,
      message: data.message || 'Habari mpya zimesawazishwa kutoka kwenye tovuti yako!',
      articles: data.articles || [],
      total: data.pagination?.total || data.articles?.length || 0,
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Imeshindikana kusawazisha: ${err.message}`,
      articles: [],
      total: 0,
    };
  }
}

// Get active configuration from server
export async function fetchNewsConfig(): Promise<{ config: NewsSourceConfig; supportedAdapters: any[] } | null> {
  try {
    const res = await fetch('/api/news/config');
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Update configuration on server
export async function updateNewsConfig(newConfig: Partial<NewsSourceConfig>): Promise<{ success: boolean; message: string; config?: NewsSourceConfig }> {
  try {
    const res = await fetch('/api/news/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newConfig),
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

// Test connection to any website URL live
export async function testNewsConnection(type: string, url: string, apiKey?: string): Promise<{ success: boolean; message: string; count: number; sample?: Article }> {
  try {
    const res = await fetch('/api/news/test-connection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, url, apiKey }),
    });
    return await res.json();
  } catch (err: any) {
    return {
      success: false,
      message: `Hitilafu ya mtandao: ${err.message}`,
      count: 0,
    };
  }
}
