import React from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Button, Card, Text } from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const CardScreen = () => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Basic Card */}
      <Card title="Basic Card">
        <Text style={{ color: '#757575', marginTop: 4 }}>
          Simple card wrapping child elements with border radius and surface colors from Design Tokens.
        </Text>
      </Card>

      {/* Rich Card with Accent Left Line */}
      <Card
        title="Project Alpha"
        content="Finalize system architecture documentation and UI integration"
        subContent="Deadline: 15/10/2026"
        priority="High Priority"
        priorityColor="#B00020"
        status="In Progress"
        statusColor="#C16C07"
        leftLine="#6200EE"
        time="Today, 14:00"
        footer={<Button label="Details" mode="text" onPress={() => {}} />}
      />

      {/* Clickable Card */}
      <Card
        title="Interactive Card (Clickable)"
        subContent="Tap this card to trigger the onPress event"
        onPress={() => Alert.alert('Notification', 'Card tapped!')}
        borderColor="#6200EE"
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginTop: 8,
          }}
        >
          <MaterialDesignIcons name="gesture-tap" size={20} color="#6200EE" />
          <Text style={{ color: '#6200EE', fontWeight: '600' }}>
            Tap here
          </Text>
        </View>
      </Card>
    </ScrollView>
  );
};

export default CardScreen;
