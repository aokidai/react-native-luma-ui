import React, {
  type FC,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ScrollView,
  type StyleProp,
  Text,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import BottomSheet from '../bottomSheet/BottomSheet';
import { timePickerStyles } from '../../styles/timePicker/timePicker';
import { colorSystem } from '../../utils/colorSystem';

export interface TimePickerProps {
  value?: Date | string;
  onChange?: (date: Date) => void;
  onConfirm?: (date: Date) => void;
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
  renderClockIcon?: () => ReactNode;
}

export const ClockIcon: FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = colorSystem.gray[500],
}) => {
  const borderWidth = Math.max(1.4, Math.round(size * 0.08 * 10) / 10);
  const handThickness = Math.max(1.4, Math.round(size * 0.085 * 10) / 10);

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth,
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Hour hand (vertical up from center) */}
      <View
        style={{
          position: 'absolute',
          top: size * 0.22,
          width: handThickness,
          height: size * 0.3,
          backgroundColor: color,
          borderRadius: handThickness / 2,
        }}
      />
      {/* Minute hand (horizontal right from center) */}
      <View
        style={{
          position: 'absolute',
          top: size * 0.44,
          left: size * 0.44,
          width: size * 0.26,
          height: handThickness,
          backgroundColor: color,
          borderRadius: handThickness / 2,
        }}
      />
    </View>
  );
};

const parseTime = (val?: Date | string): Date => {
  if (!val) return new Date();
  if (val instanceof Date) return val;
  if (typeof val === 'string' && val.includes(':')) {
    const [h, m] = val.split(':').map(Number);
    const d = new Date();
    d.setHours(h ?? 0, m ?? 0, 0, 0);
    return d;
  }
  const d = new Date(val);
  return isNaN(d.getTime()) ? new Date() : d;
};

const formatTime = (date?: Date, is24Hour: boolean = true): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (is24Hour) {
    return `${String(hours).padStart(2, '0')}:${minutes}`;
  }

  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${String(displayHours).padStart(2, '0')}:${minutes} ${period}`;
};

const TimePicker: FC<TimePickerProps> = (props) => {
  const {
    value,
    onChange,
    onConfirm,
    is24Hour = true,
    label,
    placeholder = 'Chọn giờ',
    disabled = false,
    modalTitle = 'Chọn giờ',
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    inline = false,
    visible: controlledVisible,
    onClose,
    style,
    renderClockIcon,
  } = props;

  const [internalVisible, setInternalVisible] = useState(false);
  const isModalOpen =
    controlledVisible !== undefined ? controlledVisible : internalVisible;

  const initialDate = useMemo(() => parseTime(value), [value]);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [activeUnit, setActiveUnit] = useState<'hour' | 'minute'>('hour');

  useEffect(() => {
    setSelectedDate(parseTime(value));
  }, [value]);

  const currentHours = selectedDate.getHours();
  const currentMinutes = selectedDate.getMinutes();

  const displayHoursStr = useMemo(() => {
    if (is24Hour) {
      return String(currentHours).padStart(2, '0');
    }
    const h12 = currentHours % 12 || 12;
    return String(h12).padStart(2, '0');
  }, [currentHours, is24Hour]);

  const displayMinutesStr = String(currentMinutes).padStart(2, '0');
  const isPM = currentHours >= 12;

  const handleSelectHour = (hour: number) => {
    let finalHour = hour;
    if (!is24Hour) {
      if (isPM && hour < 12) finalHour = hour + 12;
      if (!isPM && hour === 12) finalHour = 0;
    }
    const newDate = new Date(selectedDate);
    newDate.setHours(finalHour);
    setSelectedDate(newDate);
    if (onChange) onChange(newDate);
    setActiveUnit('minute');
  };

  const handleSelectMinute = (minute: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMinutes(minute);
    setSelectedDate(newDate);
    if (onChange) onChange(newDate);
  };

  const toggleAmPm = (targetPeriod: 'AM' | 'PM') => {
    const newDate = new Date(selectedDate);
    if (targetPeriod === 'PM' && currentHours < 12) {
      newDate.setHours(currentHours + 12);
    } else if (targetPeriod === 'AM' && currentHours >= 12) {
      newDate.setHours(currentHours - 12);
    }
    setSelectedDate(newDate);
    if (onChange) onChange(newDate);
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

  const handleSetNow = () => {
    const now = new Date();
    setSelectedDate(now);
    if (onChange) onChange(now);
  };

  const hoursList = useMemo(() => {
    if (is24Hour) {
      return Array.from({ length: 24 }, (_, i) => i);
    }
    return Array.from({ length: 12 }, (_, i) => i + 1);
  }, [is24Hour]);

  const minutesList = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => i * 5);
  }, []);

  const renderTimeBody = () => (
    <View>
      {/* Time Digits Display */}
      <View style={timePickerStyles.timeDisplayContainer}>
        <TouchableOpacity
          style={[
            timePickerStyles.timeBox,
            activeUnit === 'hour' && timePickerStyles.timeBoxActive,
          ]}
          onPress={() => setActiveUnit('hour')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              timePickerStyles.timeDigits,
              activeUnit === 'hour' && timePickerStyles.timeDigitsActive,
            ]}
          >
            {displayHoursStr}
          </Text>
        </TouchableOpacity>

        <Text style={timePickerStyles.timeSeparator}>:</Text>

        <TouchableOpacity
          style={[
            timePickerStyles.timeBox,
            activeUnit === 'minute' && timePickerStyles.timeBoxActive,
          ]}
          onPress={() => setActiveUnit('minute')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              timePickerStyles.timeDigits,
              activeUnit === 'minute' && timePickerStyles.timeDigitsActive,
            ]}
          >
            {displayMinutesStr}
          </Text>
        </TouchableOpacity>

        {/* AM / PM Toggle */}
        {!is24Hour && (
          <View style={timePickerStyles.ampmContainer}>
            <TouchableOpacity
              style={[
                timePickerStyles.ampmButton,
                !isPM && timePickerStyles.ampmButtonActive,
              ]}
              onPress={() => toggleAmPm('AM')}
            >
              <Text
                style={[
                  timePickerStyles.ampmText,
                  !isPM && timePickerStyles.ampmTextActive,
                ]}
              >
                AM
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                timePickerStyles.ampmButton,
                isPM && timePickerStyles.ampmButtonActive,
              ]}
              onPress={() => toggleAmPm('PM')}
            >
              <Text
                style={[
                  timePickerStyles.ampmText,
                  isPM && timePickerStyles.ampmTextActive,
                ]}
              >
                PM
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Quick minute chips */}
      {activeUnit === 'minute' && (
        <View style={timePickerStyles.quickChipsRow}>
          {[0, 15, 30, 45].map((m) => (
            <TouchableOpacity
              key={`quick-${m}`}
              style={[
                timePickerStyles.quickChip,
                currentMinutes === m && timePickerStyles.quickChipActive,
              ]}
              onPress={() => handleSelectMinute(m)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  timePickerStyles.quickChipText,
                  currentMinutes === m && timePickerStyles.quickChipTextActive,
                ]}
              >
                :{String(m).padStart(2, '0')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Grid Selection */}
      <ScrollView
        style={timePickerStyles.gridContainer}
        contentContainerStyle={timePickerStyles.gridRow}
        showsVerticalScrollIndicator={false}
      >
        {activeUnit === 'hour'
          ? hoursList.map((h) => {
              const isSelectedHour = is24Hour
                ? currentHours === h
                : (currentHours % 12 || 12) === h;
              return (
                <TouchableOpacity
                  key={`h-${h}`}
                  style={[
                    timePickerStyles.gridItem,
                    isSelectedHour && timePickerStyles.gridItemActive,
                  ]}
                  onPress={() => handleSelectHour(h)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      timePickerStyles.gridItemText,
                      isSelectedHour && timePickerStyles.gridItemTextActive,
                    ]}
                  >
                    {String(h).padStart(2, '0')}
                  </Text>
                </TouchableOpacity>
              );
            })
          : minutesList.map((m) => {
              const isSelectedMinute = currentMinutes === m;
              return (
                <TouchableOpacity
                  key={`m-${m}`}
                  style={[
                    timePickerStyles.gridItem,
                    isSelectedMinute && timePickerStyles.gridItemActive,
                  ]}
                  onPress={() => handleSelectMinute(m)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      timePickerStyles.gridItemText,
                      isSelectedMinute && timePickerStyles.gridItemTextActive,
                    ]}
                  >
                    {String(m).padStart(2, '0')}
                  </Text>
                </TouchableOpacity>
              );
            })}
      </ScrollView>

      {/* Action buttons */}
      <View style={timePickerStyles.footerActions}>
        <TouchableOpacity
          style={[timePickerStyles.actionButton, { marginRight: 'auto' }]}
          onPress={handleSetNow}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: colorSystem.primary,
            }}
          >
            Hiện tại
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={timePickerStyles.actionButton}
          onPress={handleCancel}
        >
          <Text style={timePickerStyles.cancelButtonText}>{cancelText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={timePickerStyles.actionButton}
          onPress={handleConfirm}
        >
          <Text style={timePickerStyles.confirmButtonText}>{confirmText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (inline) {
    return <View style={style}>{renderTimeBody()}</View>;
  }

  const displayValue = value ? formatTime(selectedDate, is24Hour) : '';

  return (
    <>
      <TouchableOpacity
        onPress={() => !disabled && setInternalVisible(true)}
        disabled={disabled}
        activeOpacity={0.7}
        style={[timePickerStyles.trigger, disabled && { opacity: 0.6 }, style]}
      >
        <View style={timePickerStyles.triggerContent}>
          {label ? <Text style={timePickerStyles.label}>{label}</Text> : null}
          {displayValue ? (
            <Text style={timePickerStyles.valueText} numberOfLines={1}>
              {displayValue}
            </Text>
          ) : (
            <Text style={timePickerStyles.placeholderText} numberOfLines={1}>
              {placeholder}
            </Text>
          )}
        </View>
        {renderClockIcon ? (
          renderClockIcon()
        ) : (
          <ClockIcon size={20} color={colorSystem.gray[500]} />
        )}
      </TouchableOpacity>

      <BottomSheet
        visible={isModalOpen}
        onClose={handleCancel}
        title={modalTitle}
      >
        {renderTimeBody()}
      </BottomSheet>
    </>
  );
};

export default TimePicker;
