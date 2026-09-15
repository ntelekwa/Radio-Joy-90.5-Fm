import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Article, NewsPagination, NewsSourceConfig, NewsSourceStatus } from '../types';
import {
  fetchNewsArticles,
  syncNewsWithWebsite,
  fetchNewsConfig,
  updateNewsConfig,
  testNewsConnection,
  getStoredOfflineArticles,
} from '../services/newsApi';
import { ARTICLES as INITIAL_FALLBACK_ARTICLES } from '../data/mockData';

interface NewsContextType {
  articles: Article[];
  allArticles: Article[];
  breakingNews: Article | null;
  trendingArticles: Article[];
  pagination: NewsPagination;
  sourceStatus: NewsSourceStatus | null;
  isLoading: boolean;
  isLoadingMore: boolean;
  isSyncing: boolean;
  syncToast: string | null;
  dismissSyncToast: () => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  refreshArticles: () => Promise<void>;
  syncWithWebsite: () => Promise<void>;
  loadMore: () => Promise<void>;
  config: NewsSourceConfig | null;
  saveConfig: (cfg: Partial<NewsSourceConfig>) => Promise<boolean>;
  testConnection: (type: string, url: string, apiKey?: string) => Promise<{ success: boolean; message: string; count: number; sample?: Article }>;
  isConfigModalOpen: boolean;
  setIsConfigModalOpen: (open: boolean) => void;
}

const defaultPagination: NewsPagination = {
  page: 1,
  perPage: 9,
  total: INITIAL_FALLBACK_ARTICLES.length,
  totalPages: Math.ceil(INITIAL_FALLBACK_ARTICLES.length / 9),
  hasMore: true,
};

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with offline cache or fallback articles for 0ms initial render
  const [articles, setArticles] = useState<Article[]>(() => {
    const offline = getStoredOfflineArticles();
    return offline?.articles && offline.articles.length > 0 ? offline.articles : INITIAL_FALLBACK_ARTICLES;
  });

  const [allArticles, setAllArticles] = useState<Article[]>(() => {
    const offline = getStoredOfflineArticles();
    return offline?.articles && offline.articles.length > 0 ? offline.articles : INITIAL_FALLBACK_ARTICLES;
  });

  const [pagination, setPagination] = useState<NewsPagination>(defaultPagination);
  const [sourceStatus, setSourceStatus] = useState<NewsSourceStatus | null>(null);
  const [config, setConfig] = useState<NewsSourceConfig | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);

  const dismissSyncToast = () => setSyncToast(null);

  // Load articles from API
  const loadArticles = useCallback(async (page = 1, isAppend = false, forceRefresh = false) => {
    if (page === 1 && !isAppend) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    try {
      const response = await fetchNewsArticles({
        page,
        perPage: 9,
        category: selectedCategory,
        search: searchQuery,
        refresh: forceRefresh,
      });

      if (isAppend) {
        setArticles(prev => {
          const existingIds = new Set(prev.map(a => a.id));
          const newItems = response.articles.filter(a => !existingIds.has(a.id));
          return [...prev, ...newItems];
        });
      } else {
        setArticles(response.articles);
        if (selectedCategory === 'all' && !searchQuery) {
          setAllArticles(response.articles);
        }
      }

      setPagination(response.pagination);
      setSourceStatus(response.sourceStatus);
    } catch (error) {
      console.error('[NewsProvider] Error loading articles:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [selectedCategory, searchQuery]);

  // Initial load and config fetch
  useEffect(() => {
    loadArticles(1, false, false);
    fetchNewsConfig().then(res => {
      if (res?.config) {
        setConfig(res.config);
      }
    });
  }, [loadArticles]);

  // Periodic background check (every 3 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      // Background silent refresh
      fetchNewsArticles({ page: 1, perPage: 9, category: 'all' })
        .then(response => {
          if (response.articles && response.articles.length > 0) {
            setAllArticles(response.articles);
            if (selectedCategory === 'all' && !searchQuery) {
              setArticles(response.articles);
              setPagination(response.pagination);
              setSourceStatus(response.sourceStatus);
            }
          }
        })
        .catch(() => {});
    }, 180000);

    return () => clearInterval(interval);
  }, [selectedCategory, searchQuery]);

  // Manual refresh
  const refreshArticles = async () => {
    await loadArticles(1, false, true);
  };

  // Sync with website (calls /api/news/sync to fetch new published articles from WordPress/RSS)
  const syncWithWebsite = async () => {
    setIsSyncing(true);
    setSyncToast('Inasawazisha na tovuti ya habari...');
    try {
      const result = await syncNewsWithWebsite();
      if (result.success && result.articles.length > 0) {
        setArticles(result.articles);
        setAllArticles(result.articles);
        setSyncToast(`Imefanikiwa! Habari mpya ${result.articles.length} zimesawazishwa kutoka kwenye tovuti yako.`);
        // Re-read pagination
        setPagination(prev => ({
          ...prev,
          page: 1,
          total: result.total,
          totalPages: Math.ceil(result.total / prev.perPage),
          hasMore: result.total > prev.perPage,
        }));
      } else {
        setSyncToast(result.message || 'Haikuweza kuvuta habari mpya kutoka kwenye tovuti.');
      }
    } catch (err: any) {
      setSyncToast(`Hitilafu ya kusawazisha: ${err.message}`);
    } finally {
      setIsSyncing(false);
      // Auto-dismiss toast after 6 seconds
      setTimeout(() => {
        setSyncToast(null);
      }, 6000);
    }
  };

  // Load more / infinite scroll trigger
  const loadMore = async () => {
    if (isLoadingMore || !pagination.hasMore) return;
    const nextPage = pagination.page + 1;
    await loadArticles(nextPage, true, false);
  };

  // Save new configuration
  const saveConfig = async (newConfig: Partial<NewsSourceConfig>): Promise<boolean> => {
    const res = await updateNewsConfig(newConfig);
    if (res.success && res.config) {
      setConfig(res.config);
      await syncWithWebsite();
      return true;
    }
    return false;
  };

  // Test connection
  const testConnection = async (type: string, url: string, apiKey?: string) => {
    return await testNewsConnection(type, url, apiKey);
  };

  // Derived state
  const breakingNews = articles.find(a => a.isBreaking) || allArticles.find(a => a.isBreaking) || articles[0] || null;
  const trendingArticles = (allArticles.length > 0 ? allArticles : articles).filter(a => a.isTrending).slice(0, 4);

  return (
    <NewsContext.Provider
      value={{
        articles,
        allArticles,
        breakingNews,
        trendingArticles,
        pagination,
        sourceStatus,
        isLoading,
        isLoadingMore,
        isSyncing,
        syncToast,
        dismissSyncToast,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        refreshArticles,
        syncWithWebsite,
        loadMore,
        config,
        saveConfig,
        testConnection,
        isConfigModalOpen,
        setIsConfigModalOpen,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = (): NewsContextType => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
