import React, { useState } from 'react';
import { CodeBlock } from '../components/CodeBlock';

interface ToneItem {
  tone: number;
  hex: string;
}

interface PaletteGroup {
  key: string;
  label: string;
  tones: ToneItem[];
}

const LUMA_PALETTES: {
  primary: PaletteGroup;
  secondary: PaletteGroup;
  tertiary: PaletteGroup;
  neutral: PaletteGroup;
  neutralVariant: PaletteGroup;
} = {
  primary: {
    key: '#6750A4',
    label: 'Primary',
    tones: [
      { tone: 0, hex: '#000000' },
      { tone: 10, hex: '#21005D' },
      { tone: 20, hex: '#381E72' },
      { tone: 30, hex: '#4F378B' },
      { tone: 40, hex: '#6750A4' },
      { tone: 50, hex: '#7F67BE' },
      { tone: 60, hex: '#9A82DB' },
      { tone: 70, hex: '#B69DF8' },
      { tone: 80, hex: '#D0BCFF' },
      { tone: 90, hex: '#EADDFF' },
      { tone: 95, hex: '#F6EEFF' },
      { tone: 98, hex: '#FCF8FF' },
      { tone: 99, hex: '#FFFBFE' },
      { tone: 100, hex: '#FFFFFF' },
    ],
  },
  secondary: {
    key: '#625B71',
    label: 'Secondary',
    tones: [
      { tone: 0, hex: '#000000' },
      { tone: 10, hex: '#1D192B' },
      { tone: 20, hex: '#332D41' },
      { tone: 30, hex: '#4A4458' },
      { tone: 40, hex: '#625B71' },
      { tone: 50, hex: '#7A7289' },
      { tone: 60, hex: '#958DA5' },
      { tone: 70, hex: '#B0A7C0' },
      { tone: 80, hex: '#CCC2DC' },
      { tone: 90, hex: '#E8DEF8' },
      { tone: 95, hex: '#F6EDFF' },
      { tone: 98, hex: '#FDF7FF' },
      { tone: 99, hex: '#FFFBFE' },
      { tone: 100, hex: '#FFFFFF' },
    ],
  },
  tertiary: {
    key: '#7D5260',
    label: 'Tertiary',
    tones: [
      { tone: 0, hex: '#000000' },
      { tone: 10, hex: '#31111D' },
      { tone: 20, hex: '#492532' },
      { tone: 30, hex: '#633B48' },
      { tone: 40, hex: '#7D5260' },
      { tone: 50, hex: '#986977' },
      { tone: 60, hex: '#B58392' },
      { tone: 70, hex: '#D29DAC' },
      { tone: 80, hex: '#EFB8C8' },
      { tone: 90, hex: '#FFD8E4' },
      { tone: 95, hex: '#FFECF1' },
      { tone: 98, hex: '#FFF7F8' },
      { tone: 99, hex: '#FFFBFA' },
      { tone: 100, hex: '#FFFFFF' },
    ],
  },
  neutral: {
    key: '#605D64',
    label: 'Neutral',
    tones: [
      { tone: 0, hex: '#000000' },
      { tone: 10, hex: '#1D1B20' },
      { tone: 20, hex: '#322F35' },
      { tone: 30, hex: '#48464C' },
      { tone: 40, hex: '#605D64' },
      { tone: 50, hex: '#79767D' },
      { tone: 60, hex: '#938F96' },
      { tone: 70, hex: '#AEA9B1' },
      { tone: 80, hex: '#C9C5CD' },
      { tone: 90, hex: '#E6E0E9' },
      { tone: 95, hex: '#F5EFF7' },
      { tone: 98, hex: '#FBF6FC' },
      { tone: 99, hex: '#FFFBFE' },
      { tone: 100, hex: '#FFFFFF' },
    ],
  },
  neutralVariant: {
    key: '#605D66',
    label: 'Neutral variant',
    tones: [
      { tone: 0, hex: '#000000' },
      { tone: 10, hex: '#1D1A22' },
      { tone: 20, hex: '#322F38' },
      { tone: 30, hex: '#49454F' },
      { tone: 40, hex: '#605D66' },
      { tone: 50, hex: '#79757F' },
      { tone: 60, hex: '#938F99' },
      { tone: 70, hex: '#AEA9B4' },
      { tone: 80, hex: '#C9C4D0' },
      { tone: 90, hex: '#E7E0EC' },
      { tone: 95, hex: '#F5EFFB' },
      { tone: 98, hex: '#FCF6FF' },
      { tone: 99, hex: '#FFFBFE' },
      { tone: 100, hex: '#FFFFFF' },
    ],
  },
};

const LIGHT_SURFACE_CONTAINERS = [
  { name: 'surface-container-lowest', hex: '#FFFFFF', desc: 'Mức thấp nhất (Card phẳng)' },
  { name: 'surface-container-low', hex: '#F7F2FA', desc: 'Nền phụ trợ, navigation rail' },
  { name: 'surface-container', hex: '#F3EDF7', desc: 'Nền top app bar, default container' },
  { name: 'surface-container-high', hex: '#ECE6F0', desc: 'Mức nổi 1, bottom sheet' },
  { name: 'surface-container-highest', hex: '#E6E0E9', desc: 'Textfield nền, chips, switch track' },
];

const DARK_SURFACE_CONTAINERS = [
  { name: 'surface-container-lowest', hex: '#0F0D13', desc: 'Mức thấp nhất (Card phẳng)' },
  { name: 'surface-container-low', hex: '#1D1B20', desc: 'Nền phụ trợ, navigation rail' },
  { name: 'surface-container', hex: '#211F26', desc: 'Nền top app bar, default container' },
  { name: 'surface-container-high', hex: '#2B2930', desc: 'Mức nổi 1, bottom sheet' },
  { name: 'surface-container-highest', hex: '#36343B', desc: 'Textfield nền, chips, switch track' },
];

interface ColorSystemPageProps {
  theme?: 'light' | 'dark';
}

export const ColorSystemPage: React.FC<ColorSystemPageProps> = ({ theme = 'light' }) => {
  const [copiedInfo, setCopiedInfo] = useState<string | null>(null);

  const surfaceContainers = theme === 'dark' ? DARK_SURFACE_CONTAINERS : LIGHT_SURFACE_CONTAINERS;

  const handleCopyColor = (label: string, toneOrHex: number | string, hexVal?: string) => {
    const textToCopy = hexVal || String(toneOrHex);
    navigator.clipboard.writeText(textToCopy);
    setCopiedInfo(`${label}: ${textToCopy}`);
    setTimeout(() => setCopiedInfo(null), 2500);
  };

  const renderTonalRow = (group: PaletteGroup) => (
    <div className="m3-palette-row" key={group.label}>
      {/* Circle swatch avatar */}
      <div
        className="m3-palette-key-circle"
        style={{ backgroundColor: group.key }}
        title={`Key color: ${group.key}`}
      />

      {/* Label */}
      <div className="m3-palette-label">{group.label}</div>

      {/* Arrow */}
      <div className="m3-palette-arrow">
        <svg width="48" height="12" viewBox="0 0 48 12" fill="none" style={{ width: '100%' }}>
          <line x1="0" y1="6" x2="42" y2="6" stroke="currentColor" strokeWidth="1.5" />
          <polyline points="38,2 43,6 38,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 14 continuous tone blocks */}
      <div className="m3-palette-bar">
        {group.tones.map((item) => {
          const isLight = item.tone > 50;
          return (
            <div
              key={item.tone}
              className="m3-tone-cell"
              style={{
                backgroundColor: item.hex,
                color: isLight ? '#000000' : '#FFFFFF',
              }}
              onClick={() => handleCopyColor(group.label, item.tone, item.hex)}
              title={`Nhấp để sao chép: ${group.label} Tone ${item.tone} (${item.hex})`}
            >
              {item.tone}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div>
      <div className="doc-header">
        <span className="doc-tag">Foundations</span>
        <h1 className="doc-title">Hệ thống màu Luma UI</h1>
        <p className="doc-description">
          Luma UI sử dụng dải sắc độ (Tonal Palettes) gồm 14 mức tone chuẩn từ 0 (đen tuyệt đối) đến 100 (trắng tuyệt đối) với màu tím chủ đạo Luma Purple (#6750A4).
        </p>
      </div>

      {copiedInfo && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'var(--md-sys-color-inverse-surface)',
            color: 'var(--md-sys-color-inverse-on-surface)',
            padding: '10px 18px',
            borderRadius: 8,
            boxShadow: 'var(--md-sys-elevation-3)',
            zIndex: 100,
            fontSize: 13,
            fontWeight: 600,
            animation: 'fadeIn 0.2s ease',
          }}
        >
          ✓ Đã sao chép mã màu: <code>{copiedInfo}</code>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginTop: 28, marginBottom: 8 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>
          Dải sắc độ (Tonal Palettes)
        </h2>
        <span style={{ fontSize: 12, color: 'var(--md-sys-color-primary)', fontWeight: 500 }}>
          👉 Vuốt ngang để xem đủ 14 nấc màu
        </span>
      </div>

      <p style={{ fontSize: 13.5, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: 16 }}>
        Nhấp trực tiếp vào bất kỳ ô số nào để sao chép mã HEX tương ứng:
      </p>

      {/* SHOWCASE CARD FOR LUMA PURPLE */}
      <div className="m3-tonal-palette-card">
        {renderTonalRow(LUMA_PALETTES.primary)}
        {renderTonalRow(LUMA_PALETTES.secondary)}
        {renderTonalRow(LUMA_PALETTES.tertiary)}
        {renderTonalRow(LUMA_PALETTES.neutral)}
        {renderTonalRow(LUMA_PALETTES.neutralVariant)}
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 700, margin: '36px 0 14px 0' }}>Surface Containers & Elevations</h2>
      <p style={{ fontSize: 13.5, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: 16 }}>
        Thay vì phụ thuộc vào bóng đổ, Luma UI sử dụng 5 cấp độ màu Surface Container ({theme === 'dark' ? 'Dark Theme' : 'Light Theme'}) để phân tầng chiều sâu:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 36 }}>
        {surfaceContainers.map((sc) => (
          <div
            key={sc.name}
            onClick={() => handleCopyColor(sc.name, sc.hex)}
            style={{
              backgroundColor: sc.hex,
              border: '1px solid var(--md-sys-color-outline-variant)',
              borderRadius: 12,
              padding: 16,
              cursor: 'pointer',
              color: theme === 'dark' ? '#E6E0E9' : '#1D1B20',
              boxShadow: 'var(--md-sys-elevation-1)',
              transition: 'transform 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{sc.name}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--md-sys-color-primary)' }}>{sc.hex}</div>
            <div style={{ fontSize: 11.5, opacity: 0.7, marginTop: 8 }}>{sc.desc}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 700, margin: '36px 0 14px 0' }}>Cách sử dụng trong code React Native</h2>
      <CodeBlock
        language="tsx"
        code={`import {
  colorSystem,      // Bảng màu mặc định của Luma UI
  md3LightColors,   // Toàn bộ tokens màu Theme Sáng
  md3DarkColors,    // Toàn bộ tokens màu Theme Tối
  md3TonalPalettes, // Dải sắc độ từ 0 đến 100
} from 'react-native-luma-ui';

// Sử dụng trong style
const styles = {
  container: {
    backgroundColor: colorSystem.surface,
  },
  card: {
    backgroundColor: colorSystem.surfaceContainerLow,
    borderColor: colorSystem.outlineVariant,
  },
  primaryText: {
    color: colorSystem.primary,
  },
};`}
      />
    </div>
  );
};
