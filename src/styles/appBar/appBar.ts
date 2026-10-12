import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';
import { height, size } from '../../utils/size';

export const appBarStyles = StyleSheet.create({
  appBar: {
    minHeight: height.xl,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: size.lg,
    justifyContent: 'space-between',
    backgroundColor: colorSystem.background,
  },
  leader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.md,
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.md,
  },
});
