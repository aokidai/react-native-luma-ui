import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';
import { radius } from '../../utils/size';

export const cardStyles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colorSystem.background,
    borderRadius: radius.lg,
  },
});
