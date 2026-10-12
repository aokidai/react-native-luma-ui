import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, NavigationBar, Text } from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const NavigationBarScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Card title="Luma UI Navigation Bar (Bottom Tabs)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Thanh điều hướng dưới đáy màn hình với active pill indicator bo tròn
          64x32px chuẩn Luma UI:
        </Text>
        <Text style={{ marginBottom: 12 }}>
          Tab đang chọn:{' '}
          <Text style={{ fontWeight: '700' }}>Index {selectedTab}</Text>
        </Text>

        <View
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#E0E0E0',
          }}
        >
          <NavigationBar selectedIndex={selectedTab} onSelect={setSelectedTab}>
            <NavigationBar.Item
              label="Trang chủ"
              icon={<MaterialDesignIcons name="home-outline" size={24} />}
              activeIcon={
                <MaterialDesignIcons name="home" size={24} color="#6200EE" />
              }
            />
            <NavigationBar.Item
              label="Tìm kiếm"
              icon={<MaterialDesignIcons name="magnify" size={24} />}
              activeIcon={
                <MaterialDesignIcons name="magnify" size={24} color="#6200EE" />
              }
            />
            <NavigationBar.Item
              label="Thông báo"
              icon={<MaterialDesignIcons name="bell-outline" size={24} />}
              activeIcon={
                <MaterialDesignIcons name="bell" size={24} color="#6200EE" />
              }
            />
            <NavigationBar.Item
              label="Cá nhân"
              icon={<MaterialDesignIcons name="account-outline" size={24} />}
              activeIcon={
                <MaterialDesignIcons name="account" size={24} color="#6200EE" />
              }
            />
          </NavigationBar>
        </View>
      </Card>
    </ScrollView>
  );
};

export default NavigationBarScreen;
