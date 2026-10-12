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

      <Card title="Switch.Item (Row với Label)">
        <View style={{ gap: 4, marginTop: 8 }}>
          <Switch.Item
            label="Thông báo đẩy"
            description="Nhận thông báo khi có tin nhắn mới"
            value={switch1}
            onValueChange={setSwitch1}
          />
          <Switch.Item
            label="Chế độ tối"
            description="Sử dụng giao diện ban đêm"
            value={switch2}
            onValueChange={setSwitch2}
          />
          <Switch.Item
            label="Định vị GPS"
            description="Tự động cập nhật vị trí hiện tại"
            value={false}
            disabled
          />
        </View>
      </Card>
    </ScrollView>
  );
};

export default SwitchScreen;
