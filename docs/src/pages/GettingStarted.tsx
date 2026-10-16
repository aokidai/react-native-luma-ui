import React from 'react';
import { useTranslation } from 'react-i18next';
import { CodeBlock } from '../components/CodeBlock';

export const GettingStarted: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="doc-header">
        <span className="doc-tag">{t('gettingStarted.tag')}</span>
        <h1 className="doc-title">{t('gettingStarted.title')}</h1>
        <p className="doc-description">{t('gettingStarted.description')}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, margin: '32px 0' }}>
        <div style={{ padding: 20, borderRadius: 16, backgroundColor: 'var(--md-sys-color-surface-container)', border: '1px solid var(--md-sys-color-outline-variant)' }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>🎨</div>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{t('gettingStarted.feature1Title')}</h3>
          <p style={{ fontSize: 13.5, color: 'var(--md-sys-color-on-surface-variant)' }}>
            {t('gettingStarted.feature1Desc')}
          </p>
        </div>

        <div style={{ padding: 20, borderRadius: 16, backgroundColor: 'var(--md-sys-color-surface-container)', border: '1px solid var(--md-sys-color-outline-variant)' }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>📱</div>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{t('gettingStarted.feature2Title')}</h3>
          <p style={{ fontSize: 13.5, color: 'var(--md-sys-color-on-surface-variant)' }}>
            {t('gettingStarted.feature2Desc')}
          </p>
        </div>

        <div style={{ padding: 20, borderRadius: 16, backgroundColor: 'var(--md-sys-color-surface-container)', border: '1px solid var(--md-sys-color-outline-variant)' }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>🛡️</div>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{t('gettingStarted.feature3Title')}</h3>
          <p style={{ fontSize: 13.5, color: 'var(--md-sys-color-on-surface-variant)' }}>
            {t('gettingStarted.feature3Desc')}
          </p>
        </div>
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 700, margin: '36px 0 16px 0' }}>{t('gettingStarted.installTitle')}</h2>
      <p style={{ fontSize: 14.5, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: 12 }}>
        {t('gettingStarted.installDesc')}
      </p>

      <CodeBlock
        language="bash"
        code={`# Dành cho Yarn
yarn add react-native-luma-ui react-native-safe-area-context

# Dành cho npm
npm install react-native-luma-ui react-native-safe-area-context`}
      />

      <h2 style={{ fontSize: 24, fontWeight: 700, margin: '36px 0 16px 0' }}>{t('gettingStarted.quickStartTitle')}</h2>
      <p style={{ fontSize: 14.5, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: 12 }}>
        {t('gettingStarted.quickStartDesc')}
      </p>

      <CodeBlock
        language="tsx"
        code={`import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Scaffold,
  AppBar,
  Button,
  Card,
  Text,
} from 'react-native-luma-ui';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaProvider>
      <Scaffold
        appBar={
          <AppBar
            title="Luma UI App"
            subtitle="Luma UI Design"
            showBack={false}
          />
        }
      >
        <Card title="${t('gettingStarted.sampleTitle')}">
          <Text style={{ marginBottom: 16 }}>
            ${t('gettingStarted.sampleDesc')}
          </Text>
          <Button
            label={\`${t('gettingStarted.sampleBtn')}: \${count}\`}
            mode="filled"
            onPress={() => setCount((c) => c + 1)}
          />
        </Card>
      </Scaffold>
    </SafeAreaProvider>
  );
}`}
      />

      <h2 style={{ fontSize: 24, fontWeight: 700, margin: '36px 0 16px 0' }}>3. Example Showcase App</h2>
      <p style={{ fontSize: 14.5, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: 12 }}>
        The complete interactive demo showcase for all 35+ components is located in the <code>example/</code> directory:
      </p>

      <CodeBlock
        language="bash"
        code={`# 1. Install dependencies
yarn install

# 2. Run Android on emulator / device
yarn android

# 3. Start Metro bundler
yarn start`}
      />
    </div>
  );
};
