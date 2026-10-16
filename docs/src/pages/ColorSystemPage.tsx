import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
    label: 'Neutral Variant',
    tones: [
      { tone: 0, hex: '#000000' },
      { tone: 10, hex: '#1D1A22' },
      { tone: 20, hex: '#322F37' },
      { tone: 30, hex: '#49454E' },
      { tone: 40, hex: '#605D66' },
      { tone: 50, hex: '#79757F' },
      { tone: 60, hex: '#938F99' },
      { tone: 70, hex: '#AEA9B4' },
      { tone: 80, hex: '#CAC4D0' },
      { tone: 90, hex: '#E7E0EC' },
      { tone: 95, hex: '#F5EEFA' },
      { tone: 98, hex: '#FEF7FF' },
      { tone: 99, hex: '#FFFBFE' },
      { tone: 100, hex: '#FFFFFF' },
    ],
  },
};

interface ColorSystemPageProps {
  theme?: 'light' | 'dark';
}

export const ColorSystemPage: React.FC<ColorSystemPageProps> = ({ theme = 'light' }) => {
  const { t } = useTranslation();
  const [copiedInfo, setCopiedInfo] = useState<string | null>(null);

  const surfaceContainers = [
    { name: 'surface-container-lowest', hex: theme === 'dark' ? '#0F0D13' : '#FFFFFF', descKey: 'colors.lowest' },
    { name: 'surface-container-low', hex: theme === 'dark' ? '#1D1B20' : '#F7F2FA', descKey: 'colors.low' },
    { name: 'surface-container', hex: theme === 'dark' ? '#211F26' : '#F3EDF7', descKey: 'colors.container' },
    { name: 'surface-container-high', hex: theme === 'dark' ? '#2B2930' : '#ECE6F0', descKey: 'colors.high' },
    { name: 'surface-container-highest', hex: theme === 'dark' ? '#36343B' : '#E6E0E9', descKey: 'colors.highest' },
  ];

  const handleCopyColor = (label: string, toneOrHex: number | string, hexVal?: string) => {
    const textToCopy = hexVal || String(toneOrHex);
    navigator.clipboard.writeText(textToCopy);
    setCopiedInfo(`${label}: ${textToCopy}`);
    setTimeout(() => setCopiedInfo(null), 2500);
  };

  const renderTonalRow = (group: PaletteGroup) => (
    <div className="m3-palette-row" key={group.label}>
      <div
        className="m3-palette-key-circle"
        style={{ backgroundColor: group.key }}
        title={`Key color: ${group.key}`}
      />
      <div className="m3-palette-label">{group.label}</div>
      <div className="m3-palette-arrow">
        <svg width="48" height="12" viewBox="0 0 48 12" fill="none" style={{ width: '100%' }}>
          <line x1="0" y1="6" x2="42" y2="6" stroke="currentColor" strokeWidth="1.5" />
          <polyline points="38,2 43,6 38,10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

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
              title={`${group.label} Tone ${item.tone} (${item.hex})`}
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
        <span className="doc-tag">{t('colors.tag')}</span>
        <h1 className="doc-title">{t('colors.title')}</h1>
        <p className="doc-description">{t('colors.description')}</p>
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
          {t('colors.copied')} <code>{copiedInfo}</code>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginTop: 28, marginBottom: 8 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>
          {t('colors.tonalTitle')}
        </h2>
        <span style={{ fontSize: 12, color: 'var(--md-sys-color-primary)', fontWeight: 500 }}>
          {t('colors.tonalTip')}
        </span>
      </div>

      <p style={{ fontSize: 13.5, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: 16 }}>
        {t('colors.tonalDesc')}
      </p>

      {/* SHOWCASE CARD FOR LUMA PURPLE */}
      <div className="m3-tonal-palette-card">
        {renderTonalRow(LUMA_PALETTES.primary)}
        {renderTonalRow(LUMA_PALETTES.secondary)}
        {renderTonalRow(LUMA_PALETTES.tertiary)}
        {renderTonalRow(LUMA_PALETTES.neutral)}
        {renderTonalRow(LUMA_PALETTES.neutralVariant)}
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 700, margin: '36px 0 14px 0' }}>{t('colors.surfaceTitle')}</h2>
      <p style={{ fontSize: 13.5, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: 16 }}>
        {t('colors.surfaceDesc')}
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
            <div style={{ fontSize: 11.5, opacity: 0.7, marginTop: 8 }}>{t(sc.descKey)}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 700, margin: '36px 0 14px 0' }}>{t('colors.usageTitle')}</h2>
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
