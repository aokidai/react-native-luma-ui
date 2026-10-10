import React from 'react';
import type { ComponentData } from '../types';
import { LumaLogo } from './LumaLogo';

interface NavDrawerProps {
  activeId: string;
  onSelect: (id: string) => void;
  components: ComponentData[];
  isOpen?: boolean;
  onClose?: () => void;
}

export const NavDrawer: React.FC<NavDrawerProps> = ({
  activeId,
  onSelect,
  components,
  isOpen = false,
  onClose,
}) => {
  // Group components by category
  const categories = Array.from(new Set(components.map((c) => c.category)));

  const handleItemClick = (id: string) => {
    onSelect(id);
    onClose?.();
  };

  return (
    <>
      {/* Mobile Backdrop Scrim */}
      {isOpen && <div className="drawer-scrim" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Mobile Header with Close button */}
        <div className="sidebar-header-mobile">
          <div className="brand-link">
            <LumaLogo size={36} />
            <span className="brand-title">Luma UI</span>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Đóng menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Overview & Foundations */}
        <div className="nav-section-title">Khám phá</div>
        <button
          className={`nav-item ${activeId === 'getting-started' ? 'active' : ''}`}
          onClick={() => handleItemClick('getting-started')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
          </svg>
          Bắt đầu (Get Started)
        </button>

        <button
          className={`nav-item ${activeId === 'colors' ? 'active' : ''}`}
          onClick={() => handleItemClick('colors')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a7 7 0 0 0 7 7c0 2-2 3-2 3s-1 1-1 2a2 2 0 0 0 4 0"></path>
          </svg>
          Hệ màu Luma (Color System)
          <span className="nav-item-badge">Luma</span>
        </button>

        {/* Components Grouped by Category */}
        <div className="nav-section-title" style={{ marginTop: 16 }}>Thành phần (Components)</div>
        {categories.map((category) => {
          const catComponents = components.filter((c) => c.category === category);
          return (
            <div key={category} style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--md-sys-color-primary)',
                  padding: '6px 16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {category}
              </div>
              {catComponents.map((item) => (
                <button
                  key={item.id}
                  className={`nav-item ${activeId === item.id ? 'active' : ''}`}
                  onClick={() => handleItemClick(item.id)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          );
        })}
      </aside>
    </>
  );
};
