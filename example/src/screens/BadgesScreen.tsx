import React from 'react';
import { ScrollView, View } from 'react-native';
import { Badges, Card, IconButton } from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const BadgesScreen = () => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Card title="Badges Số lượng (Count Badges)">
        <View
          style={{
            flexDirection: 'row',
            gap: 24,
            marginTop: 16,
            alignItems: 'center',
          }}
        >
          <Badges count={3}>
            <IconButton
              mode="outlined"
              icon={(size, color) => (
                <MaterialDesignIcons name="bell" size={size} color={color} />
              )}
            />
          </Badges>

          <Badges count={42} color="#018786">
            <IconButton
              mode="outlined"
              icon={(size, color) => (
                <MaterialDesignIcons name="email" size={size} color={color} />
              )}
            />
          </Badges>

          <Badges count={150}>
            <IconButton
              mode="outlined"
              icon={(size, color) => (
                <MaterialDesignIcons name="chat" size={size} color={color} />
              )}
            />
          </Badges>
        </View>
      </Card>

      <Card title="Badges Chấm đỏ (Small Dot Badge)">
        <View
          style={{
            flexDirection: 'row',
            gap: 24,
            marginTop: 16,
            alignItems: 'center',
          }}
        >
          <Badges dot>
            <IconButton
              mode="elevated"
              icon={(size, color) => (
                <MaterialDesignIcons name="bell" size={size} color={color} />
              )}
            />
          </Badges>

          <Badges dot color="#03DAC6">
            <IconButton
              mode="elevated"
              icon={(size, color) => (
                <MaterialDesignIcons name="cog" size={size} color={color} />
              )}
            />
          </Badges>
        </View>
      </Card>
    </ScrollView>
  );
};

export default BadgesScreen;
