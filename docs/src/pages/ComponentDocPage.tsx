import React, { useState, useEffect } from 'react';
import type { ComponentData } from '../types';
import { InteractivePlayground } from '../components/InteractivePlayground';
import { CodeBlock } from '../components/CodeBlock';
import { PropsTable } from '../components/PropsTable';

interface ComponentDocPageProps {
  component: ComponentData;
}

export const ComponentDocPage: React.FC<ComponentDocPageProps> = ({ component }) => {
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
          Tổng quan (Overview)
        </button>
        <button
          className={`m3-tab-button ${activeTab === 'specs' ? 'active' : ''}`}
          onClick={() => setActiveTab('specs')}
        >
          Thông số kỹ thuật (Specs)
        </button>
        <button
          className={`m3-tab-button ${activeTab === 'api' ? 'active' : ''}`}
          onClick={() => setActiveTab('api')}
        >
          Thuộc tính (API Props)
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
              Nguyên tắc thiết kế (Luma UI Guidelines)
            </h3>
            <p style={{ fontSize: 14, color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.6 }}>
              {component.guidelines}
            </p>
          </div>

          {/* Code Example */}
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Ví dụ sử dụng</h3>
          <CodeBlock code={component.codeExample} language="tsx" />
        </div>
      )}

      {/* TAB 2: SPECS */}
      {activeTab === 'specs' && (
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Cấu trúc Anatomy</h3>
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

          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Quy chuẩn kích thước & Bo góc (Tokens)</h3>
          <div className="props-table-wrapper">
            <table className="props-table">
              <thead>
                <tr>
                  <th style={{ width: '35%' }}>Hạng mục Token</th>
                  <th style={{ width: '65%' }}>Giá trị chuẩn Luma UI</th>
                </tr>
              </thead>
              <tbody>
                {component.specs.height && (
                  <tr>
                    <td><strong>Chiều cao (Height)</strong></td>
                    <td><code>{component.specs.height}</code></td>
                  </tr>
                )}
                {component.specs.corner && (
                  <tr>
                    <td><strong>Bo góc (Corner Radius)</strong></td>
                    <td><code>{component.specs.corner}</code></td>
                  </tr>
                )}
                {component.specs.elevation && (
                  <tr>
                    <td><strong>Độ nổi (Elevation)</strong></td>
                    <td><code>{component.specs.elevation}</code></td>
                  </tr>
                )}
                {component.specs.containerColor && (
                  <tr>
                    <td><strong>Màu Container</strong></td>
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
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Danh sách thuộc tính (Props)</h3>
          <PropsTable props={component.props} />
        </div>
      )}
    </div>
  );
};
