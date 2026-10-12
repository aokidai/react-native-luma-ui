import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Card, SearchBar, Text } from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const SearchBarScreen = () => {
  const [query, setQuery] = useState('');

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Card title="SearchBar với Debounce tự động">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Đã gõ: <Text style={{ fontWeight: '700' }}>"{query}"</Text> (Debounce
          200ms)
        </Text>
        <SearchBar
          placeholder="Tìm kiếm tài liệu, nhân viên..."
          onChangeText={setQuery}
          renderLeftIcon={() => (
            <MaterialDesignIcons name="magnify" size={20} color="#757575" />
          )}
          allowClear
        />
      </Card>

      <Card title="SearchBar dạng nút bấm (Trigger Mode)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Dùng làm thanh tìm kiếm ở màn hình chủ, khi bấm sẽ mở màn hình tìm
          kiếm chuyên biệt:
        </Text>
        <SearchBar
          placeholder="Chạm để mở trang tìm kiếm"
          renderLeftIcon={() => (
            <MaterialDesignIcons name="magnify" size={20} color="#6200EE" />
          )}
          onPress={() => Alert.alert('Thông báo', 'Đã mở trang tìm kiếm!')}
        />
      </Card>
    </ScrollView>
  );
};

export default SearchBarScreen;
