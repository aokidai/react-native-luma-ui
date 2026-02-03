import { StyleSheet } from 'react-native';
import { radius, size } from '../../utils/size';

export const badgesStyles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'flex-start',
  },

  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: size.sm,
    height: size.sm,
    paddingHorizontal: 4,
    borderRadius: size.sm / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeWithCount: {
    height: null,
    borderRadius: radius.ro,
    top: -6,
    right: -6,
    paddingHorizontal: 4,
  },
});
