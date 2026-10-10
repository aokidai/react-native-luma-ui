import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export const tabsStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colorSystem.gray[300],
    backgroundColor: colorSystem.background,
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    gap: 8,
  },
  tabScrollable: {
    flex: 0,
    minWidth: 100,
    width: 100,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colorSystem.gray[600],
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  labelActive: {
    fontWeight: '700',
    color: colorSystem.primary,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 0,
    height: 3,
  },
  indicator: {
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: colorSystem.primary,
  },
});
