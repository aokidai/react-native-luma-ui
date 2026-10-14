import React from 'react';
import { ScrollView, View } from 'react-native';
import { Avatar, AvatarGroup, Card, Text } from 'react-native-luma-ui';

export const AvatarScreen = () => {
  const users = [
    { name: 'Alex Morgan' },
    { name: 'Bella Thorne' },
    { name: 'Charlie Brown' },
    { name: 'David Miller' },
    { name: 'Emma Watson' },
    { name: 'Frank Ocean' },
    { name: 'Grace Hopper' },
  ];

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Avatar Variants */}
      <Card title="Individual Avatar (Auto-extracted Initials)">
        <View
          style={{
            flexDirection: 'row',
            gap: 16,
            alignItems: 'center',
            marginTop: 12,
          }}
        >
          <Avatar name="Alex Morgan" size={48} />
          <Avatar name="Bella T" size={40} backgroundColor="#018786" />
          <Avatar name="Charlie" size={32} backgroundColor="#C16C07" />
          <Avatar name="Mai" size={24} backgroundColor="#B00020" />
        </View>
      </Card>

      {/* Avatar Group */}
      <Card title="Avatar Group (Stacked with +N Badge)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Displays up to 4 avatars, remaining members grouped in a badge
          `+N`:
        </Text>
        <AvatarGroup users={users} maxDisplay={4} size={38} />
      </Card>
    </ScrollView>
  );
};

export default AvatarScreen;
