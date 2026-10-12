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
      <Card title="RadioButton đơn lẻ">
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

      <Card title="RadioGroup với RadioButton.Item">
        <Text style={{ color: '#757575', marginBottom: 8 }}>
          Gói đang chọn:{' '}
          <Text style={{ fontWeight: '700' }}>{selectedPlan}</Text>
        </Text>
        <RadioButton.Group value={selectedPlan} onValueChange={setSelectedPlan}>
          <RadioButton.Item
            value="free"
            label="Gói Miễn phí"
            description="Tính năng cơ bản cho cá nhân"
          />
          <RadioButton.Item
            value="standard"
            label="Gói Tiêu chuẩn"
            description="Đầy đủ tính năng, 100GB lưu trữ"
          />
          <RadioButton.Item
            value="pro"
            label="Gói Chuyên nghiệp"
            description="Hỗ trợ 24/7, không giới hạn lưu lượng"
          />
          <RadioButton.Item
            value="enterprise"
            label="Gói Doanh nghiệp"
            description="Tùy biến cao cấp theo yêu cầu"
            disabled
          />
        </RadioButton.Group>
      </Card>
    </ScrollView>
  );
};

export default RadioButtonScreen;
