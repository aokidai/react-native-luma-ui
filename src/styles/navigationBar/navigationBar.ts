import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export const navigationBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colorSystem.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colorSystem.gray[300],
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 12,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    gap: 4,
  },
  indicator: {
    width: 64,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  indicatorActive: {
    backgroundColor: `${colorSystem.primary}25`,
    borderRadius: 16,
    overflow: 'hidden',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: colorSystem.gray[600],
  },
  labelActive: {
    fontWeight: '700',
    color: colorSystem.primary,
  },
  badgeWrapper: {
    position: 'relative',
  },
});
