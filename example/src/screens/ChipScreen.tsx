import React, { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Card, Chip } from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const ChipScreen = () => {
  const [filter1, setFilter1] = useState(true);
  const [filter2, setFilter2] = useState(false);
  const [chips, setChips] = useState(['React Native', 'TypeScript', 'Luma UI']);

  const removeChip = (tag: string) => {
    setChips(chips.filter((c) => c !== tag));
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* 4 Biến thể Luma UI */}
      <Card title="4 Biến thể Chip (Luma UI)">
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 12,
          }}
        >
          <Chip
            label="Assist Chip"
            variant="assist"
            icon={
              <MaterialDesignIcons name="calendar" size={16} color="#6200EE" />
            }
            onPress={() => Alert.alert('Thông báo', 'Assist pressed')}
          />
          <Chip
            label="Filter Chip"
            variant="filter"
            selected={filter1}
            onPress={() => setFilter1(!filter1)}
          />
          <Chip
            label="Filter Chip (Unselected)"
            variant="filter"
            selected={filter2}
            onPress={() => setFilter2(!filter2)}
          />
          <Chip
            label="Suggestion Chip"
            variant="suggestion"
            onPress={() => Alert.alert('Thông báo', 'Suggestion pressed')}
          />
        </View>
      </Card>

      {/* Input Chips with Delete */}
      <Card title="Input Chips (Có nút xóa Close)">
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 12,
          }}
        >
          {chips.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              variant="input"
              onClose={() => removeChip(tag)}
            />
          ))}
        </View>
      </Card>

      {/* Elevated Chips */}
      <Card title="Elevated Chips">
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 12,
          }}
        >
          <Chip label="Đổ bóng nhẹ" elevated />
          <Chip label="Elevated Selected" elevated selected />
        </View>
      </Card>
    </ScrollView>
  );
};

export default ChipScreen;
