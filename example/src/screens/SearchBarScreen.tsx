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
      <Card title="SearchBar with Automatic Debounce">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Typed: <Text style={{ fontWeight: '700' }}>"{query}"</Text> (Debounce
          200ms)
        </Text>
        <SearchBar
          placeholder="Search documents, employees..."
          onChangeText={setQuery}
          renderLeftIcon={() => (
            <MaterialDesignIcons name="magnify" size={20} color="#757575" />
          )}
          allowClear
        />
      </Card>

      <Card title="Trigger Mode SearchBar">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Used as home search trigger, opens dedicated search screen on tap:
        </Text>
        <SearchBar
          placeholder="Tap to open search page"
          renderLeftIcon={() => (
            <MaterialDesignIcons name="magnify" size={20} color="#6200EE" />
          )}
          onPress={() => Alert.alert('Notification', 'Search page opened!')}
        />
      </Card>
    </ScrollView>
  );
};

export default SearchBarScreen;
