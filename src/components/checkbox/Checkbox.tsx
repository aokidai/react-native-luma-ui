import React from 'react';
import { View } from 'react-native';
import Text from '../text/Text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Checkbox = () => {
  return (
    <View>
      <MaterialCommunityIcons name="checkbox-marked" size={24} color="black" />
      <Text>Checkbox Component</Text>
    </View>
  );
};

export default Checkbox;
