import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export const pickerStyles = StyleSheet.create({
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalSheet: {
    backgroundColor: colorSystem.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingBottom: 24,
    maxHeight: '80%',
    minHeight: 300,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colorSystem.onSurface,
  },
  searchBox: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  itemList: {
    paddingHorizontal: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colorSystem.gray[200],
  },
  itemText: {
    fontSize: 15,
    color: colorSystem.onSurface,
  },
  itemTextSelected: {
    fontWeight: '700',
    color: colorSystem.primary,
  },
});
