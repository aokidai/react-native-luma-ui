import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-luma-ui';

export default function App() {
  return (
    <View style={styles.container}>
      <Button label="Click me" onPress={() => console.log('Button pressed!')} />
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
