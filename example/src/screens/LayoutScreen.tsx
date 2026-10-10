import React, { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import {
  ActionGroup,
  Button,
  Card,
  HTMLReader,
  IconButton,
  NoContent,
  PermissionAlert,
  Section,
  Text,
} from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const LayoutScreen = () => {
  const [permissionVisible, setPermissionVisible] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Section Component */}
      <Card title="Section (Phân đoạn nội dung)">
        <Section
          title="Nhóm công việc dự án"
          action={<Button label="Xem thêm" mode="text" onPress={() => {}} />}
        >
          <Text style={{ color: '#757575' }}>
            Nội dung bên trong Section được bố cục linh hoạt và có header tiêu
            đề rõ ràng.
          </Text>
        </Section>
      </Card>

      {/* ActionGroup Component */}
      <Card title="ActionGroup (Nhóm nút bo tròn pill)">
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <ActionGroup>
            <IconButton
              mode="text"
              icon={(size, color) => (
                <MaterialDesignIcons
                  name="format-bold"
                  size={size}
                  color={color}
                />
              )}
            />
            <IconButton
              mode="text"
              icon={(size, color) => (
                <MaterialDesignIcons
                  name="format-italic"
                  size={size}
                  color={color}
                />
              )}
            />
            <IconButton
              mode="text"
              icon={(size, color) => (
                <MaterialDesignIcons
                  name="format-underline"
                  size={size}
                  color={color}
                />
              )}
            />
          </ActionGroup>
        </View>
      </Card>

      {/* NoContent Component */}
      <Card title="NoContent (Trạng thái rỗng)">
        <NoContent
          title="Chưa có dữ liệu nào"
          description="Hãy tạo mới một mục đầu tiên để bắt đầu."
          icon={
            <MaterialDesignIcons
              name="folder-open-outline"
              size={40}
              color="#6200EE"
            />
          }
          buttonText="Tạo mục mới"
          onPressButton={() => Alert.alert('Thông báo', 'Bấm tạo mục mới!')}
        />
      </Card>

      {/* HTMLReader Component */}
      <Card title="HTMLReader (Hiển thị Rich Text)">
        <HTMLReader html="<p>Chào mừng đến với <b>Luma UI</b>! Thư viện cung cấp các thành phần <i>Material Design 3</i> hiện đại. <br/>Xem thêm tại <a href='https://github.com'>GitHub</a>.</p>" />
      </Card>

      {/* PermissionAlert Component */}
      <Card title="PermissionAlert (Hộp thoại xin quyền)">
        <Button
          label="Mở Alert xin quyền Camera"
          mode="outlined"
          onPress={() => setPermissionVisible(true)}
        />
      </Card>

      <PermissionAlert
        visible={permissionVisible}
        onClose={() => setPermissionVisible(false)}
        permissionName="Camera & Bộ nhớ"
        description="Cho phép Luma UI truy cập máy ảnh để chụp ảnh hồ sơ và quét mã QR."
      />
    </ScrollView>
  );
};

export default LayoutScreen;
