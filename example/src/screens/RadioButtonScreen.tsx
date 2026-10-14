import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, RadioButton, Text } from 'react-native-luma-ui';

export const RadioButtonScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState('standard');

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Card title="Single RadioButton">
        <View
          style={{
            flexDirection: 'row',
            gap: 16,
            alignItems: 'center',
            marginTop: 12,
          }}
        >
          <RadioButton selected={true} />
          <RadioButton selected={false} />
          <RadioButton selected={true} color="#03DAC6" />
          <RadioButton selected={true} disabled />
        </View>
      </Card>

      <Card title="RadioGroup with RadioButton.Item">
        <Text style={{ color: '#757575', marginBottom: 8 }}>
          Selected plan:{' '}
          <Text style={{ fontWeight: '700' }}>{selectedPlan}</Text>
        </Text>
        <RadioButton.Group value={selectedPlan} onValueChange={setSelectedPlan}>
          <RadioButton.Item
            value="free"
            label="Free Plan"
            description="Basic features for individuals"
          />
          <RadioButton.Item
            value="standard"
            label="Standard Plan"
            description="Full features, 100GB storage"
          />
          <RadioButton.Item
            value="pro"
            label="Professional Plan"
            description="24/7 support, unlimited bandwidth"
          />
          <RadioButton.Item
            value="enterprise"
            label="Enterprise Plan"
            description="Custom enterprise-grade solutions"
            disabled
          />
        </RadioButton.Group>
      </Card>
    </ScrollView>
  );
};

export default RadioButtonScreen;
