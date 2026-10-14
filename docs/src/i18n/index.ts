import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    translation: {
      nav: {
        explore: 'Explore',
        gettingStarted: 'Get Started',
        colorSystem: 'Color System',
        components: 'Components',
        search: 'Search components...',
        closeMenu: 'Close menu',
        openMenu: 'Open menu',
      },
      topBar: {
        themeLight: 'Switch to Light Theme',
        themeDark: 'Switch to Dark Theme',
        switchLang: 'Switch to Vietnamese',
        langCode: 'EN',
        shortcutMac: '⌘ K',
        shortcutWin: 'Ctrl + K',
      },
      gettingStarted: {
        tag: 'Introduction',
        title: 'Getting Started with Luma UI',
        description:
          'Luma UI is a comprehensive, refined, and performance-optimized React Native component library following Luma UI design specifications.',
        feature1Title: 'Luma UI Compliant',
        feature1Desc:
          'Full color tokens, Tonal Palettes, Surface Containers, Shape Radius, and Elevation hierarchy.',
        feature2Title: '35+ Components',
        feature2Desc:
          'From Button, BottomSheet, DateTimePicker to NavigationBar, Tabs, and Pickers.',
        feature3Title: 'Edge-to-Edge Ready',
        feature3Desc:
          'Automatic status bar translucency, notch adaptation, and gesture navigation insets.',
        installTitle: '1. Installation',
        installDesc:
          'Install the npm package react-native-luma-ui and peer dependency react-native-safe-area-context:',
        quickStartTitle: '2. Quick Start',
        quickStartDesc:
          'Wrap your root app with SafeAreaProvider and build with Scaffold and AppBar:',
        sampleTitle: 'Hello Luma UI',
        sampleDesc: 'A modern React Native UI library following Luma UI design standards.',
        sampleBtn: 'Tap count',
      },
      colors: {
        tag: 'Foundations',
        title: 'Luma UI Color System',
        description:
          'Luma UI uses Tonal Palettes comprising 14 standard tones from 0 (pure black) to 100 (pure white) centered around Luma Purple (#6750A4).',
        tonalTitle: 'Tonal Palettes',
        tonalTip: '👉 Scroll horizontally to explore all 14 tone steps',
        tonalDesc: 'Click directly on any tone box to copy its HEX value:',
        copied: '✓ Copied color code:',
        surfaceTitle: 'Surface Containers & Elevations',
        surfaceDesc:
          'Instead of heavy drop shadows, Luma UI uses 5 levels of Surface Containers to express depth hierarchy:',
        usageTitle: 'Usage in React Native',
        lowest: 'Lowest level (flat card)',
        low: 'Auxiliary container, navigation rail',
        container: 'Top app bar background, default card',
        high: 'Level 1 elevation, bottom sheet',
        highest: 'Textfield fill, chips, switch track',
      },
      componentDoc: {
        tabOverview: 'Overview',
        tabSpecs: 'Specs',
        tabApi: 'API Props',
        guidelines: 'Design Guidelines',
        codeExample: 'Usage Example',
        anatomy: 'Anatomy Structure',
        specsTable: 'Specs Details',
        propColName: 'Prop',
        propColType: 'Type',
        propColDefault: 'Default',
        propColDesc: 'Description',
        required: 'Required',
        copyCode: 'Copy',
        copied: 'Copied!',
      },
    },
  },
  vi: {
    translation: {
      nav: {
        explore: 'Khám phá',
        gettingStarted: 'Bắt đầu (Get Started)',
        colorSystem: 'Hệ màu Luma (Color System)',
        components: 'Thành phần (Components)',
        search: 'Tìm kiếm component...',
        closeMenu: 'Đóng menu',
        openMenu: 'Mở menu',
      },
      topBar: {
        themeLight: 'Chuyển sang Giao diện Sáng',
        themeDark: 'Chuyển sang Giao diện Tối',
        switchLang: 'Chuyển sang Tiếng Anh',
        langCode: 'VI',
        shortcutMac: '⌘ K',
        shortcutWin: 'Ctrl + K',
      },
      gettingStarted: {
        tag: 'Giới thiệu',
        title: 'Bắt đầu với Luma UI',
        description:
          'Luma UI là bộ thư viện giao diện Luma UI toàn diện, tinh tế và tối ưu hiệu năng dành riêng cho React Native.',
        feature1Title: 'Chuẩn Luma UI',
        feature1Desc:
          'Đầy đủ hệ thống màu Tonal Palettes, Surface Containers, Shape Radius và Elevations chuẩn Luma UI.',
        feature2Title: '35+ Thành phần',
        feature2Desc:
          'Từ Button, BottomSheet, DateTimePicker đến NavigationBar và Tabs trượt mượt mà.',
        feature3Title: 'Edge-to-Edge',
        feature3Desc:
          'Hỗ trợ tràn status bar, tai thỏ và thanh cử chỉ vuốt đáy tự động không bị đè che khuất.',
        installTitle: '1. Cài đặt thư viện',
        installDesc:
          'Cài đặt gói npm react-native-luma-ui và peer dependency react-native-safe-area-context:',
        quickStartTitle: '2. Khởi tạo ứng dụng (Quick Start)',
        quickStartDesc:
          'Bọc ứng dụng bằng SafeAreaProvider và dùng khung Scaffold kết hợp AppBar:',
        sampleTitle: 'Xin chào Luma UI',
        sampleDesc: 'Thư viện UI chuẩn Luma UI cho React Native.',
        sampleBtn: 'Nhấn thử',
      },
      colors: {
        tag: 'Foundations',
        title: 'Hệ thống màu Luma UI',
        description:
          'Luma UI sử dụng dải sắc độ (Tonal Palettes) gồm 14 mức tone chuẩn từ 0 (đen tuyệt đối) đến 100 (trắng tuyệt đối) với màu tím chủ đạo Luma Purple (#6750A4).',
        tonalTitle: 'Dải sắc độ (Tonal Palettes)',
        tonalTip: '👉 Vuốt ngang để xem đủ 14 nấc màu',
        tonalDesc: 'Nhấp trực tiếp vào bất kỳ ô số nào để sao chép mã HEX tương ứng:',
        copied: '✓ Đã sao chép mã màu:',
        surfaceTitle: 'Surface Containers & Elevations',
        surfaceDesc:
          'Thay vì phụ thuộc vào bóng đổ, Luma UI sử dụng 5 cấp độ màu Surface Container để phân tầng chiều sâu:',
        usageTitle: 'Cách sử dụng trong code React Native',
        lowest: 'Mức thấp nhất (Card phẳng)',
        low: 'Nền phụ trợ, navigation rail',
        container: 'Nền top app bar, default container',
        high: 'Mức nổi 1, bottom sheet',
        highest: 'Textfield nền, chips, switch track',
      },
      componentDoc: {
        tabOverview: 'Tổng quan (Overview)',
        tabSpecs: 'Thông số kỹ thuật (Specs)',
        tabApi: 'Thuộc tính (API Props)',
        guidelines: 'Nguyên tắc thiết kế (Luma UI Guidelines)',
        codeExample: 'Ví dụ sử dụng',
        anatomy: 'Cấu trúc Anatomy',
        specsTable: 'Chi tiết thông số kỹ thuật',
        propColName: 'Thuộc tính (Prop)',
        propColType: 'Kiểu (Type)',
        propColDefault: 'Mặc định (Default)',
        propColDesc: 'Mô tả',
        required: 'Bắt buộc',
        copyCode: 'Sao chép',
        copied: 'Đã chép!',
      },
    },
  },
};

const savedLang = (() => {
  try {
    return localStorage.getItem('luma_docs_lang') || 'en';
  } catch {
    return 'en';
  }
})();

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
