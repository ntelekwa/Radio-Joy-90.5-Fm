import fs from 'fs';

const raw = fs.readFileSync('/tmp/fetched_radiojoy_posts.json', 'utf8');
const posts = JSON.parse(raw);

function decodeHtml(str) {
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
    .replace(/<[^>]+>/g, '')
    .trim();
}

function getCategory(title, text) {
  const t = (title + ' ' + text).toLowerCase();
  if (t.includes('cup') || t.includes('mpira') || t.includes('michezo')) return 'michezo';
  if (t.includes('afya') || t.includes('dawa') || t.includes('mama') || t.includes('hospitali') || t.includes('njiti')) return 'jamii';
  if (t.includes('e-ardhi') || t.includes('ardhi') || t.includes('tehama') || t.includes('teknolojia')) return 'teknolojia';
  if (t.includes('shilingi') || t.includes('milioni') || t.includes('bilioni') || t.includes('soko') || t.includes('biashara')) return 'biashara';
  if (t.includes('burudani') || t.includes('tamasha') || t.includes('muziki')) return 'burudani';
  return 'kitaifa';
}

function getSpecificImage(title, text) {
  const t = (title + ' ' + text).toLowerCase();
  if (t.includes('ardhi') || t.includes('e-ardhi')) {
    return 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80';
  }
  if (t.includes('maji') || t.includes('luhuru') || t.includes('nyamnyunsi')) {
    return 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f2?w=1200&q=80';
  }
  if (t.includes('mama') || t.includes('afya') || t.includes('njiti') || t.includes('fefo')) {
    return 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&q=80';
  }
  if (t.includes('sekondari') || t.includes('shule') || t.includes('madawati') || t.includes('bwalo')) {
    return 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80';
  }
  if (t.includes('cup') || t.includes('mayeye') || t.includes('mpira')) {
    return 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&q=80';
  }
  if (t.includes('barabara') || t.includes('tarura') || t.includes('wahandisi')) {
    return 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=1200&q=80';
  }
  if (t.includes('polisi') || t.includes('takukuru') || t.includes('ulinzi')) {
    return 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80';
  }
  if (t.includes('soko') || t.includes('usafi')) {
    return 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=1200&q=80';
  }
  if (t.includes('mwenge')) {
    return 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1200&q=80';
  }
  return 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&q=80';
}

function extractReporter(rawHtml) {
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
  return 'Chumba cha Habari Radio Joy';
}

function extractParagraphs(rawHtml) {
  const parts = rawHtml
    .split(/<\/(?:p|div|blockquote|h[1-6]|li)>/i)
    .map(p => decodeHtml(p))
    .filter(p => p.length > 25 && !p.startsWith('Source') && !p.includes('The post') && !p.includes('appeared first on'));
  
  if (parts.length > 0) return parts;
  const cleaned = decodeHtml(rawHtml);
  return [cleaned];
}

function formatDate(isoStr) {
  try {
    const d = new Date(isoStr);
    return d.toLocaleDateString('sw-TZ', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return 'Septemba 2026';
  }
}

const articles = posts.map((p, index) => {
  const title = decodeHtml(p.title.rendered);
  const rawHtml = p.content.rendered;
  const paragraphs = extractParagraphs(rawHtml);
  const excerpt = decodeHtml(p.excerpt.rendered) || paragraphs[0] || '';
  const category = getCategory(title, excerpt);
  const imageUrl = getSpecificImage(title, excerpt);
  const reporter = extractReporter(rawHtml);
  const publishedAt = formatDate(p.date);

  const tags = [];
  const text = (title + ' ' + excerpt).toLowerCase();
  if (text.includes('uvinza')) tags.push('Uvinza');
  if (text.includes('kibondo')) tags.push('Kibondo');
  if (text.includes('kasulu')) tags.push('Kasulu');
  if (text.includes('buhigwe')) tags.push('Buhigwe');
  if (text.includes('kakonko')) tags.push('Kakonko');
  if (text.includes('kigoma')) tags.push('Kigoma');
  if (text.includes('mwenge')) tags.push('Mwenge wa Uhuru');
  if (tags.length === 0) tags.push('Kigoma', 'Habari');

  return {
    id: `joy-${p.id}`,
    title,
    summary: excerpt,
    content: paragraphs,
    rawHtml,
    category,
    imageUrl,
    caption: title,
    author: {
      name: reporter,
      role: 'Mwandishi wa Habari • Radio Joy 90.5 FM',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    },
    publishedAt,
    readTimeMinutes: Math.max(2, Math.round(paragraphs.join(' ').split(/\s+/).length / 120)),
    tags,
    isBreaking: index === 0,
    isTrending: index >= 1 && index <= 3,
    viewsCount: 650 + (posts.length - index) * 55,
    sharesCount: 45 + (posts.length - index) * 8,
    originalUrl: p.link,
    sourceType: 'wordpress'
  };
});

fs.writeFileSync('/tmp/formatted_articles.json', JSON.stringify(articles, null, 2));
console.log('Successfully formatted', articles.length, 'articles from radiojoyfm.co.tz');
