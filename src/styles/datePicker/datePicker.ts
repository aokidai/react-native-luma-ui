import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export const datePickerStyles = StyleSheet.create({
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
  calendarContainer: {
    paddingVertical: 8,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  monthTitleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  monthTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: colorSystem.onSurface,
  },
  navArrowButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colorSystem.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekDayText: {
    width: 38,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    color: colorSystem.gray[500],
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  dayCell: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
    borderRadius: 19,
  },
  dayCellSelected: {
    backgroundColor: colorSystem.primary,
  },
  dayCellToday: {
    borderWidth: 1.5,
    borderColor: colorSystem.primary,
  },
  dayCellDisabled: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: colorSystem.onSurface,
  },
  dayTextSelected: {
    color: '#ffffff',
    fontWeight: '700',
  },
  dayTextToday: {
    color: colorSystem.primary,
    fontWeight: '700',
  },
  footerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
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
