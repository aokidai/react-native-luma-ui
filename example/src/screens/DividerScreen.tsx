import React from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Divider, Text } from 'react-native-luma-ui';

export const DividerScreen = () => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Card title="Đường phân cách cơ bản (Horizontal)">
        <Text style={{ marginVertical: 8 }}>Đoạn văn phía trên</Text>
        <Divider />
        <Text style={{ marginVertical: 8 }}>Đoạn văn phía dưới</Text>
      </Card>

      <Card title="Divider dạng Inset & Bold">
        <Text style={{ marginVertical: 8 }}>Inset thụt lề 2 bên:</Text>
        <Divider inset insetType="both" />
        <Text style={{ marginVertical: 8 }}>Đậm (Bold 1px):</Text>
        <Divider bold color="#6200EE" />
      </Card>

      <Card title="Divider dạng dọc (Vertical)">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 40,
            justifyContent: 'space-around',
          }}
        >
          <Text>Mục 1</Text>
          <Divider vertical />
          <Text>Mục 2</Text>
          <Divider vertical />
          <Text>Mục 3</Text>
        </View>
      </Card>
    </ScrollView>
  );
};

export default DividerScreen;
