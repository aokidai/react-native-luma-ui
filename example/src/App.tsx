import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  AppBar,
  Drawer,
  IconButton,
  Scaffold,
  Text,
} from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

// Import All Screens
import HomeScreen from './screens/HomeScreen';
import ButtonScreen from './screens/ButtonScreen';
import TextFieldScreen from './screens/TextFieldScreen';
import CheckboxScreen from './screens/CheckboxScreen';
import SwitchScreen from './screens/SwitchScreen';
import RadioButtonScreen from './screens/RadioButtonScreen';
import SliderScreen from './screens/SliderScreen';
import CardScreen from './screens/CardScreen';
import AppBarScreen from './screens/AppBarScreen';
import BadgesScreen from './screens/BadgesScreen';
import ChipScreen from './screens/ChipScreen';
import SegmentedButtonScreen from './screens/SegmentedButtonScreen';
import ProgressBarScreen from './screens/ProgressBarScreen';
import SnackbarScreen from './screens/SnackbarScreen';
import DialogScreen from './screens/DialogScreen';
import DrawerScreen from './screens/DrawerScreen';
import NavigationBarScreen from './screens/NavigationBarScreen';
import TabsScreen from './screens/TabsScreen';
import AvatarScreen from './screens/AvatarScreen';
import SearchBarScreen from './screens/SearchBarScreen';
import DividerScreen from './screens/DividerScreen';
import TooltipScreen from './screens/TooltipScreen';
import SkeletonScreen from './screens/SkeletonScreen';
import PickerScreen from './screens/PickerScreen';
import ImageViewScreen from './screens/ImageViewScreen';
import WatermarkScreen from './screens/WatermarkScreen';
import TextScreen from './screens/TextScreen';
import LayoutScreen from './screens/LayoutScreen';
import BottomSheetScreen from './screens/BottomSheetScreen';
import DateTimePickerScreen from './screens/DateTimePickerScreen';
import ColorScreen from './screens/ColorScreen';

interface ScreenConfig {
  title: string;
  component: React.ComponentType<any>;
}

const SCREENS: Record<string, ScreenConfig> = {
  home: { title: 'Luma UI - Trang chủ', component: HomeScreen },
  color: { title: 'Bảng màu Material 3', component: ColorScreen },
  button: { title: 'Button & FAB', component: ButtonScreen },
  textField: { title: 'Text Field (Input)', component: TextFieldScreen },
  checkbox: { title: 'Checkbox', component: CheckboxScreen },
  switch: { title: 'Switch (Toggle)', component: SwitchScreen },
  radioButton: { title: 'Radio Button', component: RadioButtonScreen },
  slider: { title: 'Slider', component: SliderScreen },
  card: { title: 'Card', component: CardScreen },
  appBar: { title: 'App Bar', component: AppBarScreen },
  badges: { title: 'Badges', component: BadgesScreen },
  chip: { title: 'Chip (M3)', component: ChipScreen },
  segmentedButtons: {
    title: 'Segmented Button',
    component: SegmentedButtonScreen,
  },
  progressBar: { title: 'Progress & Loading', component: ProgressBarScreen },
  snackbar: { title: 'Snackbar', component: SnackbarScreen },
  dialog: { title: 'Dialog & Alert', component: DialogScreen },
  drawer: { title: 'Navigation Drawer', component: DrawerScreen },
  navigationBar: {
    title: 'Bottom Navigation Bar',
    component: NavigationBarScreen,
  },
  tabs: { title: 'Tabs', component: TabsScreen },
  avatar: { title: 'Avatar & Group', component: AvatarScreen },
  searchBar: { title: 'Search Bar', component: SearchBarScreen },
  divider: { title: 'Divider', component: DividerScreen },
  tooltip: { title: 'Tooltip', component: TooltipScreen },
  skeleton: { title: 'Skeleton Loader', component: SkeletonScreen },
  picker: { title: 'Picker (Dropdown)', component: PickerScreen },
  imageView: { title: 'Image View (Viewer)', component: ImageViewScreen },
  watermark: { title: 'Watermark', component: WatermarkScreen },
  text: { title: 'Typography (Text)', component: TextScreen },
  layout: { title: 'Layout & Components', component: LayoutScreen },
  bottomSheet: { title: 'Bottom Sheet (M3)', component: BottomSheetScreen },
  dateTimePicker: {
    title: 'Date & Time Picker',
    component: DateTimePickerScreen,
  },
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [edgeToEdge, setEdgeToEdge] = useState(false);

  const activeConfig = SCREENS[currentScreen] ?? SCREENS.home;
  const ActiveComponent = activeConfig.component;

  const navigateTo = (screenKey: string) => {
    setCurrentScreen(screenKey);
    setDrawerOpen(false);
  };

  return (
    <SafeAreaProvider>
      <Scaffold
        edgeToEdge={edgeToEdge}
        appBar={
          <AppBar
            title={activeConfig.title}
            leader={
              <IconButton
                icon={(size, color) => (
                  <MaterialDesignIcons name="menu" size={size} color={color} />
                )}
                mode="text"
                onPress={() => setDrawerOpen(true)}
              />
            }
            actions={[
              <IconButton
                key="edge-action"
                icon={(size, color) => (
                  <MaterialDesignIcons
                    name={edgeToEdge ? 'fullscreen-exit' : 'fullscreen'}
                    size={size}
                    color={edgeToEdge ? '#6200EE' : color}
                  />
                )}
                mode="text"
                onPress={() => setEdgeToEdge((prev) => !prev)}
              />,
              currentScreen !== 'home' ? (
                <IconButton
                  key="home-action"
                  icon={(size, color) => (
                    <MaterialDesignIcons
                      name="home"
                      size={size}
                      color={color}
                    />
                  )}
                  mode="text"
                  onPress={() => navigateTo('home')}
                />
              ) : null,
            ]}
          />
        }
      >
        <ActiveComponent
          onNavigate={navigateTo}
          onOpenDrawer={() => setDrawerOpen(true)}
        />
      </Scaffold>

      {/* Navigation Drawer linking all screens */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        header={
          <View style={{ gap: 4 }}>
            <Text theme="titleLarge" color="#6200EE">
              Luma UI
            </Text>
            <Text style={{ fontSize: 13, color: '#757575' }}>
              Material Design 3 Components
            </Text>
          </View>
        }
      >
        {/* Tổng quan */}
        <Drawer.Section title="Tổng quan">
          <Drawer.Item
            label="Trang chủ"
            icon={<MaterialDesignIcons name="home-outline" size={20} />}
            active={currentScreen === 'home'}
            onPress={() => navigateTo('home')}
          />
          <Drawer.Item
            label="Bảng màu (Color Scheme M3)"
            icon={<MaterialDesignIcons name="palette-outline" size={20} />}
            active={currentScreen === 'color'}
            onPress={() => navigateTo('color')}
          />
        </Drawer.Section>

        {/* Actions & Buttons */}
        <Drawer.Section title="Hành động & Điều khiển">
          <Drawer.Item
            label="Button & FAB"
            icon={<MaterialDesignIcons name="gesture-tap-button" size={20} />}
            active={currentScreen === 'button'}
            onPress={() => navigateTo('button')}
          />
          <Drawer.Item
            label="Chip (M3)"
            icon={<MaterialDesignIcons name="label-outline" size={20} />}
            active={currentScreen === 'chip'}
            onPress={() => navigateTo('chip')}
          />
          <Drawer.Item
            label="Segmented Button"
            icon={<MaterialDesignIcons name="view-week-outline" size={20} />}
            active={currentScreen === 'segmentedButtons'}
            onPress={() => navigateTo('segmentedButtons')}
          />
        </Drawer.Section>

        {/* Inputs & Selection */}
        <Drawer.Section title="Nhập liệu & Lựa chọn">
          <Drawer.Item
            label="Text Field"
            icon={<MaterialDesignIcons name="form-textbox" size={20} />}
            active={currentScreen === 'textField'}
            onPress={() => navigateTo('textField')}
          />
          <Drawer.Item
            label="Checkbox"
            icon={
              <MaterialDesignIcons name="checkbox-marked-outline" size={20} />
            }
            active={currentScreen === 'checkbox'}
            onPress={() => navigateTo('checkbox')}
          />
          <Drawer.Item
            label="Switch (Toggle)"
            icon={
              <MaterialDesignIcons name="toggle-switch-outline" size={20} />
            }
            active={currentScreen === 'switch'}
            onPress={() => navigateTo('switch')}
          />
          <Drawer.Item
            label="Radio Button"
            icon={<MaterialDesignIcons name="radiobox-marked" size={20} />}
            active={currentScreen === 'radioButton'}
            onPress={() => navigateTo('radioButton')}
          />
          <Drawer.Item
            label="Slider"
            icon={<MaterialDesignIcons name="tune" size={20} />}
            active={currentScreen === 'slider'}
            onPress={() => navigateTo('slider')}
          />
          <Drawer.Item
            label="Picker (Dropdown)"
            icon={<MaterialDesignIcons name="form-dropdown" size={20} />}
            active={currentScreen === 'picker'}
            onPress={() => navigateTo('picker')}
          />
          <Drawer.Item
            label="Date & Time Picker"
            icon={<MaterialDesignIcons name="calendar-clock" size={20} />}
            active={currentScreen === 'dateTimePicker'}
            onPress={() => navigateTo('dateTimePicker')}
          />
        </Drawer.Section>

        {/* Navigation */}
        <Drawer.Section title="Điều hướng (Navigation)">
          <Drawer.Item
            label="App Bar"
            icon={<MaterialDesignIcons name="page-layout-header" size={20} />}
            active={currentScreen === 'appBar'}
            onPress={() => navigateTo('appBar')}
          />
          <Drawer.Item
            label="Bottom Navigation"
            icon={<MaterialDesignIcons name="page-layout-footer" size={20} />}
            active={currentScreen === 'navigationBar'}
            onPress={() => navigateTo('navigationBar')}
          />
          <Drawer.Item
            label="Tabs"
            icon={<MaterialDesignIcons name="tab" size={20} />}
            active={currentScreen === 'tabs'}
            onPress={() => navigateTo('tabs')}
          />
          <Drawer.Item
            label="Drawer"
            icon={<MaterialDesignIcons name="menu-open" size={20} />}
            active={currentScreen === 'drawer'}
            onPress={() => navigateTo('drawer')}
          />
        </Drawer.Section>

        {/* Feedback & Alert */}
        <Drawer.Section title="Thông báo & Phản hồi">
          <Drawer.Item
            label="Snackbar"
            icon={<MaterialDesignIcons name="card-text-outline" size={20} />}
            active={currentScreen === 'snackbar'}
            onPress={() => navigateTo('snackbar')}
          />
          <Drawer.Item
            label="Dialog & Alert"
            icon={
              <MaterialDesignIcons name="message-alert-outline" size={20} />
            }
            active={currentScreen === 'dialog'}
            onPress={() => navigateTo('dialog')}
          />
          <Drawer.Item
            label="Bottom Sheet"
            icon={<MaterialDesignIcons name="dock-bottom" size={20} />}
            active={currentScreen === 'bottomSheet'}
            onPress={() => navigateTo('bottomSheet')}
          />
          <Drawer.Item
            label="Progress & Loading"
            icon={<MaterialDesignIcons name="progress-helper" size={20} />}
            active={currentScreen === 'progressBar'}
            onPress={() => navigateTo('progressBar')}
          />
          <Drawer.Item
            label="Badges"
            icon={<MaterialDesignIcons name="bell-badge-outline" size={20} />}
            active={currentScreen === 'badges'}
            onPress={() => navigateTo('badges')}
          />
          <Drawer.Item
            label="Tooltip"
            icon={<MaterialDesignIcons name="tooltip-text-outline" size={20} />}
            active={currentScreen === 'tooltip'}
            onPress={() => navigateTo('tooltip')}
          />
        </Drawer.Section>

        {/* Display & Layout */}
        <Drawer.Section title="Hiển thị & Bố cục">
          <Drawer.Item
            label="Card"
            icon={<MaterialDesignIcons name="card-outline" size={20} />}
            active={currentScreen === 'card'}
            onPress={() => navigateTo('card')}
          />
          <Drawer.Item
            label="Avatar"
            icon={
              <MaterialDesignIcons name="account-circle-outline" size={20} />
            }
            active={currentScreen === 'avatar'}
            onPress={() => navigateTo('avatar')}
          />
          <Drawer.Item
            label="Search Bar"
            icon={<MaterialDesignIcons name="magnify" size={20} />}
            active={currentScreen === 'searchBar'}
            onPress={() => navigateTo('searchBar')}
          />
          <Drawer.Item
            label="Divider"
            icon={<MaterialDesignIcons name="minus" size={20} />}
            active={currentScreen === 'divider'}
            onPress={() => navigateTo('divider')}
          />
          <Drawer.Item
            label="Skeleton"
            icon={
              <MaterialDesignIcons name="card-bulleted-outline" size={20} />
            }
            active={currentScreen === 'skeleton'}
            onPress={() => navigateTo('skeleton')}
          />
          <Drawer.Item
            label="Typography (Text)"
            icon={<MaterialDesignIcons name="format-size" size={20} />}
            active={currentScreen === 'text'}
            onPress={() => navigateTo('text')}
          />
          <Drawer.Item
            label="Image View (Viewer)"
            icon={<MaterialDesignIcons name="image-outline" size={20} />}
            active={currentScreen === 'imageView'}
            onPress={() => navigateTo('imageView')}
          />
          <Drawer.Item
            label="Watermark"
            icon={<MaterialDesignIcons name="stamper" size={20} />}
            active={currentScreen === 'watermark'}
            onPress={() => navigateTo('watermark')}
          />
          <Drawer.Item
            label="Layout & Tiện ích"
            icon={
              <MaterialDesignIcons name="view-dashboard-outline" size={20} />
            }
            active={currentScreen === 'layout'}
            onPress={() => navigateTo('layout')}
          />
        </Drawer.Section>
      </Drawer>
    </SafeAreaProvider>
  );
}
