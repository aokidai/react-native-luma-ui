import React from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Skeleton } from 'react-native-luma-ui';

export const SkeletonScreen = () => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Article placeholder */}
      <Card title="Khung chờ bài viết (Article Placeholder)">
        <View style={{ gap: 12, marginTop: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Skeleton circle height={48} width={48} />
            <View style={{ flex: 1, gap: 6 }}>
              <Skeleton width="60%" height={16} />
              <Skeleton width="40%" height={12} />
            </View>
          </View>
          <Skeleton height={140} borderRadius={8} />
          <Skeleton lines={3} height={14} />
        </View>
      </Card>

      {/* Multiple lines */}
      <Card title="Khung chờ văn bản nhiều dòng (Lines)">
        <View style={{ marginTop: 8 }}>
          <Skeleton lines={4} height={16} />
        </View>
      </Card>
    </ScrollView>
  );
};

export default SkeletonScreen;
