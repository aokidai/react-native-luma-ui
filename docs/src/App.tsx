import React, { useState, useEffect } from 'react';
import './theme/m3.css';
import { TopAppBar } from './components/TopAppBar';
import { NavDrawer } from './components/NavDrawer';
import { GettingStarted } from './pages/GettingStarted';
import { ColorSystemPage } from './pages/ColorSystemPage';
import { ComponentDocPage } from './pages/ComponentDocPage';
import { COMPONENTS_DATA } from './data/componentsData';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeId, setActiveId] = useState<string>('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Sync theme with html data-theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle hash navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveId(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectNav = (id: string) => {
    setActiveId(id);
    setMobileDrawerOpen(false);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredComponents = COMPONENTS_DATA.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedComponent = COMPONENTS_DATA.find((c) => c.id === activeId);

  return (
    <div className="app-container">
      <TopAppBar
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleMobileDrawer={() => setMobileDrawerOpen((prev) => !prev)}
      />

      <div className="main-layout">
        <NavDrawer
          activeId={activeId}
          onSelect={handleSelectNav}
          components={filteredComponents}
          isOpen={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
        />

        <main className="content-area">
          {activeId === 'getting-started' && <GettingStarted />}
          {activeId === 'colors' && <ColorSystemPage theme={theme} />}
          {selectedComponent && (
            <ComponentDocPage
              key={selectedComponent.id}
              component={selectedComponent}
            />
          )}
          {!selectedComponent && activeId !== 'getting-started' && activeId !== 'colors' && (
            <GettingStarted />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
