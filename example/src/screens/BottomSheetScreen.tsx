import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { BottomSheet, Button, Card, Text } from 'react-native-luma-ui';

export const BottomSheetScreen = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [footerOpen, setFooterOpen] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Card title="Basic Bottom Sheet (Swipe down to dismiss)">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Displays sheet from the bottom screen edge with drag handle, swipe down to dismiss, and smooth backdrop animation.
        </Text>
        <Button
          label="Open Bottom Sheet"
          mode="elevated"
          onPress={() => setBasicOpen(true)}
        />
      </Card>

      <Card title="Bottom Sheet with Action Footer">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Bottom Sheet supports title, close button, scrollable content area, and pinned footer.
        </Text>
        <Button
          label="Open Sheet with Footer"
          mode="outlined"
          onPress={() => setFooterOpen(true)}
        />
      </Card>

      {/* Basic Bottom Sheet */}
      <BottomSheet
        visible={basicOpen}
        onClose={() => setBasicOpen(false)}
        title="Detailed Information"
      >
        <View style={{ gap: 12, paddingVertical: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>
            Luma UI Bottom Sheet
          </Text>
          <Text style={{ color: '#555555', lineHeight: 22 }}>
            This Bottom Sheet is built with pure React Native Animated and PanResponder. You can drag down on the handle, tap the backdrop, or click the close button.
          </Text>
          <Button
            label="Close Sheet"
            mode="outlined"
            onPress={() => setBasicOpen(false)}
            style={{ marginTop: 8 }}
          />
        </View>
      </BottomSheet>

      {/* Bottom Sheet with Footer */}
      <BottomSheet
        visible={footerOpen}
        onClose={() => setFooterOpen(false)}
        title="Configuration Options"
        renderFooter={() => (
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              justifyContent: 'flex-end',
              paddingBottom: 8,
            }}
          >
            <Button
              label="Cancel"
              mode="text"
              onPress={() => setFooterOpen(false)}
            />
            <Button
              label="Save Changes"
              mode="elevated"
              onPress={() => setFooterOpen(false)}
            />
          </View>
        )}
      >
        <View style={{ gap: 14, paddingVertical: 8 }}>
          <Text style={{ color: '#666666' }}>
            The content area inside Bottom Sheet can contain any component such as forms, choice lists, or confirmations.
          </Text>
          <View
            style={{
              padding: 14,
              backgroundColor: '#F3EDF7',
              borderRadius: 14,
              borderWidth: 1,
              borderColor: '#6750A430',
            }}
          >
            <Text style={{ color: '#6750A4', fontWeight: '600' }}>
              ✓ Integrated Safe Area Insets for both Android and iOS
            </Text>
          </View>
        </View>
      </BottomSheet>
    </ScrollView>
  );
};

export default BottomSheetScreen;
