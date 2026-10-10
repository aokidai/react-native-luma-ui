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
import DatePicker, { CalendarIcon } from '../datePicker/DatePicker';
import TimePicker, { ClockIcon } from '../timePicker/TimePicker';
import { dateTimePickerStyles } from '../../styles/dateTimePicker/dateTimePicker';
import { colorSystem } from '../../utils/colorSystem';

export interface DateTimePickerProps {
  value?: Date | string;
  onChange?: (date: Date) => void;
  onConfirm?: (date: Date) => void;
  mode?: 'date' | 'time' | 'datetime';
  minDate?: Date;
  maxDate?: Date;
  is24Hour?: boolean;
  format?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  modalTitle?: string;
  confirmText?: string;
  cancelText?: string;
  inline?: boolean;
  visible?: boolean;
  onClose?: () => void;
  style?: StyleProp<ViewStyle>;
  renderIcon?: () => ReactNode;
}

const parseDateOrTime = (val?: Date | string): Date => {
  if (!val) return new Date();
  if (val instanceof Date) return val;
  const d = new Date(val);
  return isNaN(d.getTime()) ? new Date() : d;
};

const formatDateTime = (
  date?: Date,
  mode: 'date' | 'time' | 'datetime' = 'datetime',
  is24Hour: boolean = true,
  customFormat?: string
): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (customFormat) {
    return customFormat
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', String(hours).padStart(2, '0'))
      .replace('mm', minutes);
  }

  if (mode === 'date') {
    return `${day}/${month}/${year}`;
  }

  if (mode === 'time') {
    if (is24Hour) {
      return `${String(hours).padStart(2, '0')}:${minutes}`;
    }
    const period = hours >= 12 ? 'PM' : 'AM';
    const h12 = hours % 12 || 12;
    return `${String(h12).padStart(2, '0')}:${minutes} ${period}`;
  }

  // mode === 'datetime'
  const timePart = is24Hour
    ? `${String(hours).padStart(2, '0')}:${minutes}`
    : `${String(hours % 12 || 12).padStart(2, '0')}:${minutes} ${
        hours >= 12 ? 'PM' : 'AM'
      }`;
  return `${day}/${month}/${year} ${timePart}`;
};

const CalendarClockIcon: FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = colorSystem.gray[500],
}) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: 4,
      borderWidth: 1.8,
      borderColor: color,
      paddingTop: size * 0.25,
      alignItems: 'center',
    }}
  >
    {/* Binder ring */}
    <View
      style={{
        position: 'absolute',
        top: -3,
        left: size * 0.2,
        width: 2.2,
        height: 4.5,
        backgroundColor: color,
        borderRadius: 1,
      }}
    />
    <View
      style={{
        position: 'absolute',
        top: -3,
        right: size * 0.2,
        width: 2.2,
        height: 4.5,
        backgroundColor: color,
        borderRadius: 1,
      }}
    />
    {/* Divider */}
    <View
      style={{
        width: '100%',
        height: 1.5,
        backgroundColor: color,
        marginBottom: 2,
      }}
    />
    {/* Clock circle in corner */}
    <View
      style={{
        width: size * 0.45,
        height: size * 0.45,
        borderRadius: size * 0.225,
        borderWidth: 1.2,
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 1,
          height: size * 0.15,
          backgroundColor: color,
        }}
      />
    </View>
  </View>
);

const DateTimePicker: FC<DateTimePickerProps> = (props) => {
  const {
    value,
    onChange,
    onConfirm,
    mode = 'datetime',
    minDate,
    maxDate,
    is24Hour = true,
    format,
    label,
    placeholder = 'Chọn ngày giờ',
    disabled = false,
    modalTitle = 'Chọn Ngày & Giờ',
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    inline = false,
    visible: controlledVisible,
    onClose,
    style,
    renderIcon,
  } = props;

  // State & hooks called unconditionally
  const [internalVisible, setInternalVisible] = useState(false);
  const isModalOpen =
    controlledVisible !== undefined ? controlledVisible : internalVisible;

  const initialDate = useMemo(() => parseDateOrTime(value), [value]);
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [activeTab, setActiveTab] = useState<'date' | 'time'>('date');

  useEffect(() => {
    setCurrentDate(parseDateOrTime(value));
  }, [value]);

  if (mode === 'date') {
    return (
      <DatePicker
        value={value}
        onChange={onChange}
        onConfirm={onConfirm}
        minDate={minDate}
        maxDate={maxDate}
        format={format}
        label={label}
        placeholder={placeholder || 'Chọn ngày'}
        disabled={disabled}
        modalTitle={modalTitle}
        confirmText={confirmText}
        cancelText={cancelText}
        inline={inline}
        visible={controlledVisible}
        onClose={onClose}
        style={style}
      />
    );
  }

  if (mode === 'time') {
    return (
      <TimePicker
        value={value}
        onChange={onChange}
        onConfirm={onConfirm}
        is24Hour={is24Hour}
        format={format}
        label={label}
        placeholder={placeholder || 'Chọn giờ'}
        disabled={disabled}
        modalTitle={modalTitle}
        confirmText={confirmText}
        cancelText={cancelText}
        inline={inline}
        visible={controlledVisible}
        onClose={onClose}
        style={style}
      />
    );
  }

  const handleDateChange = (newDate: Date) => {
    const updated = new Date(currentDate);
    updated.setFullYear(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate()
    );
    setCurrentDate(updated);
    if (onChange) onChange(updated);
  };

  const handleTimeChange = (newTime: Date) => {
    const updated = new Date(currentDate);
    updated.setHours(
      newTime.getHours(),
      newTime.getMinutes(),
      newTime.getSeconds()
    );
    setCurrentDate(updated);
    if (onChange) onChange(updated);
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm(currentDate);
    if (onChange) onChange(currentDate);
    if (onClose) onClose();
    setInternalVisible(false);
  };

  const handleCancel = () => {
    setCurrentDate(initialDate);
    if (onClose) onClose();
    setInternalVisible(false);
  };

  const dateStr = formatDateTime(currentDate, 'date');
  const timeStr = formatDateTime(currentDate, 'time', is24Hour);
  const displayValue = value
    ? formatDateTime(currentDate, 'datetime', is24Hour, format)
    : '';

  const renderBody = () => (
    <View>
      {/* Segmented Mode Tabs */}
      <View style={dateTimePickerStyles.tabsContainer}>
        <TouchableOpacity
          style={[
            dateTimePickerStyles.tabButton,
            activeTab === 'date' && dateTimePickerStyles.tabButtonActive,
          ]}
          onPress={() => setActiveTab('date')}
          activeOpacity={0.7}
        >
          <CalendarIcon
            size={16}
            color={
              activeTab === 'date' ? colorSystem.primary : colorSystem.gray[600]
            }
          />
          <Text
            style={[
              dateTimePickerStyles.tabButtonText,
              activeTab === 'date' && dateTimePickerStyles.tabButtonTextActive,
            ]}
          >
            {`Ngày: ${dateStr}`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            dateTimePickerStyles.tabButton,
            activeTab === 'time' && dateTimePickerStyles.tabButtonActive,
          ]}
          onPress={() => setActiveTab('time')}
          activeOpacity={0.7}
        >
          <ClockIcon
            size={16}
            color={
              activeTab === 'time' ? colorSystem.primary : colorSystem.gray[600]
            }
          />
          <Text
            style={[
              dateTimePickerStyles.tabButtonText,
              activeTab === 'time' && dateTimePickerStyles.tabButtonTextActive,
            ]}
          >
            {`Giờ: ${timeStr}`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Active Tab Component */}
      {activeTab === 'date' ? (
        <DatePicker
          inline
          value={currentDate}
          onChange={handleDateChange}
          onConfirm={handleConfirm}
          minDate={minDate}
          maxDate={maxDate}
          confirmText={confirmText}
          cancelText={cancelText}
        />
      ) : (
        <TimePicker
          inline
          value={currentDate}
          onChange={handleTimeChange}
          onConfirm={handleConfirm}
          is24Hour={is24Hour}
          confirmText={confirmText}
          cancelText={cancelText}
        />
      )}
    </View>
  );

  if (inline) {
    return <View style={style}>{renderBody()}</View>;
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => !disabled && setInternalVisible(true)}
        disabled={disabled}
        activeOpacity={0.7}
        style={[
          dateTimePickerStyles.trigger,
          disabled && { opacity: 0.6 },
          style,
        ]}
      >
        <View style={dateTimePickerStyles.triggerContent}>
          {label ? (
            <Text style={dateTimePickerStyles.label}>{label}</Text>
          ) : null}
          {displayValue ? (
            <Text style={dateTimePickerStyles.valueText} numberOfLines={1}>
              {displayValue}
            </Text>
          ) : (
            <Text
              style={dateTimePickerStyles.placeholderText}
              numberOfLines={1}
            >
              {placeholder}
            </Text>
          )}
        </View>
        {renderIcon ? (
          renderIcon()
        ) : (
          <CalendarClockIcon size={20} color={colorSystem.gray[500]} />
        )}
      </TouchableOpacity>

      <BottomSheet
        visible={isModalOpen}
        onClose={handleCancel}
        title={modalTitle}
      >
        {renderBody()}
      </BottomSheet>
    </>
  );
};

export default DateTimePicker;
