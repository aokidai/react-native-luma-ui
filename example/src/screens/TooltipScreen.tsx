import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, Text, Tooltip } from 'react-native-luma-ui';

export const TooltipScreen = () => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Card title="Material 3 Tooltip">
        <Text style={{ color: '#757575', marginBottom: 16 }}>
          Chạm hoặc giữ vào các nút bên dưới để hiển thị tooltip hướng dẫn:
        </Text>

        <View style={{ gap: 24, alignItems: 'flex-start' }}>
          <Tooltip title="Tooltip hiển thị phía trên" position="top">
            <Button label="Chạm xem Tooltip Top" mode="outlined" />
          </Tooltip>

          <Tooltip title="Tooltip hiển thị phía dưới" position="bottom">
            <Button label="Chạm xem Tooltip Bottom" mode="outlined" />
          </Tooltip>
        </View>
      </Card>
    </ScrollView>
  );
};

export default TooltipScreen;
