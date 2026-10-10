import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, Loading, ProgressBar, Text } from 'react-native-luma-ui';

export const ProgressBarScreen = () => {
  const [progress, setProgress] = useState(0.4);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Determinate Linear Progress */}
      <Card title="Linear Progress Bar (Xác định tiến độ)">
        <Text style={{ marginTop: 4, color: '#757575', marginBottom: 12 }}>
          Tiến trình:{' '}
          <Text style={{ fontWeight: '700' }}>
            {Math.round(progress * 100)}%
          </Text>
        </Text>
        <ProgressBar progress={progress} height={6} borderRadius={3} />
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
          <Button
            label="- 20%"
            mode="outlined"
            onPress={() => setProgress(Math.max(0, progress - 0.2))}
          />
          <Button
            label="+ 20%"
            mode="outlined"
            onPress={() => setProgress(Math.min(1, progress + 0.2))}
          />
        </View>
      </Card>

      {/* Indeterminate Linear Progress */}
      <Card title="Indeterminate Progress Bar (Vòng lặp tải liên tục)">
        <Text style={{ marginTop: 4, color: '#757575', marginBottom: 12 }}>
          Chạy liên tục không xác định thời gian hoàn thành:
        </Text>
        <ProgressBar indeterminate height={4} color="#03DAC6" />
      </Card>

      {/* Loading Spinners */}
      <Card title="Loading Spinner Indicators">
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 12,
          }}
        >
          <Loading size="small" label="Đang tải..." />
          <Loading size="large" color="#03DAC6" label="Xử lý..." />
        </View>
      </Card>
    </ScrollView>
  );
};

export default ProgressBarScreen;
