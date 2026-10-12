import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export const switchStyles = StyleSheet.create({
  track: {
    width: 52,
    height: 32,
    borderRadius: 16,
    padding: 4,
    justifyContent: 'center',
    borderWidth: 2,
  },
  trackUnchecked: {
    backgroundColor: colorSystem.gray[200],
    borderColor: colorSystem.gray[500],
  },
  trackChecked: {
    backgroundColor: colorSystem.primary,
    borderColor: colorSystem.primary,
  },
  trackDisabled: {
    opacity: 0.38,
  },
  thumb: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbUnchecked: {
    width: 16,
    height: 16,
    backgroundColor: colorSystem.gray[600],
  },
  thumbChecked: {
    width: 24,
    height: 24,
    backgroundColor: colorSystem.onPrimary,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemContent: {
    flex: 1,
    marginRight: 16,
  },
  label: {
    fontSize: 16,
    color: colorSystem.onSurface,
  },
  description: {
    fontSize: 13,
    color: colorSystem.gray[600],
    marginTop: 2,
  },
});
