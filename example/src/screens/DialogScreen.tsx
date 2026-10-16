import React, { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { BottomAlert, Button, Card, Dialog, Text } from 'react-native-luma-ui';

export const DialogScreen = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [bottomAlertVisible, setBottomAlertVisible] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Dialog */}
      <Card title="Luma UI Dialog Modal">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Centered pop-up dialog for notification or critical action confirmation.
        </Text>
        <Button
          label="Open Dialog"
          mode="elevated"
          onPress={() => setDialogVisible(true)}
        />
      </Card>

      {/* Bottom Alert / Sheet */}
      <Card title="Bottom Alert (Slide-up modal)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Displays notifications or action options via bottom-up sliding sheet.
        </Text>
        <Button
          label="Open Bottom Alert"
          mode="outlined"
          onPress={() => setBottomAlertVisible(true)}
        />
      </Card>

      {/* Dialog Component */}
      <Dialog
        visible={dialogVisible}
        onClose={() => setDialogVisible(false)}
        title="Confirm Account Deletion?"
        footer={
          <>
            <Button
              label="Cancel"
              mode="text"
              onPress={() => setDialogVisible(false)}
            />
            <Button
              label="Confirm"
              mode="elevated"
              labelColor="#ffffff"
              style={{ backgroundColor: '#B00020' }}
              onPress={() => {
                setDialogVisible(false);
                Alert.alert('Notification', 'Confirmed!');
              }}
            />
          </>
        }
      >
        <Text style={{ color: '#616161', lineHeight: 22 }}>
          This action cannot be undone. All information and historical data
          associated with this account will be permanently deleted from the system.
        </Text>
      </Dialog>

      {/* BottomAlert Component */}
      <BottomAlert
        visible={bottomAlertVisible}
        onClose={() => setBottomAlertVisible(false)}
      >
        <View style={{ paddingVertical: 12, gap: 12 }}>
          <Text theme="titleLarge">Action Options</Text>
          <Text style={{ color: '#757575' }}>
            Choose an action to proceed:
          </Text>
          <Button
            label="Share Document"
            mode="outlined"
            onPress={() => setBottomAlertVisible(false)}
          />
          <Button
            label="Dismiss"
            mode="text"
            onPress={() => setBottomAlertVisible(false)}
          />
        </View>
      </BottomAlert>
    </ScrollView>
  );
};

export default DialogScreen;
