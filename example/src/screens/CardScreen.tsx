import React from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Button, Card, Text } from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const CardScreen = () => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Basic Card */}
      <Card title="Thẻ cơ bản (Basic Card)">
        <Text style={{ color: '#757575', marginTop: 4 }}>
          Thẻ đơn giản bao bọc các phần tử con bên trong với độ bo góc và màu
          nền theo hệ thống Design Tokens.
        </Text>
      </Card>

      {/* Rich Card với Accent Left Line */}
      <Card
        title="Dự án Alpha"
        content="Hoàn thiện tài liệu kiến trúc hệ thống và tích hợp giao diện"
        subContent="Hạn chót: 15/10/2026"
        priority="Ưu tiên cao"
        priorityColor="#B00020"
        status="Đang thực hiện"
        statusColor="#C16C07"
        leftLine="#6200EE"
        time="Hôm nay, 14:00"
        footer={<Button label="Chi tiết" mode="text" onPress={() => {}} />}
      />

      {/* Clickable Card */}
      <Card
        title="Thẻ có thể tương tác (Clickable)"
        subContent="Chạm vào thẻ này để kích hoạt sự kiện onPress"
        onPress={() => Alert.alert('Thông báo', 'Đã bấm vào Card!')}
        borderColor="#6200EE"
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginTop: 8,
          }}
        >
          <MaterialDesignIcons name="gesture-tap" size={20} color="#6200EE" />
          <Text style={{ color: '#6200EE', fontWeight: '600' }}>
            Chạm vào đây
          </Text>
        </View>
      </Card>
    </ScrollView>
  );
};

export default CardScreen;
