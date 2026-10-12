import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export const timePickerStyles = StyleSheet.create({
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
  timeDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  timeBox: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: colorSystem.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 72,
  },
  timeBoxActive: {
    backgroundColor: `${colorSystem.primary}15`,
    borderWidth: 1.5,
    borderColor: colorSystem.primary,
  },
  timeDigits: {
    fontSize: 34,
    fontWeight: '700',
    color: colorSystem.gray[700],
  },
  timeDigitsActive: {
    color: colorSystem.primary,
  },
  timeSeparator: {
    fontSize: 30,
    fontWeight: '700',
    color: colorSystem.gray[500],
    marginHorizontal: 4,
  },
  ampmContainer: {
    flexDirection: 'column',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colorSystem.gray[300],
    overflow: 'hidden',
    marginLeft: 8,
  },
  ampmButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  ampmButtonActive: {
    backgroundColor: colorSystem.primary,
  },
  ampmText: {
    fontSize: 13,
    fontWeight: '700',
    color: colorSystem.gray[600],
  },
  ampmTextActive: {
    color: '#ffffff',
  },
  gridContainer: {
    maxHeight: 220,
    paddingVertical: 8,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 8,
  },
  gridItem: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorSystem.gray[100],
  },
  gridItemActive: {
    backgroundColor: colorSystem.primary,
  },
  gridItemText: {
    fontSize: 15,
    fontWeight: '600',
    color: colorSystem.onSurface,
  },
  gridItemTextActive: {
    color: '#ffffff',
  },
  quickChipsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 12,
  },
  quickChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: colorSystem.gray[100],
  },
  quickChipActive: {
    backgroundColor: colorSystem.primary,
  },
  quickChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colorSystem.gray[700],
  },
  quickChipTextActive: {
    color: '#ffffff',
  },
  footerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colorSystem.gray[200],
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colorSystem.gray[600],
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colorSystem.primary,
  },
});
