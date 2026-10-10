import React, { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { BottomAlert, Button, Card, Dialog, Text } from 'react-native-luma-ui';

export const DialogScreen = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [bottomAlertVisible, setBottomAlertVisible] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Dialog */}
      <Card title="Material 3 Dialog Modal">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Hộp thoại pop-up ở giữa màn hình thông báo hoặc xác nhận thao tác quan
          trọng.
        </Text>
        <Button
          label="Mở Hộp thoại (Dialog)"
          mode="elevated"
          onPress={() => setDialogVisible(true)}
        />
      </Card>

      {/* Bottom Alert / Sheet */}
      <Card title="Bottom Alert (Modal trượt từ đáy)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Hiển thị thông báo hoặc các tùy chọn dạng Bottom Sheet trượt từ đáy
          màn hình lên.
        </Text>
        <Button
          label="Mở Bottom Alert"
          mode="outlined"
          onPress={() => setBottomAlertVisible(true)}
        />
      </Card>

      {/* Dialog Component */}
      <Dialog
        visible={dialogVisible}
        onClose={() => setDialogVisible(false)}
        title="Xác nhận xóa tài khoản?"
        footer={
          <>
            <Button
              label="Hủy bỏ"
              mode="text"
              onPress={() => setDialogVisible(false)}
            />
            <Button
              label="Xác nhận"
              mode="elevated"
              labelColor="#ffffff"
              style={{ backgroundColor: '#B00020' }}
              onPress={() => {
                setDialogVisible(false);
                Alert.alert('Thông báo', 'Đã xác nhận!');
              }}
            />
          </>
        }
      >
        <Text style={{ color: '#616161', lineHeight: 22 }}>
          Hành động này không thể hoàn tác. Mọi thông tin và dữ liệu lịch sử
          liên kết với tài khoản này sẽ bị xóa vĩnh viễn khỏi hệ thống.
        </Text>
      </Dialog>

      {/* BottomAlert Component */}
      <BottomAlert
        visible={bottomAlertVisible}
        onClose={() => setBottomAlertVisible(false)}
      >
        <View style={{ paddingVertical: 12, gap: 12 }}>
          <Text theme="titleLarge">Tùy chọn tác vụ</Text>
          <Text style={{ color: '#757575' }}>
            Chọn một hành động bạn muốn thực hiện tiếp theo:
          </Text>
          <Button
            label="Chia sẻ tài liệu"
            mode="outlined"
            onPress={() => setBottomAlertVisible(false)}
          />
          <Button
            label="Đóng thông báo"
            mode="text"
            onPress={() => setBottomAlertVisible(false)}
          />
        </View>
      </BottomAlert>
    </ScrollView>
  );
};

export default DialogScreen;
