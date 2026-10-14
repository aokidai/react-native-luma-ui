import React from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Divider, Text } from 'react-native-luma-ui';

export const DividerScreen = () => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Card title="Horizontal Divider">
        <Text style={{ marginVertical: 8 }}>Paragraph above</Text>
        <Divider />
        <Text style={{ marginVertical: 8 }}>Paragraph below</Text>
      </Card>

      <Card title="Inset & Bold Divider">
        <Text style={{ marginVertical: 8 }}>Inset (padded on both sides):</Text>
        <Divider inset insetType="both" />
        <Text style={{ marginVertical: 8 }}>Bold (1px height):</Text>
        <Divider bold color="#6200EE" />
      </Card>

      <Card title="Vertical Divider">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 40,
            justifyContent: 'space-around',
          }}
        >
          <Text>Item 1</Text>
          <Divider vertical />
          <Text>Item 2</Text>
          <Divider vertical />
          <Text>Item 3</Text>
        </View>
      </Card>
    </ScrollView>
  );
};

export default DividerScreen;
