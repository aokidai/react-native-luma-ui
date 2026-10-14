import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Switch } from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const SwitchScreen = () => {
  const [switch1, setSwitch1] = useState(true);
  const [switch2, setSwitch2] = useState(false);
  const [switch3, setSwitch3] = useState(true);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Card title="Luma UI Toggle Switch">
        <View
          style={{
            flexDirection: 'row',
            gap: 16,
            alignItems: 'center',
            marginTop: 12,
          }}
        >
          <Switch value={switch1} onValueChange={setSwitch1} />
          <Switch value={switch2} onValueChange={setSwitch2} color="#03DAC6" />
          <Switch
            value={switch3}
            onValueChange={setSwitch3}
            thumbIcon={({ checked, size }) => (
              <MaterialDesignIcons
                name={checked ? 'check' : 'close'}
                size={size}
                color={checked ? '#6200EE' : '#757575'}
              />
            )}
          />
          <Switch value={false} disabled />
        </View>
      </Card>

      <Card title="Switch.Item (Row with Label)">
        <View style={{ gap: 4, marginTop: 8 }}>
          <Switch.Item
            label="Push Notifications"
            description="Receive alerts when new messages arrive"
            value={switch1}
            onValueChange={setSwitch1}
          />
          <Switch.Item
            label="Dark Mode"
            description="Use dark theme"
            value={switch2}
            onValueChange={setSwitch2}
          />
          <Switch.Item
            label="Location Services"
            description="Automatically update current location"
            value={false}
            disabled
          />
        </View>
      </Card>
    </ScrollView>
  );
};

export default SwitchScreen;
