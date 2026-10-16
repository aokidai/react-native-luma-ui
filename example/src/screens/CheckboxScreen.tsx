import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Checkbox } from 'react-native-luma-ui';

export const CheckboxScreen = () => {
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Card title="Basic Checkbox">
        <View style={{ gap: 8, marginTop: 8 }}>
          <Checkbox
            label="Default Checkbox (Square)"
            checked={checked1}
            onValueChange={setChecked1}
          />
          <Checkbox
            label="Circular Checkbox (Circle shape)"
            shape="circle"
            checked={checked2}
            onValueChange={setChecked2}
          />
          <Checkbox
            label="Indeterminate State"
            indeterminate
            color="#03DAC6"
          />
          <Checkbox label="Selected (Disabled)" checked disabled />
        </View>
      </Card>

      <Card title="Checkbox.Item (Full width row)">
        <View style={{ gap: 4, marginTop: 8 }}>
          <Checkbox.Item
            label="Option A"
            description="Sub-description for option A"
            position="trailing"
            checked={checked3}
            onValueChange={setChecked3}
          />
          <Checkbox.Item
            label="Option B (Leading icon)"
            position="leading"
            checked={true}
          />
        </View>
      </Card>
    </ScrollView>
  );
};

export default CheckboxScreen;
