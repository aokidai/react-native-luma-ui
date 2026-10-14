import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { ComponentData } from '../types';
import { InteractivePlayground } from '../components/InteractivePlayground';
import { CodeBlock } from '../components/CodeBlock';
import { PropsTable } from '../components/PropsTable';

interface ComponentDocPageProps {
  component: ComponentData;
}

export const ComponentDocPage: React.FC<ComponentDocPageProps> = ({ component }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'api'>('overview');

  // Reset tab to 'overview' whenever component changes
  useEffect(() => {
    setActiveTab('overview');
  }, [component.id]);

  return (
    <div>
      {/* Header */}
      <div className="doc-header">
        <span className="doc-tag">{component.category}</span>
        <h1 className="doc-title">{component.name}</h1>
        <p className="doc-description">{component.description}</p>
      </div>

      {/* Luma UI Tabs */}
      <div className="m3-tabs-container">
        <button
          className={`m3-tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          {t('componentDoc.tabOverview')}
        </button>
        <button
          className={`m3-tab-button ${activeTab === 'specs' ? 'active' : ''}`}
          onClick={() => setActiveTab('specs')}
        >
          {t('componentDoc.tabSpecs')}
        </button>
        <button
          className={`m3-tab-button ${activeTab === 'api' ? 'active' : ''}`}
          onClick={() => setActiveTab('api')}
        >
          {t('componentDoc.tabApi')}
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div>
          {/* Interactive Playground */}
          <InteractivePlayground componentId={component.id} />

          {/* Guidelines */}
          <div
            style={{
              padding: 20,
              borderRadius: 16,
              backgroundColor: 'var(--md-sys-color-surface-container)',
              border: '1px solid var(--md-sys-color-outline-variant)',
              marginBottom: 32,
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: 'var(--md-sys-color-primary)' }}>
              {t('componentDoc.guidelines')}
            </h3>
            <p style={{ fontSize: 14, color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.6 }}>
              {component.guidelines}
            </p>
          </div>

          {/* Code Example */}
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t('componentDoc.codeExample')}</h3>
          <CodeBlock code={component.codeExample} language="tsx" />
        </div>
      )}

      {/* TAB 2: SPECS */}
      {activeTab === 'specs' && (
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{t('componentDoc.anatomy')}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 32 }}>
            {component.anatomy.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: 14,
                  borderRadius: 12,
                  backgroundColor: 'var(--md-sys-color-surface-container-low)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  fontSize: 13.5,
                  fontWeight: 500,
                }}
              >
                {item}
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{t('componentDoc.specsTable')}</h3>
          <div className="props-table-wrapper">
            <table className="props-table">
              <thead>
                <tr>
                  <th style={{ width: '35%' }}>Token</th>
                  <th style={{ width: '65%' }}>Value</th>
                </tr>
              </thead>
              <tbody>
                {component.specs.height && (
                  <tr>
                    <td><strong>Height</strong></td>
                    <td><code>{component.specs.height}</code></td>
                  </tr>
                )}
                {component.specs.corner && (
                  <tr>
                    <td><strong>Corner Radius</strong></td>
                    <td><code>{component.specs.corner}</code></td>
                  </tr>
                )}
                {component.specs.elevation && (
                  <tr>
                    <td><strong>Elevation</strong></td>
                    <td><code>{component.specs.elevation}</code></td>
                  </tr>
                )}
                {component.specs.containerColor && (
                  <tr>
                    <td><strong>Container Color</strong></td>
                    <td><code>{component.specs.containerColor}</code></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: API PROPS */}
      {activeTab === 'api' && (
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{t('componentDoc.tabApi')}</h3>
          <PropsTable props={component.props} />
        </div>
      )}
    </div>
  );
};
