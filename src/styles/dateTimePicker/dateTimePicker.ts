import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export const dateTimePickerStyles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: colorSystem.gray[50],
    borderWidth: 1,
    borderColor: colorSystem.gray[300],
  },
  triggerContent: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 12,
    color: colorSystem.gray[600],
    fontWeight: '500',
  },
  valueText: {
    fontSize: 15,
    color: colorSystem.onSurface,
    fontWeight: '500',
  },
  placeholderText: {
    fontSize: 15,
    color: colorSystem.gray[500],
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colorSystem.gray[100],
    borderRadius: 12,
    padding: 3,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: colorSystem.background,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colorSystem.gray[600],
  },
  tabButtonTextActive: {
    color: colorSystem.primary,
    fontWeight: '700',
  },
});
