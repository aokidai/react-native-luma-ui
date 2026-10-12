import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export const progressBarStyles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: colorSystem.gray[200],
  },
  indicator: {
    height: '100%',
    backgroundColor: colorSystem.primary,
  },
});
