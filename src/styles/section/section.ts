import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';
import { size } from '../../utils/size';

export const sectionStyles = StyleSheet.create({
  container: {
    gap: size.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colorSystem.gray[900],
  },
});
