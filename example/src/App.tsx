import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        label="Click me"
        onPress={() => console.log('Button pressed!')}
        icon={<MaterialDesignIcons name="symbol" color="#ff0000" size={20} />}
        mode="elevated"
      />
      <Button
        label="Click me"
        onPress={() => console.log('Button pressed!')}
        icon={<MaterialDesignIcons name="symbol" color="#ff0000" size={20} />}
        mode="outlined"
      />
      <Button
        label="Click me"
        onPress={() => console.log('Button pressed!')}
        mode="text"
      />
      <Button
        label="Click me"
        onPress={() => console.log('Button pressed!')}
        icon={<MaterialDesignIcons name="symbol" color="#ff0000" size={20} />}
        iconPosition="right"
        mode="elevated"
      />
      <Button
        onPress={() => console.log('Button pressed!')}
        icon={<MaterialDesignIcons name="symbol" color="#ff0000" size={20} />}
        iconPosition="right"
        mode="elevated"
      >
        <Text color="green">Text components</Text>
      </Button>
      <Button
        label="Click me"
        onPress={() => console.log('Button pressed!')}
        icon={<MaterialDesignIcons name="symbol" color="#ff0000" size={20} />}
        mode="elevated"
        disabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
