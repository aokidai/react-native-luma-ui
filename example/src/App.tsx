import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        label="Click me"
        onPress={() => console.log('Button pressed!')}
        icon={<MaterialDesignIcons name="symbol" color="#ff0000" size={20} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
