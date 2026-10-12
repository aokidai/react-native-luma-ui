import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, SegmentedButton, Text } from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const SegmentedButtonScreen = () => {
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Card title="Segmented Buttons (Luma UI)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Lựa chọn chế độ xem theo ngày, tuần hoặc tháng:
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <SegmentedButton
            label="Ngày"
            selected={viewMode === 'day'}
            onPress={() => setViewMode('day')}
            icon={
              <MaterialDesignIcons
                name="view-day"
                size={16}
                color={viewMode === 'day' ? '#fff' : '#6200EE'}
              />
            }
          />
          <SegmentedButton
            label="Tuần"
            selected={viewMode === 'week'}
            onPress={() => setViewMode('week')}
            icon={
              <MaterialDesignIcons
                name="view-week"
                size={16}
                color={viewMode === 'week' ? '#fff' : '#6200EE'}
              />
            }
          />
          <SegmentedButton
            label="Tháng"
            selected={viewMode === 'month'}
            onPress={() => setViewMode('month')}
            icon={
              <MaterialDesignIcons
                name="calendar-month"
                size={16}
                color={viewMode === 'month' ? '#fff' : '#6200EE'}
              />
            }
          />
        </View>
      </Card>

      <Card title="Segmented Buttons Tùy chỉnh màu sắc & Disabled">
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
          <SegmentedButton
            label="Active Màu Teal"
            selected={true}
            selectedColor="#03DAC6"
            selectedTextColor="#000000"
            onPress={() => {}}
          />
          <SegmentedButton
            label="Vô hiệu hóa"
            selected={false}
            disabled
            onPress={() => {}}
          />
        </View>
      </Card>
    </ScrollView>
  );
};

export default SegmentedButtonScreen;
