import React, { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Button, Card, Snackbar, Text } from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const SnackbarScreen = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, gap: 16 }}
      >
        <Card title="Luma UI Snackbar">
          <Text style={{ color: '#757575', marginBottom: 12 }}>
            Snackbar cung cấp thông điệp ngắn ở đáy màn hình và tự động biến mất
            sau thời gian định sẵn.
          </Text>
          <View style={{ gap: 10 }}>
            <Button
              label="Hiển thị Snackbar cơ bản"
              mode="elevated"
              onPress={() => setVisible1(true)}
            />
            <Button
              label="Snackbar kèm nút Hoàn tác (Action)"
              mode="outlined"
              onPress={() => setVisible2(true)}
            />
          </View>
        </Card>
      </ScrollView>

      {/* Snackbar 1 */}
      <Snackbar
        visible={visible1}
        onDismiss={() => setVisible1(false)}
        duration={3000}
        icon={
          <MaterialDesignIcons name="check-circle" size={20} color="#03DAC6" />
        }
      >
        Dữ liệu đã được lưu thành công!
      </Snackbar>

      {/* Snackbar 2 */}
      <Snackbar
        visible={visible2}
        onDismiss={() => setVisible2(false)}
        duration={4000}
        action={{
          label: 'HOÀN TÁC',
          onPress: () => Alert.alert('Thông báo', 'Đã hoàn tác thao tác!'),
          color: '#03DAC6',
        }}
      >
        Đã chuyển mục vào thùng rác.
      </Snackbar>
    </View>
  );
};

export default SnackbarScreen;
