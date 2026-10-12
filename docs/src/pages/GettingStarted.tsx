import React from 'react';
import { CodeBlock } from '../components/CodeBlock';

export const GettingStarted: React.FC = () => {
  return (
    <div>
      <div className="doc-header">
        <span className="doc-tag">Giới thiệu</span>
        <h1 className="doc-title">Bắt đầu với Luma UI</h1>
        <p className="doc-description">
          Luma UI là bộ thư viện giao diện Luma UI toàn diện, tinh tế và tối ưu hiệu năng dành riêng cho React Native.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, margin: '32px 0' }}>
        <div style={{ padding: 20, borderRadius: 16, backgroundColor: 'var(--md-sys-color-surface-container)', border: '1px solid var(--md-sys-color-outline-variant)' }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>🎨</div>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Chuẩn Luma UI</h3>
          <p style={{ fontSize: 13.5, color: 'var(--md-sys-color-on-surface-variant)' }}>
            Đầy đủ hệ thống màu Tonal Palettes, Surface Containers, Shape Radius và Elevations chuẩn Luma UI.
          </p>
        </div>

        <div style={{ padding: 20, borderRadius: 16, backgroundColor: 'var(--md-sys-color-surface-container)', border: '1px solid var(--md-sys-color-outline-variant)' }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>📱</div>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>35+ Thành phần</h3>
          <p style={{ fontSize: 13.5, color: 'var(--md-sys-color-on-surface-variant)' }}>
            Từ Button, BottomSheet, DateTimePicker đến NavigationBar và Tabs trượt mượt mà.
          </p>
        </div>

        <div style={{ padding: 20, borderRadius: 16, backgroundColor: 'var(--md-sys-color-surface-container)', border: '1px solid var(--md-sys-color-outline-variant)' }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>🛡️</div>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Edge-to-Edge</h3>
          <p style={{ fontSize: 13.5, color: 'var(--md-sys-color-on-surface-variant)' }}>
            Hỗ trợ tràn status bar, tai thỏ và thanh cử chỉ vuốt đáy tự động không bị đè che khuất.
          </p>
        </div>
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 700, margin: '36px 0 16px 0' }}>1. Cài đặt thư viện</h2>
      <p style={{ fontSize: 14.5, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: 12 }}>
        Cài đặt gói npm `react-native-luma-ui` và peer dependency `react-native-safe-area-context`:
      </p>

      <CodeBlock
        language="bash"
        code={`# Dành cho Yarn
yarn add react-native-luma-ui react-native-safe-area-context

# Dành cho npm
npm install react-native-luma-ui react-native-safe-area-context`}
      />

      <h2 style={{ fontSize: 24, fontWeight: 700, margin: '36px 0 16px 0' }}>2. Khởi tạo ứng dụng (Quick Start)</h2>
      <p style={{ fontSize: 14.5, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: 12 }}>
        Bọc ứng dụng bằng `SafeAreaProvider` và dùng khung `Scaffold` kết hợp `AppBar`:
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
        <Card title="Xin chào Luma UI">
          <Text style={{ marginBottom: 16 }}>
            Thư viện UI chuẩn Luma UI cho React Native.
          </Text>
          <Button
            label={\`Nhấn thử: \${count}\`}
            mode="filled"
            onPress={() => setCount((c) => c + 1)}
          />
        </Card>
      </Scaffold>
    </SafeAreaProvider>
  );
}`}
      />

      <h2 style={{ fontSize: 24, fontWeight: 700, margin: '36px 0 16px 0' }}>3. Chạy ứng dụng Example Showcase</h2>
      <p style={{ fontSize: 14.5, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: 12 }}>
        Toàn bộ mã nguồn demo tương tác cho cả 35+ components đều nằm trong thư mục <code>example/</code>:
      </p>

      <CodeBlock
        language="bash"
        code={`# 1. Cài đặt các gói tại thư mục gốc
yarn install

# 2. Khởi chạy ứng dụng Android trên máy ảo
yarn android

# 3. Khởi chạy Metro Bundler
yarn start`}
      />
    </div>
  );
};
