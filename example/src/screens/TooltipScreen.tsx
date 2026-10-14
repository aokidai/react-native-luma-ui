import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, Text, Tooltip } from 'react-native-luma-ui';

export const TooltipScreen = () => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Card title="Luma UI Tooltip">
        <Text style={{ color: '#757575', marginBottom: 16 }}>
          Tap or hold the buttons below to display helper tooltips:
        </Text>

        <View style={{ gap: 24, alignItems: 'flex-start' }}>
          <Tooltip title="Tooltip displayed above" position="top">
            <Button label="Tap for Top Tooltip" mode="outlined" />
          </Tooltip>

          <Tooltip title="Tooltip displayed below" position="bottom">
            <Button label="Tap for Bottom Tooltip" mode="outlined" />
          </Tooltip>
        </View>
      </Card>
    </ScrollView>
  );
};

export default TooltipScreen;
