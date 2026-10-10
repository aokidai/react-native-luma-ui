import React, {
  type FC,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  type StyleProp,
  Text,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import BottomSheet from '../bottomSheet/BottomSheet';
import { datePickerStyles } from '../../styles/datePicker/datePicker';
import { colorSystem } from '../../utils/colorSystem';

export interface DatePickerProps {
  value?: Date | string;
  onChange?: (date: Date) => void;
  onConfirm?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  format?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  modalTitle?: string;
  confirmText?: string;
  cancelText?: string;
  showTodayButton?: boolean;
  inline?: boolean;
  visible?: boolean;
  onClose?: () => void;
  style?: StyleProp<ViewStyle>;
  renderCalendarIcon?: () => ReactNode;
}

const WEEK_DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

const formatDate = (date?: Date, formatStr: string = 'DD/MM/YYYY'): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());

  return formatStr
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', year);
};

const parseDate = (val?: Date | string): Date => {
  if (!val) return new Date();
  if (val instanceof Date) return val;
  const d = new Date(val);
  return isNaN(d.getTime()) ? new Date() : d;
};

export const CalendarIcon: FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = colorSystem.gray[500],
}) => {
  const borderWidth = Math.max(1.4, Math.round(size * 0.08 * 10) / 10);
  const ringWidth = Math.max(1.8, Math.round(size * 0.1 * 10) / 10);
  const ringHeight = Math.max(3.5, Math.round(size * 0.22 * 10) / 10);
  const ringOffset = -Math.max(2, Math.round(size * 0.12 * 10) / 10);
  const dividerHeight = Math.max(1.2, Math.round(size * 0.075 * 10) / 10);
  const dotSize = Math.max(1.8, Math.round(size * 0.1 * 10) / 10);

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: Math.max(3, Math.round(size * 0.2)),
        borderWidth,
        borderColor: color,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {/* Top binder rings */}
      <View
        style={{
          position: 'absolute',
          top: ringOffset,
          left: size * 0.18,
          width: ringWidth,
          height: ringHeight,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: ringOffset,
          right: size * 0.18,
          width: ringWidth,
          height: ringHeight,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
      {/* Horizontal divider */}
      <View
        style={{
          width: '100%',
          height: dividerHeight,
          backgroundColor: color,
          marginTop: size * 0.24,
          marginBottom: Math.max(1.5, size * 0.09),
        }}
      />
      {/* Grid dots */}
      <View style={{ flexDirection: 'row', gap: Math.max(1.5, size * 0.1) }}>
        <View
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: color,
          }}
        />
        <View
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: color,
          }}
        />
        <View
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: color,
          }}
        />
      </View>
    </View>
  );
};

const NavArrow: FC<{ direction: 'left' | 'right'; size?: number }> = ({
  direction,
  size = 14,
}) => (
  <View
    style={{
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        width: size * 0.55,
        height: size * 0.55,
        borderLeftWidth: direction === 'left' ? 2 : 0,
        borderBottomWidth: direction === 'left' ? 2 : 0,
        borderRightWidth: direction === 'right' ? 2 : 0,
        borderTopWidth: direction === 'right' ? 2 : 0,
        borderColor: colorSystem.gray[700],
        transform: [{ rotate: '45deg' }],
      }}
    />
  </View>
);

const DatePicker: FC<DatePickerProps> = (props) => {
  const {
    value,
    onChange,
    onConfirm,
    minDate,
    maxDate,
    format = 'DD/MM/YYYY',
    label,
    placeholder = 'Chọn ngày',
    disabled = false,
    modalTitle = 'Chọn ngày',
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    showTodayButton = true,
    inline = false,
    visible: controlledVisible,
    onClose,
    style,
    renderCalendarIcon,
  } = props;

  const [internalVisible, setInternalVisible] = useState(false);
  const isModalOpen =
    controlledVisible !== undefined ? controlledVisible : internalVisible;

  const initialDate = useMemo(() => parseDate(value), [value]);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [viewYear, setViewYear] = useState<number>(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(initialDate.getMonth());

  useEffect(() => {
    const d = parseDate(value);
    setSelectedDate(d);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }, [value]);

  const daysInMonth = useMemo(() => {
    return new Date(viewYear, viewMonth + 1, 0).getDate();
  }, [viewYear, viewMonth]);

  const firstDayOfWeek = useMemo(() => {
    const day = new Date(viewYear, viewMonth, 1).getDay();
    // Monday as first day (0 = Mon, 6 = Sun)
    return (day + 6) % 7;
  }, [viewYear, viewMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const newDate = new Date(
      viewYear,
      viewMonth,
      day,
      selectedDate.getHours(),
      selectedDate.getMinutes()
    );
    setSelectedDate(newDate);
    if (onChange) onChange(newDate);
  };

  const isSelected = (day: number) => {
    return (
      selectedDate.getFullYear() === viewYear &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getDate() === day
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
    );
  };

  const isDayDisabled = (day: number) => {
    const dateToCheck = new Date(viewYear, viewMonth, day);
    if (
      minDate &&
      dateToCheck <
        new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
    ) {
      return true;
    }
    if (
      maxDate &&
      dateToCheck >
        new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())
    ) {
      return true;
    }
    return false;
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm(selectedDate);
    if (onChange) onChange(selectedDate);
    if (onClose) onClose();
    setInternalVisible(false);
  };

  const handleCancel = () => {
    setSelectedDate(initialDate);
    if (onClose) onClose();
    setInternalVisible(false);
  };

  const handleSelectToday = () => {
    const now = new Date();
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
    setSelectedDate(now);
    if (onChange) onChange(now);
  };

  const monthTitle = `Tháng ${viewMonth + 1}, ${viewYear}`;

  const renderCalendarBody = () => (
    <View style={datePickerStyles.calendarContainer}>
      {/* Month & Year Navigation Header */}
      <View style={datePickerStyles.monthHeader}>
        <TouchableOpacity
          onPress={prevMonth}
          style={datePickerStyles.navArrowButton}
          activeOpacity={0.7}
        >
          <NavArrow direction="left" />
        </TouchableOpacity>

        <View style={datePickerStyles.monthTitleButton}>
          <Text style={datePickerStyles.monthTitleText}>{monthTitle}</Text>
        </View>

        <TouchableOpacity
          onPress={nextMonth}
          style={datePickerStyles.navArrowButton}
          activeOpacity={0.7}
        >
          <NavArrow direction="right" />
        </TouchableOpacity>
      </View>

      {/* Week days labels */}
      <View style={datePickerStyles.weekDaysRow}>
        {WEEK_DAYS.map((wd, idx) => (
          <Text key={idx} style={datePickerStyles.weekDayText}>
            {wd}
          </Text>
        ))}
      </View>

      {/* Days grid */}
      <View style={datePickerStyles.daysGrid}>
        {/* Leading empty slots */}
        {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
          <View key={`empty-${idx}`} style={datePickerStyles.dayCell} />
        ))}

        {/* Days of the month */}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          const selected = isSelected(day);
          const today = isToday(day);
          const disabledDay = isDayDisabled(day);

          return (
            <TouchableOpacity
              key={`day-${day}`}
              style={[
                datePickerStyles.dayCell,
                today && !selected && datePickerStyles.dayCellToday,
                selected && datePickerStyles.dayCellSelected,
                disabledDay && datePickerStyles.dayCellDisabled,
              ]}
              onPress={() => !disabledDay && handleSelectDay(day)}
              disabled={disabledDay}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  datePickerStyles.dayText,
                  today && !selected && datePickerStyles.dayTextToday,
                  selected && datePickerStyles.dayTextSelected,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Action buttons */}
      <View style={datePickerStyles.footerActions}>
        {showTodayButton && (
          <TouchableOpacity
            style={[datePickerStyles.actionButton, { marginRight: 'auto' }]}
            onPress={handleSelectToday}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: colorSystem.primary,
              }}
            >
              Hôm nay
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={datePickerStyles.actionButton}
          onPress={handleCancel}
        >
          <Text style={datePickerStyles.cancelButtonText}>{cancelText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={datePickerStyles.actionButton}
          onPress={handleConfirm}
        >
          <Text style={datePickerStyles.confirmButtonText}>{confirmText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (inline) {
    return <View style={style}>{renderCalendarBody()}</View>;
  }

  const displayValue = value ? formatDate(selectedDate, format) : '';

  return (
    <>
      <TouchableOpacity
        onPress={() => !disabled && setInternalVisible(true)}
        disabled={disabled}
        activeOpacity={0.7}
        style={[datePickerStyles.trigger, disabled && { opacity: 0.6 }, style]}
      >
        <View style={datePickerStyles.triggerContent}>
          {label ? <Text style={datePickerStyles.label}>{label}</Text> : null}
          {displayValue ? (
            <Text style={datePickerStyles.valueText} numberOfLines={1}>
              {displayValue}
            </Text>
          ) : (
            <Text style={datePickerStyles.placeholderText} numberOfLines={1}>
              {placeholder}
            </Text>
          )}
        </View>
        {renderCalendarIcon ? (
          renderCalendarIcon()
        ) : (
          <CalendarIcon size={20} color={colorSystem.gray[500]} />
        )}
      </TouchableOpacity>

      <BottomSheet
        visible={isModalOpen}
        onClose={handleCancel}
        title={modalTitle}
      >
        {renderCalendarBody()}
      </BottomSheet>
    </>
  );
};

export default DatePicker;
