import React, { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import {
  ActionGroup,
  Button,
  Card,
  HTMLReader,
  IconButton,
  NoContent,
  PermissionAlert,
  Section,
  Text,
} from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const LayoutScreen = () => {
  const [permissionVisible, setPermissionVisible] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Section Component */}
      <Card title="Section (Content Segment)">
        <Section
          title="Project Workgroup"
          action={<Button label="View more" mode="text" onPress={() => {}} />}
        >
          <Text style={{ color: '#757575' }}>
            Content inside Section provides flexible layout with clear header titles.
          </Text>
        </Section>
      </Card>

      {/* ActionGroup Component */}
      <Card title="ActionGroup (Pill Button Group)">
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <ActionGroup>
            <IconButton
              mode="text"
              icon={(size, color) => (
                <MaterialDesignIcons
                  name="format-bold"
                  size={size}
                  color={color}
                />
              )}
            />
            <IconButton
              mode="text"
              icon={(size, color) => (
                <MaterialDesignIcons
                  name="format-italic"
                  size={size}
                  color={color}
                />
              )}
            />
            <IconButton
              mode="text"
              icon={(size, color) => (
                <MaterialDesignIcons
                  name="format-underline"
                  size={size}
                  color={color}
                />
              )}
            />
          </ActionGroup>
        </View>
      </Card>

      {/* NoContent Component */}
      <Card title="NoContent (Empty State)">
        <NoContent
          title="No Data Available"
          description="Create your first item to get started."
          icon={
            <MaterialDesignIcons
              name="folder-open-outline"
              size={40}
              color="#6200EE"
            />
          }
          buttonText="Create New Item"
          onPressButton={() => Alert.alert('Notification', 'Create item tapped!')}
        />
      </Card>

      {/* HTMLReader Component */}
      <Card title="HTMLReader (Rich Text Viewer)">
        <HTMLReader html="<p>Welcome to <b>Luma UI</b>! The library provides modern <i>Luma UI</i> components. <br/>See more at <a href='https://github.com'>GitHub</a>.</p>" />
      </Card>

      {/* PermissionAlert Component */}
      <Card title="PermissionAlert (Permission Dialog)">
        <Button
          label="Open Camera Permission Alert"
          mode="outlined"
          onPress={() => setPermissionVisible(true)}
        />
      </Card>

      <PermissionAlert
        visible={permissionVisible}
        onClose={() => setPermissionVisible(false)}
        permissionName="Camera & Storage"
        description="Allow Luma UI to access camera for profile photo and QR scanning."
      />
    </ScrollView>
  );
};

export default LayoutScreen;
