import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export const skeletonStyles = StyleSheet.create({
  skeleton: {
    backgroundColor: colorSystem.gray[200],
    overflow: 'hidden',
  },
  linesContainer: {
    width: '100%',
    gap: 8,
  },
});
