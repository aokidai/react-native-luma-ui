import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, TextField } from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const TextFieldScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Outlined Mode */}
      <Card title="Outlined TextField (Luma UI)">
        <View style={{ gap: 12, marginTop: 8 }}>
          <TextField
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter full name..."
            helperText="Enter both first and last name"
            leadingIcon={
              <MaterialDesignIcons name="account" size={20} color="#757575" />
            }
          />

          <TextField
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            leadingIcon={
              <MaterialDesignIcons name="email" size={20} color="#757575" />
            }
            error={email.length > 0 && !email.includes('@')}
            errorText={
              email.length > 0 && !email.includes('@')
                ? 'Invalid email address'
                : undefined
            }
          />

          <TextField
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            leadingIcon={
              <MaterialDesignIcons name="lock" size={20} color="#757575" />
            }
            trailingIcon={
              <MaterialDesignIcons
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#757575"
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
        </View>
      </Card>

      {/* Filled Mode */}
      <Card title="Filled TextField (Luma UI)">
        <View style={{ gap: 12, marginTop: 8 }}>
          <TextField
            mode="filled"
            label="Phone Number"
            placeholder="0912 345 678"
            keyboardType="phone-pad"
            leadingIcon={
              <MaterialDesignIcons name="phone" size={20} color="#757575" />
            }
          />

          <TextField
            mode="filled"
            label="Notes"
            placeholder="Note content..."
            multiline
            numberOfLines={3}
          />

          <TextField
            mode="filled"
            label="Disabled (Disabled)"
            value="Cannot be edited"
            disabled
          />
        </View>
      </Card>
    </ScrollView>
  );
};

export default TextFieldScreen;
