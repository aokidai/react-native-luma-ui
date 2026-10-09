import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {appColors} from '../../../../../constants/appColors';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Card: React.FC<Props> = ({children, style}) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: appColors.white,
    borderRadius: 12,
    borderColor: appColors.threadGray,
    borderWidth: 1,
    padding: 8,
  },
});

export default Card;
