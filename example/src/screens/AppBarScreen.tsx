import React from 'react';
import { ScrollView, View } from 'react-native';
import { AppBar, Card, IconButton } from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const AppBarScreen = () => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Card title="Top App Bar with Title & Actions">
        <View
          style={{
            borderRadius: 12,
            overflow: 'hidden',
            marginTop: 12,
            borderWidth: 1,
            borderColor: '#E0E0E0',
          }}
        >
          <AppBar
            title="Dashboard"
            subtitle="Updated 5 minutes ago"
            leader={
              <IconButton
                mode="text"
                icon={(size, color) => (
                  <MaterialDesignIcons
                    name="arrow-left"
                    size={size}
                    color={color}
                  />
                )}
                onPress={() => {}}
              />
            }
            actions={[
              <IconButton
                mode="text"
                icon={(size, color) => (
                  <MaterialDesignIcons
                    name="magnify"
                    size={size}
                    color={color}
                  />
                )}
                onPress={() => {}}
              />,
              <IconButton
                mode="text"
                icon={(size, color) => (
                  <MaterialDesignIcons
                    name="dots-vertical"
                    size={size}
                    color={color}
                  />
                )}
                onPress={() => {}}
              />,
            ]}
          />
        </View>
      </Card>

      <Card title="Centered Top App Bar (Center Title)">
        <View
          style={{
            borderRadius: 12,
            overflow: 'hidden',
            marginTop: 12,
            borderWidth: 1,
            borderColor: '#E0E0E0',
          }}
        >
          <AppBar
            title="System Settings"
            centerTitle
            showBack
            onBack={() => {}}
          />
        </View>
      </Card>

      <Card title="Top App Bar with Custom Background">
        <View style={{ borderRadius: 12, overflow: 'hidden', marginTop: 12 }}>
          <AppBar
            title="Vibrant Accent"
            backgroundColor="#6200EE"
            titleStyle={{ color: '#ffffff' }}
            subtitle="Luma UI Theme"
            subtitleStyle={{ color: '#E0E0E0' }}
            showBack
            onBack={() => {}}
          />
        </View>
      </Card>
    </ScrollView>
  );
};

export default AppBarScreen;
