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
            Snackbar provides brief messages at the bottom of the screen and
            auto-dismisses after a timeout.
          </Text>
          <View style={{ gap: 10 }}>
            <Button
              label="Show Basic Snackbar"
              mode="elevated"
              onPress={() => setVisible1(true)}
            />
            <Button
              label="Snackbar with Action Button"
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
        Data saved successfully!
      </Snackbar>

      {/* Snackbar 2 */}
      <Snackbar
        visible={visible2}
        onDismiss={() => setVisible2(false)}
        duration={4000}
        action={{
          label: 'UNDO',
          onPress: () => Alert.alert('Notification', 'Action undone!'),
          color: '#03DAC6',
        }}
      >
        Item moved to trash.
      </Snackbar>
    </View>
  );
};

export default SnackbarScreen;
