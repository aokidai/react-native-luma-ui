import React from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Text, Watermark } from 'react-native-luma-ui';

export const WatermarkScreen = () => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Watermark với ảnh */}
      <Card title="Gắn Watermark thông tin lên ảnh">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Watermark hiển thị thông tin người dùng, thời gian, ngày tháng và địa
          chỉ:
        </Text>
        <View style={{ height: 260, borderRadius: 16, overflow: 'hidden' }}>
          <Watermark
            imageUri="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800"
            userName="Nguyễn Văn An"
            address="Tòa nhà Luma, Quận 1, TP. Hồ Chí Minh"
            locationText="10.7769° N, 106.7009° E"
            time="14:30:25"
            date="10/10/2026"
            position="bottom-left"
          />
        </View>
      </Card>

      {/* Watermark góc trên (Top-Right) */}
      <Card title="Watermark vị trí góc trên (Top-Right)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Được căn chỉnh linh hoạt ở 4 góc màn hình/ảnh chụp:
        </Text>
        <View style={{ height: 200, borderRadius: 16, overflow: 'hidden' }}>
          <Watermark
            userName="Dự án Alpha - Luma UI"
            time="19:45"
            date="10/10/2026"
            position="top-right"
            style={{ backgroundColor: '#1A237E' }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{ color: '#9FA8DA', fontSize: 16, fontWeight: '600' }}
              >
                Khu vực nội dung / Tài liệu mật
              </Text>
            </View>
          </Watermark>
        </View>
      </Card>
    </ScrollView>
  );
};

export default WatermarkScreen;
