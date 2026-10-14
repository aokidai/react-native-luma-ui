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
    { label: 'New York', value: 'hn' },
    { label: 'San Francisco', value: 'hcm' },
    { label: 'London', value: 'dn' },
    { label: 'Tokyo', value: 'hp' },
    { label: 'Paris', value: 'ct' },
  ];

  const skillItems = [
    { label: 'React Native', value: 'react' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'JavaScript', value: 'js' },
    { label: 'Luma UI Design', value: 'luma' },
    { label: 'Node.js', value: 'node' },
  ];

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Single Select Picker */}
      <Card title="Single Select Picker">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Includes search bar and selection modal:
        </Text>
        <Picker
          label="City"
          items={cityItems}
          value={selectedCity}
          onSelect={(item) => setSelectedCity(item.value)}
          modalTitle="Select City"
        />
      </Card>

      {/* Multi Select Picker */}
      <Card title="Multi-Select Picker">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Supports selecting multiple skills simultaneously:
        </Text>
        <Picker
          label="Technical Skills"
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
          modalTitle="Select Skills"
        />
      </Card>
    </ScrollView>
  );
};

export default PickerScreen;
