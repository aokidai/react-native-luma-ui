import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Tabs, Text } from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const TabsScreen = () => {
  const [fixedTab, setFixedTab] = useState(0);
  const [scrollTab, setScrollTab] = useState(1);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Fixed Tabs */}
      <Card title="Fixed Tabs with Underline Indicator">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Underline bar slides smoothly to active tab:
        </Text>
        <View
          style={{
            borderRadius: 12,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#E0E0E0',
          }}
        >
          <Tabs selectedIndex={fixedTab} onSelect={setFixedTab}>
            <Tabs.Tab
              label="Overview"
              icon={<MaterialDesignIcons name="view-dashboard" size={18} />}
            />
            <Tabs.Tab
              label="Details"
              icon={<MaterialDesignIcons name="file-document" size={18} />}
            />
            <Tabs.Tab
              label="Reviews"
              icon={<MaterialDesignIcons name="star" size={18} />}
            />
          </Tabs>
        </View>
        <Text
          style={{
            marginTop: 12,
            textAlign: 'center',
            color: '#6200EE',
            fontWeight: '600',
          }}
        >
          Content for Tab {fixedTab + 1}
        </Text>
      </Card>

      {/* Scrollable Tabs */}
      <Card title="Scrollable Tabs">
        <View
          style={{
            borderRadius: 12,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#E0E0E0',
          }}
        >
          <Tabs scrollable selectedIndex={scrollTab} onSelect={setScrollTab}>
            <Tabs.Tab label="All" />
            <Tabs.Tab label="Popular" />
            <Tabs.Tab label="Tech" />
            <Tabs.Tab label="Design" />
            <Tabs.Tab label="Kinh doanh" />
            <Tabs.Tab label="Lifestyle" />
          </Tabs>
        </View>
      </Card>
    </ScrollView>
  );
};

export default TabsScreen;
