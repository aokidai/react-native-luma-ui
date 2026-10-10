import React from 'react';
import { ScrollView, View } from 'react-native';
import { AppBar, Card, IconButton } from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const AppBarScreen = () => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Card title="Top App Bar với Tiêu đề & Nút hành động">
        <View
          style={{
            borderRadius: 12,
            overflow: 'hidden',
            marginTop: 12,
            borderWidth: 1,
            borderColor: '#E0E0E0',
          }}
        >
          <AppBar
            title="Trang tổng quan"
            subtitle="Cập nhật 5 phút trước"
            leader={
              <IconButton
                mode="text"
                icon={(size, color) => (
                  <MaterialDesignIcons
                    name="arrow-left"
                    size={size}
                    color={color}
                  />
                )}
                onPress={() => {}}
              />
            }
            actions={[
              <IconButton
                mode="text"
                icon={(size, color) => (
                  <MaterialDesignIcons
                    name="magnify"
                    size={size}
                    color={color}
                  />
                )}
                onPress={() => {}}
              />,
              <IconButton
                mode="text"
                icon={(size, color) => (
                  <MaterialDesignIcons
                    name="dots-vertical"
                    size={size}
                    color={color}
                  />
                )}
                onPress={() => {}}
              />,
            ]}
          />
        </View>
      </Card>

      <Card title="Top App Bar Căn giữa (Center Title)">
        <View
          style={{
            borderRadius: 12,
            overflow: 'hidden',
            marginTop: 12,
            borderWidth: 1,
            borderColor: '#E0E0E0',
          }}
        >
          <AppBar
            title="Cài đặt hệ thống"
            centerTitle
            showBack
            onBack={() => {}}
          />
        </View>
      </Card>

      <Card title="Top App Bar Màu nền tùy biến">
        <View style={{ borderRadius: 12, overflow: 'hidden', marginTop: 12 }}>
          <AppBar
            title="Sắc thái Nổi bật"
            backgroundColor="#6200EE"
            titleStyle={{ color: '#ffffff' }}
            subtitle="Giao diện Luma UI"
            subtitleStyle={{ color: '#E0E0E0' }}
            showBack
            onBack={() => {}}
          />
        </View>
      </Card>
    </ScrollView>
  );
};

export default AppBarScreen;
