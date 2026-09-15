export type CategoryId = 'habari-leo' | 'kitaifa' | 'kimataifa' | 'michezo' | 'burudani' | 'jamii' | 'biashara' | 'teknolojia';

export interface Category {
  id: CategoryId;
  name: string;
  nameSwahili: string;
  slug: string;
  count: number;
  color: string;
  accentBg: string;
  description: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string[];
  category: CategoryId;
  imageUrl: string;
  caption?: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  tags: string[];
  isBreaking?: boolean;
  isTrending?: boolean;
  viewsCount: number;
  sharesCount: number;
  hasAudioReport?: boolean;
  audioDuration?: string;
  originalUrl?: string;
  sourceType?: 'wordpress' | 'rss' | 'json' | 'custom' | 'editorial';
  rawHtml?: string;
}

export type NewsSourceType = 'editorial' | 'wordpress' | 'rss' | 'json' | 'custom';

export interface NewsSourceConfig {
  type: NewsSourceType;
  url: string;
  apiKey?: string;
  cacheTtlSeconds: number;
  autoSyncIntervalMinutes: number;
  name?: string;
}

export interface NewsPagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface NewsSourceStatus {
  sourceType: NewsSourceType;
  sourceUrl: string;
  lastSyncedAt: string;
  isCached: boolean;
  totalCached: number;
  status: 'connected' | 'syncing' | 'error' | 'fallback';
  errorMessage?: string;
}

export interface NewsApiResponse {
  articles: Article[];
  pagination: NewsPagination;
  sourceStatus: NewsSourceStatus;
}

export type ProgramPeriod = 'Morning' | 'Afternoon' | 'Evening' | 'Night';

export interface Program {
  id: string;
  title: string;
  timeSlot: string;
  startHour: number; // 0-23
  startMinute: number; // 0-59
  endHour: number;   // 0-23
  endMinute: number; // 0-59
  period: ProgramPeriod;
  days: string[];    // e.g. ['Jumatatu', 'Jumanne', ...] or ['Kila Siku']
  hostName?: string;
  hostRole?: string;
  hostAvatar?: string;
  description: string;
  currentTopic: string;
  bannerUrl: string;
  genre: string;
  startTimeFormatted?: string; // e.g. '06:00 AM'
  endTimeFormatted?: string;   // e.g. '10:00 AM'
}

export interface StationFrequency {
  city: string;
  frequency: string;
  region: string;
  transmitter: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  shows: string[];
}

export type StreamQuality = '64k' | '128k' | '256k';

export interface ShoutoutMessage {
  id: string;
  senderName: string;
  location: string;
  message: string;
  timestamp: string;
  likes: number;
  programTitle: string;
  phone?: string;
  category?: 'greeting' | 'prayer' | 'song_request';
  status?: 'approved' | 'pending';
}

export interface PushNotification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  type: 'breaking' | 'radio' | 'sports' | 'reminder';
  isRead: boolean;
  relatedArticleId?: string;
}

export interface AdminUser {
  username: string;
  displayName: string;
  role: 'superadmin' | 'editor';
  token: string;
}

export interface AdminStats {
  totalArticles: number;
  totalShoutouts: number;
  totalNotifications: number;
  currentListeners: number;
  streamStatus: 'online' | 'degraded' | 'offline';
  uptimeSeconds: number;
  lastSyncTime: string;
  primaryStreamUrl: string;
}

export type ActiveTab = 'home' | 'radio' | 'news' | 'categories' | 'programs' | 'about' | 'contact' | 'admin';

export type AppTheme = 'dark' | 'light' | 'sepia' | 'contrast';
export type ViewMode = 'standard' | 'simple';
export type TextScale = 'normal' | 'large' | 'xlarge';
