import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LumaLogo } from './LumaLogo';

interface TopAppBarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onToggleMobileDrawer?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  theme,
  onToggleTheme,
  searchQuery,
  onSearchChange,
  onToggleMobileDrawer,
}) => {
  const { t, i18n } = useTranslation();
  const [isMac, setIsMac] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent || ''));

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(nextLang);
    try {
      localStorage.setItem('luma_docs_lang', nextLang);
    } catch {}
  };

  return (
    <header className="top-app-bar">
      <div className="top-bar-left">
        {/* Mobile Hamburger Menu Button */}
        <button
          type="button"
          className="icon-button mobile-menu-btn"
          onClick={onToggleMobileDrawer}
          aria-label={t('nav.openMenu')}
          title={t('nav.openMenu')}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <a href="#getting-started" className="brand-link">
          <LumaLogo size={36} />
          <div>
            <span className="brand-title">Luma UI</span>
          </div>
        </a>
        <span className="version-badge">v0.1.0</span>
      </div>

      <div className="top-bar-search">
        <div
          className="search-input-wrapper"
          onClick={() => searchInputRef.current?.focus()}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.6, flexShrink: 0 }}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            ref={searchInputRef}
            type="text"
            className="search-input"
            placeholder={t('nav.search')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <kbd
            className="search-shortcut"
            title={isMac ? `${t('topBar.shortcutMac')}` : `${t('topBar.shortcutWin')}`}
          >
            {isMac ? '⌘ K' : 'Ctrl + K'}
          </kbd>
        </div>
      </div>

      <div className="top-bar-actions">
        {/* Language Switcher */}
        <button
          type="button"
          className="lang-toggle-btn"
          onClick={handleToggleLanguage}
          title={i18n.language === 'en' ? 'Chuyển sang Tiếng Việt' : 'Switch to English'}
          aria-label="Toggle language"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <span style={{ fontWeight: 700, letterSpacing: '0.5px' }}>
            {i18n.language === 'en' ? 'EN' : 'VI'}
          </span>
        </button>

        {/* Theme Toggle Button */}
        <button
          className="icon-button"
          onClick={onToggleTheme}
          title={theme === 'light' ? t('topBar.themeDark') : t('topBar.themeLight')}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )}
        </button>

        {/* GitHub Link */}
        <a
          href="https://github.com/aokidai/react-native-luma-ui"
          target="_blank"
          rel="noreferrer"
          className="icon-button"
          title="GitHub Repository"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
      </div>
    </header>
  );
};

