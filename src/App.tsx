import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { RadioProvider } from './context/RadioContext';
import { NewsProvider, useNews } from './context/NewsContext';
import { ActiveTab, Article, CategoryId, PushNotification } from './types';
import { INITIAL_NOTIFICATIONS, ARTICLES } from './data/mockData';

// Components
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { MiniPlayer } from './components/MiniPlayer';
import { Footer } from './components/Footer';
import { ArticleModal } from './components/ArticleModal';
import { ShareModal } from './components/ShareModal';
import { NotificationModal } from './components/NotificationModal';
import { SearchModal } from './components/SearchModal';
import { MenuDrawer } from './components/MenuDrawer';
import { WebsiteIntegrationModal } from './components/WebsiteIntegrationModal';
import { ThemeSettingsModal } from './components/ThemeSettingsModal';

// Views
import { HomeView } from './views/HomeView';
import { SimpleHomeView } from './views/SimpleHomeView';
import { LiveRadioView } from './views/LiveRadioView';
import { NewsView } from './views/NewsView';
import { CategoriesView } from './views/CategoriesView';
import { ProgramsView } from './views/ProgramsView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';

export function AppContent() {
  const { isConfigModalOpen, setIsConfigModalOpen } = useNews();
  const { viewMode, theme } = useTheme();
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [shareArticle, setShareArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [notifications, setNotifications] = useState<PushNotification[]>(INITIAL_NOTIFICATIONS);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);

  // Bookmark storage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('radiojoy_bookmarks') || localStorage.getItem('mwangaza_bookmarks');
      return saved ? JSON.parse(saved) : ['art-1'];
    } catch {
      return ['art-1'];
    }
  });

  const toggleBookmark = (articleId: string) => {
    setBookmarkedIds((prev) => {
      const updated = prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId];
      try {
        localStorage.setItem('radiojoy_bookmarks', JSON.stringify(updated));
      } catch (e) {
        console.warn('Storage error:', e);
      }
      return updated;
    });
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleSelectNotification = (notif: PushNotification) => {
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
    );
    setIsNotificationModalOpen(false);

    if (notif.relatedArticleId) {
      const art = ARTICLES.find((a) => a.id === notif.relatedArticleId);
      if (art) {
        setSelectedArticle(art);
      } else {
        setActiveTab('news');
      }
    } else if (notif.type === 'radio') {
      setActiveTab('radio');
    }
  };

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#040f1d] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadCount={unreadNotificationsCount}
        onOpenNotifications={() => setIsNotificationModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenMenuDrawer={() => setIsMenuDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {activeTab === 'home' && (
          viewMode === 'simple' ? (
            <SimpleHomeView
              onSelectArticle={setSelectedArticle}
              onOpenShare={setShareArticle}
              setActiveTab={setActiveTab}
              setSelectedCategory={setSelectedCategory}
            />
          ) : (
            <HomeView
              onSelectArticle={setSelectedArticle}
              onOpenShare={setShareArticle}
              setActiveTab={setActiveTab}
              setSelectedCategory={setSelectedCategory}
            />
          )
        )}

        {activeTab === 'radio' && (
          <LiveRadioView setActiveTab={setActiveTab} />
        )}

        {activeTab === 'news' && (
          <NewsView
            onSelectArticle={setSelectedArticle}
            onOpenShare={setShareArticle}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
          />
        )}

        {activeTab === 'categories' && (
          <CategoriesView
            onSelectArticle={setSelectedArticle}
            onOpenCategory={(catId) => {
              setSelectedCategory(catId);
              setActiveTab('news');
            }}
          />
        )}

        {activeTab === 'programs' && (
          <ProgramsView setActiveTab={setActiveTab} />
        )}

        {activeTab === 'about' && (
          <AboutView setActiveTab={setActiveTab} />
        )}

        {activeTab === 'contact' && (
          <ContactView />
        )}

        {activeTab === 'admin' && (
          <AdminView setActiveTab={setActiveTab} />
        )}
      </main>

      {/* Persistent Mini Player (Docked at bottom above mobile nav, keeps playing as user browses news) */}
      <MiniPlayer activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMenuDrawer={() => setIsMenuDrawerOpen(true)}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Modals & Drawers */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onSelectArticle={setSelectedArticle}
        onOpenShare={(art) => setShareArticle(art)}
        bookmarkedIds={bookmarkedIds}
        onToggleBookmark={toggleBookmark}
      />

      <ShareModal
        article={shareArticle}
        onClose={() => setShareArticle(null)}
      />

      {isNotificationModalOpen && (
        <NotificationModal
          notifications={notifications}
          onClose={() => setIsNotificationModalOpen(false)}
          onMarkAllRead={handleMarkAllNotificationsRead}
          onSelectNotification={handleSelectNotification}
        />
      )}

      {isSearchModalOpen && (
        <SearchModal
          onClose={() => setIsSearchModalOpen(false)}
          onSelectArticle={setSelectedArticle}
        />
      )}

      <MenuDrawer
        isOpen={isMenuDrawerOpen}
        onClose={() => setIsMenuDrawerOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNotifications={() => {
          setIsMenuDrawerOpen(false);
          setIsNotificationModalOpen(true);
        }}
        bookmarkedCount={bookmarkedIds.length}
        onOpenBookmarks={() => {
          setIsMenuDrawerOpen(false);
          setActiveTab('news');
        }}
        onOpenWebsiteIntegration={() => {
          setIsMenuDrawerOpen(false);
          setIsConfigModalOpen(true);
        }}
      />

      <WebsiteIntegrationModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
      />

      {/* Themes & View Mode Settings Modal */}
      <ThemeSettingsModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NewsProvider>
        <RadioProvider>
          <AppContent />
        </RadioProvider>
      </NewsProvider>
    </ThemeProvider>
  );
}
