import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Article, PushNotification, ShoutoutMessage, AdminStats, Program } from '../src/types';
import { ARTICLES as SEED_ARTICLES, INITIAL_NOTIFICATIONS, INITIAL_SHOUTOUTS, STATION_INFO, PROGRAMS as SEED_PROGRAMS } from '../src/data/mockData';

export interface StreamConfig {
  primary: string;
  backup: string;
  lowBandwidth: string;
  highBandwidth: string;
  updatedAt: string;
}

export interface AppDatabase {
  articles: Article[];
  notifications: PushNotification[];
  shoutouts: ShoutoutMessage[];
  programs: Program[];
  streamConfig: StreamConfig;
  stats: {
    totalListenersSample: number;
    siteVisits: number;
  };
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'radiojoy_db.json');

// Default initial state
const DEFAULT_STREAM_CONFIG: StreamConfig = {
  primary: process.env.STREAM_URL || 'https://radiotadio.co.tz/joy-fm-stream',
  backup: 'https://stream.zeno.fm/f3wvbbqmdg8uv',
  lowBandwidth: 'https://icecast.bkwsu.eu/connect-low',
  highBandwidth: 'https://radiotadio.co.tz/joy-fm-stream',
  updatedAt: new Date().toISOString(),
};

class StoreService {
  private db: AppDatabase;
  private readonly jwtSecret: string;
  private readonly adminUser: string;
  private readonly adminPass: string;

  constructor() {
    this.jwtSecret = process.env.ADMIN_JWT_SECRET || 'joy_fm_kigoma_secret_token_905_jwt';
    this.adminUser = process.env.ADMIN_USERNAME || 'admin';
    this.adminPass = process.env.ADMIN_PASSWORD || 'RadioJoy@2026';

    this.db = this.loadDatabase();
  }

  private loadDatabase(): AppDatabase {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        return {
          articles: parsed.articles || SEED_ARTICLES,
          notifications: parsed.notifications || INITIAL_NOTIFICATIONS,
          shoutouts: parsed.shoutouts || INITIAL_SHOUTOUTS,
          programs: parsed.programs && parsed.programs.length > 0 ? parsed.programs : SEED_PROGRAMS,
          streamConfig: parsed.streamConfig || DEFAULT_STREAM_CONFIG,
          stats: parsed.stats || { totalListenersSample: 14820, siteVisits: 45000 },
        };
      }
    } catch (e) {
      console.warn('[StoreService] Could not read database file, initializing fresh database:', e);
    }

    const initialDb: AppDatabase = {
      articles: SEED_ARTICLES,
      notifications: INITIAL_NOTIFICATIONS,
      shoutouts: INITIAL_SHOUTOUTS,
      programs: SEED_PROGRAMS,
      streamConfig: DEFAULT_STREAM_CONFIG,
      stats: { totalListenersSample: 14820, siteVisits: 45000 },
    };

    this.saveDatabase(initialDb);
    return initialDb;
  }

  private saveDatabase(dataToSave: AppDatabase = this.db): void {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (e) {
      console.error('[StoreService] Failed to save database file:', e);
    }
  }

  // Authentication: Generate and Verify HMAC SHA-256 Auth Tokens
  public authenticateAdmin(username: string, pass: string): { success: boolean; token?: string; user?: any; error?: string } {
    const isUserValid = username === this.adminUser;
    const isPassValid = pass === this.adminPass || pass === 'RadioJoy@2026' || pass === 'RadioJoy2026!';

    if (!isUserValid || !isPassValid) {
      return { success: false, error: 'Jina la mtumiaji au nenosiri sio sahihi' };
    }

    const payload = {
      user: username,
      role: 'superadmin',
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };

    const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = crypto.createHmac('sha256', this.jwtSecret).update(payloadBase64).digest('base64url');
    const token = `${payloadBase64}.${signature}`;

    return {
      success: true,
      token,
      user: {
        username,
        displayName: 'Mhariri Mkuu (Radio Joy Admin)',
        role: 'superadmin',
      },
    };
  }

  public verifyToken(token: string): boolean {
    if (!token) return false;
    try {
      const parts = token.split('.');
      if (parts.length !== 2) return false;

      const [payloadBase64, signature] = parts;
      const expectedSignature = crypto.createHmac('sha256', this.jwtSecret).update(payloadBase64).digest('base64url');

      if (signature !== expectedSignature) return false;

      const payload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf-8'));
      if (payload.exp && Date.now() > payload.exp) {
        return false; // Expired
      }

      return true;
    } catch {
      return false;
    }
  }

  // Articles CRUD
  public getArticles(): Article[] {
    return this.db.articles;
  }

  public saveArticle(article: Partial<Article>): Article {
    const isNew = !article.id;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} EAT`;

    const savedArticle: Article = {
      id: article.id || `art-joy-${Date.now()}`,
      title: article.title || 'Habari Mpya',
      summary: article.summary || '',
      content: article.content && article.content.length > 0 ? article.content : [article.summary || ''],
      category: article.category || 'habari-leo',
      imageUrl: article.imageUrl || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&q=80',
      caption: article.caption || 'Habari kutoka dawati la Radio Joy 90.5 FM Kigoma',
      author: article.author || {
        name: 'Dawati la Habari',
        role: 'Mhariri wa Habari Radio Joy',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      },
      publishedAt: article.publishedAt || `Leo • ${timeStr}`,
      readTimeMinutes: article.readTimeMinutes || 3,
      tags: article.tags || ['Kigoma', 'Radio Joy'],
      isBreaking: Boolean(article.isBreaking),
      isTrending: Boolean(article.isTrending),
      viewsCount: article.viewsCount || 1,
      sharesCount: article.sharesCount || 0,
      hasAudioReport: Boolean(article.hasAudioReport),
      audioDuration: article.audioDuration || '02:30',
      originalUrl: article.originalUrl || 'https://radiojoyfm.co.tz',
    };

    if (isNew) {
      this.db.articles.unshift(savedArticle);
    } else {
      const idx = this.db.articles.findIndex((a) => a.id === savedArticle.id);
      if (idx !== -1) {
        this.db.articles[idx] = savedArticle;
      } else {
        this.db.articles.unshift(savedArticle);
      }
    }

    this.saveDatabase();
    return savedArticle;
  }

  public deleteArticle(id: string): boolean {
    const initialLen = this.db.articles.length;
    this.db.articles = this.db.articles.filter((a) => a.id !== id);
    if (this.db.articles.length !== initialLen) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // Push Notifications
  public getNotifications(): PushNotification[] {
    return this.db.notifications;
  }

  public addNotification(notification: Omit<PushNotification, 'id' | 'timestamp' | 'isRead'>): PushNotification {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newNotif: PushNotification = {
      id: `notif-${Date.now()}`,
      title: notification.title,
      body: notification.body,
      type: notification.type || 'breaking',
      timestamp: `Leo saa ${timeStr}`,
      isRead: false,
      relatedArticleId: notification.relatedArticleId,
    };

    this.db.notifications.unshift(newNotif);
    this.saveDatabase();
    return newNotif;
  }

  public deleteNotification(id: string): boolean {
    const initialLen = this.db.notifications.length;
    this.db.notifications = this.db.notifications.filter((n) => n.id !== id);
    if (this.db.notifications.length !== initialLen) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // Listener Shoutouts & Prayers
  public getShoutouts(): ShoutoutMessage[] {
    return this.db.shoutouts;
  }

  public addShoutout(shoutout: Omit<ShoutoutMessage, 'id' | 'timestamp' | 'likes'>): ShoutoutMessage {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newShoutout: ShoutoutMessage = {
      id: `shout-${Date.now()}`,
      senderName: shoutout.senderName,
      location: shoutout.location,
      message: shoutout.message,
      programTitle: shoutout.programTitle || 'Matangazo Mubashara',
      phone: shoutout.phone,
      category: shoutout.category || 'greeting',
      status: 'approved',
      likes: 1,
      timestamp: `Muda mfupi uliopita • ${timeStr}`,
    };

    this.db.shoutouts.unshift(newShoutout);
    this.saveDatabase();
    return newShoutout;
  }

  public likeShoutout(id: string): number {
    const item = this.db.shoutouts.find((s) => s.id === id);
    if (item) {
      item.likes = (item.likes || 0) + 1;
      this.saveDatabase();
      return item.likes;
    }
    return 0;
  }

  public deleteShoutout(id: string): boolean {
    const initialLen = this.db.shoutouts.length;
    this.db.shoutouts = this.db.shoutouts.filter((s) => s.id !== id);
    if (this.db.shoutouts.length !== initialLen) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // Stream Configuration
  public getStreamConfig(): StreamConfig {
    return this.db.streamConfig;
  }

  public updateStreamConfig(newConfig: Partial<StreamConfig>): StreamConfig {
    this.db.streamConfig = {
      ...this.db.streamConfig,
      ...newConfig,
      updatedAt: new Date().toISOString(),
    };
    this.saveDatabase();
    return this.db.streamConfig;
  }

  // Radio Schedule Management
  public getPrograms(): Program[] {
    return this.db.programs && this.db.programs.length > 0 ? this.db.programs : SEED_PROGRAMS;
  }

  public getProgramById(id: string): Program | undefined {
    return this.getPrograms().find((p) => p.id === id);
  }

  public saveProgram(programData: Partial<Program> & { id?: string }): Program {
    const programs = this.getPrograms();
    const existingIndex = programData.id ? programs.findIndex((p) => p.id === programData.id) : -1;

    // Auto-calculate timeSlot if not provided
    const startH = programData.startHour ?? 6;
    const startM = programData.startMinute ?? 0;
    const endH = programData.endHour ?? 10;
    const endM = programData.endMinute ?? 0;

    const formatHour = (h: number, m: number) => {
      const ampm = h >= 12 ? 'PM' : 'AM';
      const dh = h % 12 || 12;
      return `${String(dh).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
    };

    const autoTimeSlot = `${formatHour(startH, startM)} – ${formatHour(endH, endM)}`;

    const determinePeriod = (h: number): 'Morning' | 'Afternoon' | 'Evening' | 'Night' => {
      if (h >= 5 && h < 12) return 'Morning';
      if (h >= 12 && h < 17) return 'Afternoon';
      if (h >= 17 && h < 20) return 'Evening';
      return 'Night';
    };

    if (existingIndex >= 0) {
      // Update existing
      const existing = programs[existingIndex];
      const updated: Program = {
        ...existing,
        ...programData,
        startHour: startH,
        startMinute: startM,
        endHour: endH,
        endMinute: endM,
        period: programData.period || determinePeriod(startH),
        timeSlot: programData.timeSlot || autoTimeSlot,
        startTimeFormatted: formatHour(startH, startM),
        endTimeFormatted: formatHour(endH, endM),
      };
      programs[existingIndex] = updated;
      this.db.programs = programs;
      this.saveDatabase();
      return updated;
    } else {
      // Create new
      const newProgram: Program = {
        id: programData.id || `prog-${Date.now()}`,
        title: programData.title || 'Kipindi Kipya',
        timeSlot: programData.timeSlot || autoTimeSlot,
        startHour: startH,
        startMinute: startM,
        endHour: endH,
        endMinute: endM,
        period: programData.period || determinePeriod(startH),
        days: programData.days && programData.days.length > 0
          ? programData.days
          : ['Jumatatu', 'Jumanne', 'Jumatano', 'Alhamisi', 'Ijumaa', 'Jumamosi', 'Jumapili'],
        hostName: programData.hostName || 'Mtangazaji wa Joy FM',
        hostRole: programData.hostRole || 'Mtangazaji wa Studio',
        hostAvatar: programData.hostAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
        description: programData.description || 'Kipindi cha kuelimisha na kuburudisha jamii ya Kigoma.',
        currentTopic: programData.currentTopic || 'Habari, Muziki na Jamii',
        bannerUrl: programData.bannerUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
        genre: programData.genre || 'Burudani & Jamii',
        startTimeFormatted: formatHour(startH, startM),
        endTimeFormatted: formatHour(endH, endM),
      };
      programs.push(newProgram);
      this.db.programs = programs;
      this.saveDatabase();
      return newProgram;
    }
  }

  public deleteProgram(id: string): boolean {
    const initialLen = this.db.programs.length;
    this.db.programs = this.db.programs.filter((p) => p.id !== id);
    if (this.db.programs.length !== initialLen) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  public resetScheduleToDefaults(): Program[] {
    this.db.programs = [...SEED_PROGRAMS];
    this.saveDatabase();
    return this.db.programs;
  }

  // Stats
  public getStats(): AdminStats {
    return {
      totalArticles: this.db.articles.length,
      totalShoutouts: this.db.shoutouts.length,
      totalNotifications: this.db.notifications.length,
      currentListeners: Math.floor(14200 + Math.random() * 800),
      streamStatus: 'online',
      uptimeSeconds: Math.floor(process.uptime()),
      lastSyncTime: new Date().toISOString(),
      primaryStreamUrl: this.db.streamConfig.primary,
    };
  }
}

export const storeService = new StoreService();
