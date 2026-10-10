import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export const avatarStyles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: colorSystem.primary,
  },
  initials: {
    color: colorSystem.onPrimary,
    fontWeight: '600',
  },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreBadge: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorSystem.gray[700],
    borderWidth: 1.5,
    borderColor: colorSystem.background,
  },
  moreText: {
    color: colorSystem.onPrimary,
    fontWeight: '700',
  },
});
