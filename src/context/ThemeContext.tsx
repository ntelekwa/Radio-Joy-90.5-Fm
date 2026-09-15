import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppTheme, ViewMode, TextScale } from '../types';

interface ThemeContextType {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
  textScale: TextScale;
  setTextScale: (scale: TextScale) => void;
  isThemeSettingsOpen: boolean;
  setIsThemeSettingsOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial theme from localStorage with 'dark' as default
  const [theme, setThemeState] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem('radiojoy_theme') as AppTheme;
      if (saved && ['dark', 'light', 'sepia', 'contrast'].includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.warn('Storage read error for theme', e);
    }
    return 'dark';
  });

  // Load initial viewMode (standard or simple)
  const [viewMode, setViewModeState] = useState<ViewMode>(() => {
    try {
      const saved = localStorage.getItem('radiojoy_view_mode') as ViewMode;
      if (saved && ['standard', 'simple'].includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.warn('Storage read error for viewMode', e);
    }
    return 'standard';
  });

  // Load textScale
  const [textScale, setTextScaleState] = useState<TextScale>(() => {
    try {
      const saved = localStorage.getItem('radiojoy_text_scale') as TextScale;
      if (saved && ['normal', 'large', 'xlarge'].includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.warn('Storage read error for textScale', e);
    }
    return 'normal';
  });

  const [isThemeSettingsOpen, setIsThemeSettingsOpen] = useState(false);

  // Sync theme changes to DOM and localStorage
  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('radiojoy_theme', newTheme);
    } catch (e) {
      console.warn('Storage write error for theme', e);
    }
  };

  const setViewMode = (newMode: ViewMode) => {
    setViewModeState(newMode);
    try {
      localStorage.setItem('radiojoy_view_mode', newMode);
    } catch (e) {
      console.warn('Storage write error for viewMode', e);
    }
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'simple' ? 'standard' : 'simple');
  };

  const setTextScale = (newScale: TextScale) => {
    setTextScaleState(newScale);
    try {
      localStorage.setItem('radiojoy_text_scale', newScale);
    } catch (e) {
      console.warn('Storage write error for textScale', e);
    }
  };

  // Apply classes to documentElement
  useEffect(() => {
    const root = document.documentElement;
    // Remove previous theme classes
    root.classList.remove('theme-dark', 'theme-light', 'theme-sepia', 'theme-contrast');
    root.classList.add(`theme-${theme}`);

    // Text scale classes
    root.classList.remove('text-scale-normal', 'text-scale-large', 'text-scale-xlarge');
    root.classList.add(`text-scale-${textScale}`);

    // Simple view helper class
    if (viewMode === 'simple') {
      root.classList.add('simple-view-mode');
    } else {
      root.classList.remove('simple-view-mode');
    }
  }, [theme, textScale, viewMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        viewMode,
        setViewMode,
        toggleViewMode,
        textScale,
        setTextScale,
        isThemeSettingsOpen,
        setIsThemeSettingsOpen,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
