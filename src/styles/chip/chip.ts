import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';
import { radius } from '../../utils/size';

export const chipStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    paddingHorizontal: 12,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colorSystem.gray[400],
    backgroundColor: colorSystem.background,
    alignSelf: 'flex-start',
    gap: 8,
  },
  elevated: {
    borderWidth: 0,
    backgroundColor: colorSystem.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  selected: {
    backgroundColor: `${colorSystem.primary}20`,
    borderColor: colorSystem.primary,
  },
  selectedElevated: {
    backgroundColor: `${colorSystem.primary}30`,
  },
  disabled: {
    opacity: 0.38,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colorSystem.onSurface,
  },
  labelSelected: {
    color: colorSystem.primary,
    fontWeight: '600',
  },
  closeButton: {
    marginLeft: 2,
    padding: 2,
  },
});
