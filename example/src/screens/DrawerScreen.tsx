import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, Drawer, Text } from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const DrawerScreen = () => {
  const [demoOpen, setDemoOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('inbox');

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Card title="Navigation Drawer (Luma UI)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Ngăn kéo điều hướng với hiệu ứng trượt Slide & Backdrop Animation. Bấm
          nút dưới để thử mở một Drawer demo độc lập:
        </Text>
        <Button
          label="Mở Drawer Demo"
          mode="elevated"
          onPress={() => setDemoOpen(true)}
        />
      </Card>

      {/* Demo Drawer */}
      <Drawer
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        header={
          <View style={{ gap: 4 }}>
            <Text theme="titleLarge">Luma Demo Drawer</Text>
            <Text style={{ color: '#757575', fontSize: 13 }}>
              user@example.com
            </Text>
          </View>
        }
        footer={
          <Button
            label="Đăng xuất"
            mode="text"
            onPress={() => setDemoOpen(false)}
          />
        }
      >
        <Drawer.Section title="Hộp thư">
          <Drawer.Item
            label="Hộp thư đến"
            icon={<MaterialDesignIcons name="inbox" size={20} />}
            active={activeItem === 'inbox'}
            onPress={() => setActiveItem('inbox')}
            badge={
              <Text style={{ color: '#6200EE', fontWeight: '700' }}>24</Text>
            }
          />
          <Drawer.Item
            label="Đã gửi"
            icon={<MaterialDesignIcons name="send" size={20} />}
            active={activeItem === 'sent'}
            onPress={() => setActiveItem('sent')}
          />
          <Drawer.Item
            label="Thùng rác"
            icon={<MaterialDesignIcons name="delete" size={20} />}
            active={activeItem === 'trash'}
            onPress={() => setActiveItem('trash')}
          />
        </Drawer.Section>
      </Drawer>
    </ScrollView>
  );
};

export default DrawerScreen;
