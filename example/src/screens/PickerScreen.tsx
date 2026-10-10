import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Card, Picker, Text } from 'react-native-luma-ui';

export const PickerScreen = () => {
  const [selectedCity, setSelectedCity] = useState<string | number>('hn');
  const [selectedSkills, setSelectedSkills] = useState<Array<string | number>>([
    'react',
    'ts',
  ]);

  const cityItems = [
    { label: 'Hà Nội', value: 'hn' },
    { label: 'TP. Hồ Chí Minh', value: 'hcm' },
    { label: 'Đà Nẵng', value: 'dn' },
    { label: 'Hải Phòng', value: 'hp' },
    { label: 'Cần Thơ', value: 'ct' },
  ];

  const skillItems = [
    { label: 'React Native', value: 'react' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'JavaScript', value: 'js' },
    { label: 'Material Design', value: 'm3' },
    { label: 'Node.js', value: 'node' },
  ];

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Single Select Picker */}
      <Card title="Chọn một mục (Single Select)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Có thanh tìm kiếm và hiển thị modal lựa chọn:
        </Text>
        <Picker
          label="Thành phố"
          items={cityItems}
          value={selectedCity}
          onSelect={(item) => setSelectedCity(item.value)}
          modalTitle="Chọn Thành phố"
        />
      </Card>

      {/* Multi Select Picker */}
      <Card title="Chọn nhiều mục (Multi Select)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Hỗ trợ chọn nhiều kỹ năng cùng lúc:
        </Text>
        <Picker
          label="Kỹ năng chuyên môn"
          items={skillItems}
          value={selectedSkills}
          multi
          onSelect={(item) => {
            if (selectedSkills.includes(item.value)) {
              setSelectedSkills(selectedSkills.filter((s) => s !== item.value));
            } else {
              setSelectedSkills([...selectedSkills, item.value]);
            }
          }}
          modalTitle="Chọn Kỹ năng"
        />
      </Card>
    </ScrollView>
  );
};

export default PickerScreen;
