import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { BottomSheet, Button, Card, Text } from 'react-native-luma-ui';

export const BottomSheetScreen = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [footerOpen, setFooterOpen] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Card title="Bottom Sheet cơ bản (Kéo vuốt đóng)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Hiển thị sheet từ cạnh dưới màn hình, có thanh kéo (drag handle), cử
          chỉ vuốt xuống để đóng và hiệu ứng backdrop mượt mà.
        </Text>
        <Button
          label="Mở Bottom Sheet"
          mode="elevated"
          onPress={() => setBasicOpen(true)}
        />
      </Card>

      <Card title="Bottom Sheet có Footer hành động">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Bottom Sheet hỗ trợ tiêu đề, nút đóng, vùng nội dung cuộn và footer
          ghim dưới đáy.
        </Text>
        <Button
          label="Mở Sheet với Footer"
          mode="outlined"
          onPress={() => setFooterOpen(true)}
        />
      </Card>

      {/* Basic Bottom Sheet */}
      <BottomSheet
        visible={basicOpen}
        onClose={() => setBasicOpen(false)}
        title="Thông tin chi tiết"
      >
        <View style={{ gap: 12, paddingVertical: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>
            Luma UI Bottom Sheet
          </Text>
          <Text style={{ color: '#555555', lineHeight: 22 }}>
            Bottom Sheet này được xây dựng thuần React Native với Animated và
            PanResponder. Bạn có thể kéo thanh nắm ở trên xuống để đóng, chạm
            vào nền mờ backdrop, hoặc bấm nút X.
          </Text>
          <Button
            label="Đóng Sheet"
            mode="outlined"
            onPress={() => setBasicOpen(false)}
            style={{ marginTop: 8 }}
          />
        </View>
      </BottomSheet>

      {/* Bottom Sheet with Footer */}
      <BottomSheet
        visible={footerOpen}
        onClose={() => setFooterOpen(false)}
        title="Tùy chọn cấu hình"
        renderFooter={() => (
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              justifyContent: 'flex-end',
              paddingBottom: 8,
            }}
          >
            <Button
              label="Hủy bỏ"
              mode="text"
              onPress={() => setFooterOpen(false)}
            />
            <Button
              label="Lưu thay đổi"
              mode="elevated"
              onPress={() => setFooterOpen(false)}
            />
          </View>
        )}
      >
        <View style={{ gap: 14, paddingVertical: 8 }}>
          <Text style={{ color: '#666666' }}>
            Vùng nội dung bên trong Bottom Sheet có thể chứa bất kỳ component
            nào như form nhập liệu, danh sách lựa chọn hoặc thông báo xác nhận.
          </Text>
          <View
            style={{
              padding: 14,
              backgroundColor: '#F3EDF7',
              borderRadius: 14,
              borderWidth: 1,
              borderColor: '#6750A430',
            }}
          >
            <Text style={{ color: '#6750A4', fontWeight: '600' }}>
              ✓ Đã tích hợp chuẩn Safe Area Insets cho cả Android và iOS
            </Text>
          </View>
        </View>
      </BottomSheet>
    </ScrollView>
  );
};

export default BottomSheetScreen;
