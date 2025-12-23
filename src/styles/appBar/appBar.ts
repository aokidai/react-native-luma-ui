import { StyleSheet } from 'react-native';
import { height, size } from '../../utils/size';

export const appBarStyles = StyleSheet.create({
  appBar: {
    height: height.xl,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: size.lg,
    justifyContent: 'space-between',
    backgroundColor: 'yellow',
  },
  leader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.md,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.md,
  },
});
