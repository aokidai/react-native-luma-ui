# React Native Luma UI

<p align="center">
  <img src="./assets/logo.svg" width="96" height="96" alt="Luma UI Logo" />
</p>

<h3 align="center">Thư viện UI chuẩn Luma UI hiện đại, tinh gọn và tối ưu cho React Native</h3>

<p align="center">
  <a href="https://www.npmjs.com/package/react-native-luma-ui"><img src="https://img.shields.io/npm/v/react-native-luma-ui.svg?style=flat-square&color=6750A4" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/react-native-luma-ui"><img src="https://img.shields.io/npm/dm/react-native-luma-ui.svg?style=flat-square" alt="npm downloads" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License" /></a>
  <a href="https://reactnative.dev"><img src="https://img.shields.io/badge/React%20Native-0.74%2B-61DAFB.svg?style=flat-square" alt="React Native" /></a>
  <img src="https://img.shields.io/badge/Design-Luma%20UI-6750A4.svg?style=flat-square" alt="Luma UI" />
</p>

---

## 🌟 Điểm nổi bật (Features)

- 🎨 **Luma UI Design System**: Tuân thủ triết lý thiết kế Luma UI với hệ thống màu Tonal Palettes, Surface Containers, Shape Radius và Elevations.
- 📱 **35+ Components hoàn chỉnh**: Cung cấp đầy đủ các thành phần giao diện từ cơ bản đến nâng cao: Buttons, BottomSheet, Date/Time Pickers, NavigationBar, Tabs, Drawers, Dialogs, Tooltips, Sliders...
- 🛡️ **Edge-to-Edge & Safe Area**: Tích hợp sẵn với `react-native-safe-area-context`, hỗ trợ AppBar tràn lên status bar và BottomSheet/Dialog tràn viền.
- 🚀 **Vector Icons độc lập**: Sử dụng các icon vector thuần SVG/RN, hoạt động mượt mà không lo bị lỗi font icon ô vuông chữ X.
- ⚡ **Hiệu năng cao**: Tối ưu hóa animation với `Animated` native driver, PanResponder mượt mà, không giật lag.
- 💎 **100% TypeScript**: Định nghĩa kiểu dữ liệu chặt chẽ, gợi ý code (autocomplete) thông minh.

---

## 📦 Cài đặt (Installation)

Sử dụng **npm** hoặc **yarn**:

```sh
# Sử dụng Yarn
yarn add react-native-luma-ui react-native-safe-area-context

# Hoặc sử dụng npm
npm install react-native-luma-ui react-native-safe-area-context
```

### Cài đặt thư viện Icon (Tùy chọn)

Nếu bạn muốn sử dụng thêm bộ icon bên ngoài trong các nút bấm hoặc thanh điều hướng:

```sh
yarn add @react-native-vector-icons/material-design-icons
# hoặc
yarn add react-native-vector-icons
```

---

## 🚀 Bắt đầu nhanh (Quick Start)

Bọc ứng dụng của bạn trong `SafeAreaProvider` và sử dụng `Scaffold` kết hợp `AppBar`:

```tsx
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Scaffold,
  AppBar,
  Button,
  Card,
  Text,
  colorSystem,
} from 'react-native-luma-ui';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaProvider>
      <Scaffold
        appBar={
          <AppBar
            title="Luma UI Starter"
            subtitle="Luma UI Design"
            showBack
            onBack={() => console.log('Back pressed')}
          />
        }
      >
        <Card title="Chào mừng bạn đến với Luma UI">
          <Text style={{ color: colorSystem.gray[600], marginBottom: 16 }}>
            Bộ thư viện UI chất lượng cao dành cho ứng dụng React Native.
          </Text>
          <Button
            label={`Đã nhấn: ${count} lần`}
            mode="elevated"
            onPress={() => setCount((c) => c + 1)}
          />
        </Card>
      </Scaffold>
    </SafeAreaProvider>
  );
}
```

---

## 🧩 Danh mục Components (Components Catalog)

| Nhóm | Components | Mô tả |
| :--- | :--- | :--- |
| **Bố cục & Khung** | `Scaffold`, `AppStatusBar`, `AppBar`, `Section`, `Wrapper`, `Divider` | Khung ứng dụng, tràn status bar, thanh điều hướng trên cùng, phân đoạn |
| **Hành động & Tương tác**| `Button`, `IconButton`, `FAB`, `SegmentedButton`, `ActionGroup` | Nút bấm 5 chế độ Luma UI (filled, elevated, outlined, text, tonal), nút nổi FAB |
| **Nhập liệu & Chọn lựa** | `TextField`, `Checkbox`, `Switch`, `RadioButton`, `Slider`, `Picker` | Nhập văn bản nổi/viền, thanh kéo slider, chọn một/nhiều mục |
| **Thời gian & Lịch** | `DatePicker`, `TimePicker`, `DateTimePicker` | Chọn ngày tháng, giờ 12h/24h, lịch cuộn và bottom sheet modal |
| **Modal & Lớp phủ** | `BottomSheet`, `BottomAlert`, `Dialog`, `Snackbar`, `Tooltip` | Kéo vuốt cử chỉ cử động mượt, thông báo đáy màn hình, bong bóng hướng dẫn |
| **Điều hướng** | `NavigationBar`, `Tabs`, `Drawer`, `DrawerItem`, `DrawerSection` | Thanh điều hướng dưới cùng dạng viên thuốc (pill), tabs trượt, ngăn kéo bên |
| **Hiển thị & Trạng thái** | `Card`, `Badges`, `Tag`, `Chip`, `Avatar`, `AvatarGroup`, `Text` | Thẻ nội dung, nhãn thông báo, bộ lọc chip, nhóm avatar xếp chồng |
| **Phản hồi & Đa phương tiện**| `Loading`, `ProgressBar`, `Skeleton`, `NoContent`, `ImageView`, `Watermark`, `HTMLReader` | Vạch tiến trình, skeleton loading, màn hình rỗng, xem phóng to ảnh, đóng dấu ảnh |

---

## 💡 Ví dụ sử dụng các Component chính

### 1. Button (5 chế độ chuẩn Luma UI)
```tsx
import { Button } from 'react-native-luma-ui';

<Button label="Filled Button" mode="filled" onPress={() => {}} />
<Button label="Elevated Button" mode="elevated" onPress={() => {}} />
<Button label="Outlined Button" mode="outlined" onPress={() => {}} />
<Button label="Text Button" mode="text" onPress={() => {}} />
<Button label="Tonal Button" mode="tonal" onPress={() => {}} />
```

### 2. Bottom Sheet (Cử chỉ kéo vuốt & Snap Points)
```tsx
import React, { useState } from 'react';
import { BottomSheet, Button, Text } from 'react-native-luma-ui';

const [sheetOpen, setSheetOpen] = useState(false);

<Button label="Mở Bottom Sheet" onPress={() => setSheetOpen(true)} />

<BottomSheet
  visible={sheetOpen}
  onClose={() => setSheetOpen(false)}
  title="Tùy chọn tài khoản"
  height={320}
  closeOnDragDown
>
  <Text>Nội dung bên trong Bottom Sheet chuẩn Luma UI.</Text>
</BottomSheet>
```

### 3. Date & Time Picker
```tsx
import React, { useState } from 'react';
import { DatePicker, TimePicker, DateTimePicker } from 'react-native-luma-ui';

const [date, setDate] = useState(new Date());

// Chọn ngày
<DatePicker value={date} onChange={setDate} />

// Chọn giờ
<TimePicker value={date} onChange={setDate} is24Hour />

// Chọn cả ngày và giờ kết hợp
<DateTimePicker value={date} onChange={setDate} mode="datetime" />
```

### 4. Slider (Kéo chọn mượt mà)
```tsx
import React, { useState } from 'react';
import { Slider } from 'react-native-luma-ui';

const [value, setValue] = useState(50);

<Slider
  value={value}
  onValueChange={setValue}
  minimumValue={0}
  maximumValue={100}
  step={1}
  showValueBubble
/>
```

### 5. Snackbar (Ghim đáy màn hình)
```tsx
import React, { useState } from 'react';
import { Snackbar, Button } from 'react-native-luma-ui';

const [visible, setVisible] = useState(false);

<Button label="Hiện thông báo" onPress={() => setVisible(true)} />

<Snackbar
  visible={visible}
  onDismiss={() => setVisible(false)}
  duration={3000}
  action={{
    label: 'HOÀN TÁC',
    onPress: () => console.log('Undo pressed'),
  }}
>
  Đã lưu tài liệu thành công.
</Snackbar>
```

---

## 🎨 Hệ thống màu sắc (Luma UI Color System)

Luma UI tích hợp sẵn toàn bộ hệ thống màu sắc chuẩn Luma UI:

```tsx
import {
  colorSystem,      // Màu mặc định của Luma UI
  md3LightColors,   // Bảng màu sáng (Light Theme)
  md3DarkColors,    // Bảng màu tối (Dark Theme)
  md3TonalPalettes, // Dải sắc độ từ 0 đến 100
} from 'react-native-luma-ui';

// Sử dụng trong style
const styles = {
  container: {
    backgroundColor: colorSystem.surface, // '#E6E1E5'
  },
  card: {
    backgroundColor: colorSystem.background, // '#FFFFFF'
    borderColor: colorSystem.outline,
  },
};
```

---

## 🌐 Trang web tài liệu tương tác (Luma UI Documentation)

Thư viện đi kèm trang web tài liệu trực quan chuẩn phong cách **Luma UI** với tính năng xem trước tương tác (Interactive Live Sandbox), hệ thống màu Tonal Palettes, Surface Containers, dark/light theme và thông số API Props chi tiết:

```sh
# Khởi chạy trang web tài liệu ở môi trường phát triển (Port 5173)
yarn docs

# Build bản tĩnh tài liệu cho production
yarn docs:build
```

---

## 📱 Chạy ứng dụng Showcase Example

Thư mục `example/` chứa toàn bộ màn hình demo tương tác trực quan cho tất cả các component:

```sh
# 1. Cài đặt dependencies tại thư mục gốc
yarn install

# 2. Khởi chạy ứng dụng Android Example
yarn android

# 3. Khởi chạy Metro Bundler
yarn start
```


---

## 🤝 Đóng góp (Contributing)

Xem tài liệu [CONTRIBUTING.md](CONTRIBUTING.md) để biết quy trình phát triển và gửi Pull Request.

---

## 📄 Bản quyền (License)

Mã nguồn được phân phối dưới giấy phép **MIT**. Xem [LICENSE](LICENSE) để biết thêm chi tiết.
