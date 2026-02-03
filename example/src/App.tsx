import { View } from 'react-native';
import {
  AppBar,
  Button,
  Card,
  FAB,
  IconButton,
  Scaffold,
  Text,
} from 'react-native-luma-ui';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import Badges from '../../src/components/badges/Badges';

export default function App() {
  return (
    <Scaffold
      appBar={
        <AppBar
          title="Luma UI"
          leader={
            <IconButton
              icon={(size, color) => (
                <MaterialDesignIcons name="menu" size={size} color={color} />
              )}
            />
          }
          actions={[
            <IconButton
              icon={(size, color) => (
                <MaterialDesignIcons name="menu" size={size} color={color} />
              )}
              mode="outlined"
            />,
            <IconButton
              icon={(size, color) => (
                <MaterialDesignIcons name="menu" size={size} color={color} />
              )}
              mode="text"
            />,
          ]}
        />
      }
      floatingActionButton={
        <FAB
          icon={<MaterialDesignIcons name="menu" size={24} color={'red'} />}
        />
      }
    >
      <View>
        <Badges visible>
          <IconButton
            icon={(size, color) => (
              <MaterialDesignIcons name="menu" size={size} color={color} />
            )}
            mode="text"
          />
        </Badges>
        <Badges visible count={0}>
          <IconButton
            icon={(size, color) => (
              <MaterialDesignIcons name="menu" size={size} color={color} />
            )}
            mode="text"
          />
        </Badges>
        <Badges visible count={1}>
          <IconButton
            icon={(size, color) => (
              <MaterialDesignIcons name="menu" size={size} color={color} />
            )}
            mode="text"
          />
        </Badges>
        <Badges visible count={1000}>
          <IconButton
            icon={(size, color) => (
              <MaterialDesignIcons name="menu" size={size} color={color} />
            )}
            mode="text"
          />
        </Badges>
      </View>
      <View>
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
      <View style={{ padding: 16 }}>
        <Card>
          <Text theme="headlineMedium">This is a card</Text>
        </Card>
      </View>
    </Scaffold>
  );
}
