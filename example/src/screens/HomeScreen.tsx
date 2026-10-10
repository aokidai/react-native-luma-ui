import React, { type FC } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Button,
  Card,
  Chip,
  Divider,
  Section,
  Text,
} from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

interface Props {
  onNavigate: (screenKey: string) => void;
  onOpenDrawer: () => void;
}

export const HomeScreen: FC<Props> = ({ onNavigate, onOpenDrawer }) => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Banner Card */}
      <Card
        priority="Luma UI"
        priorityColor="#6200EE"
        status="Luma UI"
        statusColor="#018786"
        title="Luma UI Component Showcase"
        subContent="Bộ thư viện React Native UI tuân theo chuẩn Luma UI"
        leftLine="#6200EE"
      >
        <Text style={{ marginTop: 8, color: '#757575', lineHeight: 20 }}>
          Khám phá toàn bộ hệ thống components chuẩn chỉnh của Luma UI. Chạm vào
          nút bên dưới hoặc biểu tượng Menu ở góc trên bên trái để mở ngăn kéo
          điều hướng đến từng component.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginTop: 12,
            flexWrap: 'wrap',
          }}
        >
          <Button
            label="Mở Menu Drawer"
            mode="elevated"
            icon={(size, color) => (
              <MaterialDesignIcons name="menu" size={size} color={color} />
            )}
            onPress={onOpenDrawer}
          />
          <Button
            label="🎨 Bảng màu Luma"
            mode="outlined"
            onPress={() => onNavigate('color')}
          />
        </View>
      </Card>

      {/* Danh mục component nổi bật */}
      <Section title="Thành phần điều hướng & Tương tác">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Chip
            label="🎨 Bảng màu Luma"
            variant="filter"
            selected
            onPress={() => onNavigate('color')}
          />
          <Chip
            label="Buttons"
            variant="filter"
            onPress={() => onNavigate('button')}
          />
          <Chip
            label="TextField"
            variant="filter"
            onPress={() => onNavigate('textField')}
          />
          <Chip
            label="Switch"
            variant="filter"
            onPress={() => onNavigate('switch')}
          />
          <Chip
            label="Checkbox"
            variant="filter"
            onPress={() => onNavigate('checkbox')}
          />
          <Chip
            label="RadioButton"
            variant="filter"
            onPress={() => onNavigate('radioButton')}
          />
          <Chip
            label="Slider"
            variant="filter"
            onPress={() => onNavigate('slider')}
          />
          <Chip
            label="Picker"
            variant="filter"
            onPress={() => onNavigate('picker')}
          />
          <Chip
            label="Date & Time"
            variant="filter"
            onPress={() => onNavigate('dateTimePicker')}
          />
        </View>
      </Section>

      <Divider />

      <Section title="Navigation & Khung nhìn">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Chip
            label="NavigationBar"
            variant="suggestion"
            onPress={() => onNavigate('navigationBar')}
          />
          <Chip
            label="Tabs"
            variant="suggestion"
            onPress={() => onNavigate('tabs')}
          />
          <Chip
            label="Drawer"
            variant="suggestion"
            onPress={() => onNavigate('drawer')}
          />
          <Chip
            label="Card"
            variant="suggestion"
            onPress={() => onNavigate('card')}
          />
          <Chip
            label="AppBar"
            variant="suggestion"
            onPress={() => onNavigate('appBar')}
          />
        </View>
      </Section>

      <Divider />

      <Section title="Thông báo & Phản hồi">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Chip
            label="Snackbar"
            variant="assist"
            onPress={() => onNavigate('snackbar')}
          />
          <Chip
            label="Bottom Sheet"
            variant="assist"
            onPress={() => onNavigate('bottomSheet')}
          />
          <Chip
            label="Dialog & Alert"
            variant="assist"
            onPress={() => onNavigate('dialog')}
          />
          <Chip
            label="ProgressBar & Loading"
            variant="assist"
            onPress={() => onNavigate('progressBar')}
          />
          <Chip
            label="Badges"
            variant="assist"
            onPress={() => onNavigate('badges')}
          />
          <Chip
            label="Tooltip"
            variant="assist"
            onPress={() => onNavigate('tooltip')}
          />
        </View>
      </Section>

      <Divider />

      <Section title="Hiển thị & Tiện ích">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Chip
            label="Image View"
            variant="suggestion"
            onPress={() => onNavigate('imageView')}
          />
          <Chip
            label="Watermark"
            variant="suggestion"
            onPress={() => onNavigate('watermark')}
          />
          <Chip
            label="Layout & Quyền"
            variant="suggestion"
            onPress={() => onNavigate('layout')}
          />
          <Chip
            label="Avatar"
            variant="suggestion"
            onPress={() => onNavigate('avatar')}
          />
          <Chip
            label="Skeleton"
            variant="suggestion"
            onPress={() => onNavigate('skeleton')}
          />
        </View>
      </Section>
    </ScrollView>
  );
};

export default HomeScreen;
