import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, FAB, IconButton, Text } from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const ButtonScreen = () => {
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Button Modes */}
      <Card title="Button Modes (Luma UI)">
        <View style={{ gap: 10, marginTop: 8 }}>
          <Button label="Elevated Button" mode="elevated" onPress={() => {}} />
          <Button label="Outlined Button" mode="outlined" onPress={() => {}} />
          <Button label="Text Button" mode="text" onPress={() => {}} />
          <Button
            label="Disabled Button"
            mode="elevated"
            disabled
            onPress={() => {}}
          />
        </View>
      </Card>

      {/* Button with Icons & Loading */}
      <Card title="Buttons với Icon & Loading">
        <View style={{ gap: 10, marginTop: 8 }}>
          <Button
            label="Icon bên trái"
            icon={(size, color) => (
              <MaterialDesignIcons name="heart" size={size} color={color} />
            )}
            onPress={() => {}}
          />
          <Button
            label="Icon bên phải"
            iconPosition="right"
            icon={(size, color) => (
              <MaterialDesignIcons
                name="arrow-right"
                size={size}
                color={color}
              />
            )}
            onPress={() => {}}
          />
          <Button
            label={loading ? 'Đang xử lý...' : 'Bấm để thử Loading'}
            loading={loading}
            onPress={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 2000);
            }}
          />
        </View>
      </Card>

      {/* Icon Buttons */}
      <Card title="Icon Buttons">
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
            marginTop: 8,
          }}
        >
          <IconButton
            mode="elevated"
            icon={(size, color) => (
              <MaterialDesignIcons name="camera" size={size} color={color} />
            )}
            onPress={() => {}}
          />
          <IconButton
            mode="outlined"
            icon={(size, color) => (
              <MaterialDesignIcons name="star" size={size} color={color} />
            )}
            onPress={() => {}}
          />
          <IconButton
            mode="text"
            icon={(size, color) => (
              <MaterialDesignIcons name="share" size={size} color={color} />
            )}
            onPress={() => {}}
          />
          <IconButton
            label="Tải về"
            mode="outlined"
            icon={(size, color) => (
              <MaterialDesignIcons name="download" size={size} color={color} />
            )}
            onPress={() => {}}
          />
        </View>
      </Card>

      {/* Floating Action Button */}
      <Card title="Floating Action Button (FAB)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          FAB thường được cố định ở góc dưới cùng màn hình:
        </Text>
        <View style={{ height: 80, position: 'relative' }}>
          <FAB
            icon={<MaterialDesignIcons name="plus" size={24} color="#ffffff" />}
            onPress={() => {}}
          />
        </View>
      </Card>
    </ScrollView>
  );
};

export default ButtonScreen;
