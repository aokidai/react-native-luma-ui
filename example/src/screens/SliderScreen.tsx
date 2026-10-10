import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Slider, Text } from 'react-native-luma-ui';

export const SliderScreen = () => {
  const [val1, setVal1] = useState(40);
  const [val2, setVal2] = useState(75);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Card title="Slider tương tác cử chỉ (Drag/Pan)">
        <Text style={{ marginTop: 4, color: '#757575' }}>
          Giá trị hiện tại: <Text style={{ fontWeight: '700' }}>{val1}</Text> /
          100
        </Text>
        <View style={{ marginTop: 12 }}>
          <Slider
            value={val1}
            onValueChange={setVal1}
            min={0}
            max={100}
            step={1}
          />
        </View>
      </Card>

      <Card title="Slider với màu sắc tùy biến & Bước nhảy">
        <Text style={{ marginTop: 4, color: '#757575' }}>
          Âm lượng (Bước 5): <Text style={{ fontWeight: '700' }}>{val2}%</Text>
        </Text>
        <View style={{ marginTop: 12 }}>
          <Slider
            value={val2}
            onValueChange={setVal2}
            min={0}
            max={100}
            step={5}
            color="#03DAC6"
          />
        </View>
      </Card>

      <Card title="Slider vô hiệu hóa (Disabled)">
        <View style={{ marginTop: 12 }}>
          <Slider value={30} disabled />
        </View>
      </Card>
    </ScrollView>
  );
};

export default SliderScreen;
