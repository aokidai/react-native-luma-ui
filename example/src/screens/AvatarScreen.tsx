import React from 'react';
import { ScrollView, View } from 'react-native';
import { Avatar, AvatarGroup, Card, Text } from 'react-native-luma-ui';

export const AvatarScreen = () => {
  const users = [
    { name: 'Nguyễn Văn An' },
    { name: 'Trần Thị Bình' },
    { name: 'Lê Hoàng Cường' },
    { name: 'Phạm Minh Đức' },
    { name: 'Hoàng Thị Mai' },
    { name: 'Vũ Quốc Nam' },
    { name: 'Đặng Thu Trang' },
  ];

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Avatar Variants */}
      <Card title="Avatar Cá nhân (Tự trích xuất Initials)">
        <View
          style={{
            flexDirection: 'row',
            gap: 16,
            alignItems: 'center',
            marginTop: 12,
          }}
        >
          <Avatar name="Nguyễn Văn An" size={48} />
          <Avatar name="Trần Bình" size={40} backgroundColor="#018786" />
          <Avatar name="Cường" size={32} backgroundColor="#C16C07" />
          <Avatar name="Mai" size={24} backgroundColor="#B00020" />
        </View>
      </Card>

      {/* Avatar Group */}
      <Card title="Avatar Group (Xếp chồng với huy hiệu +N)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Tối đa hiển thị 4 avatar, các thành viên còn lại gom vào huy hiệu
          `+N`:
        </Text>
        <AvatarGroup users={users} maxDisplay={4} size={38} />
      </Card>
    </ScrollView>
  );
};

export default AvatarScreen;
