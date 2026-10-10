import React from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Text } from 'react-native-luma-ui';

export const TextScreen = () => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Display Styles */}
      <Card title="Display Styles (Material 3)">
        <View style={{ gap: 6 }}>
          <Text theme="displayLarge">Display Large</Text>
          <Text theme="displayMedium">Display Medium</Text>
          <Text theme="displaySmall">Display Small</Text>
        </View>
      </Card>

      {/* Headline Styles */}
      <Card title="Headline Styles">
        <View style={{ gap: 6 }}>
          <Text theme="headlineLarge">Headline Large</Text>
          <Text theme="headlineMedium">Headline Medium</Text>
          <Text theme="headlineSmall">Headline Small</Text>
        </View>
      </Card>

      {/* Title Styles */}
      <Card title="Title Styles">
        <View style={{ gap: 6 }}>
          <Text theme="titleLarge">Title Large</Text>
          <Text theme="titleMedium">Title Medium</Text>
          <Text theme="titleSmall">Title Small</Text>
        </View>
      </Card>

      {/* Body & Label Styles */}
      <Card title="Body & Label Styles">
        <View style={{ gap: 6 }}>
          <Text theme="bodyLarge">
            Body Large: Đoạn văn bản nội dung thông thường
          </Text>
          <Text theme="bodyMedium">
            Body Medium: Đoạn văn bản kích cỡ trung bình
          </Text>
          <Text theme="bodySmall">
            Body Small: Đoạn văn bản phụ kích cỡ nhỏ
          </Text>
          <Text theme="labelLarge" color="#6200EE">
            Label Large: Nhãn nút hoặc tag
          </Text>
          <Text theme="labelMedium" color="#018786">
            Label Medium
          </Text>
        </View>
      </Card>
    </ScrollView>
  );
};

export default TextScreen;
