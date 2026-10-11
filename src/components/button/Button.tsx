import React, { type FC, type ReactNode } from 'react';
import {
  ActivityIndicator,
  type StyleProp,
  TouchableOpacity,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { buttonStyles, buttonTextStyles } from '../../styles/button/button';
import Text from '../text/Text';
import { useTheme } from '../../utils/theme';

export type ButtonMode = 'elevated' | 'outlined' | 'text';
export type ButtonIconPosition = 'left' | 'right';

export interface ButtonProps {
  onPress?: () => void;
  icon?: ReactNode | ((size: number, color?: string) => ReactNode);
  children?: ReactNode;
  label?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  mode?: ButtonMode;
  labelColor?: string;
  iconPosition?: ButtonIconPosition;
  disabled?: boolean;
  loading?: boolean;
}

const Button: FC<ButtonProps> = (props) => {
  const { isDark, colors } = useTheme();
  const {
    onPress,
    icon,
    children,
    label,
    style,
    labelStyle,
    mode = 'elevated',
    labelColor,
    iconPosition = 'left',
    disabled = false,
    loading = false,
  } = props;

  const defaultTextColor =
    mode === 'elevated' ? colors.onPrimary : colors.primary;
  const currentTextColor = labelColor ?? defaultTextColor;

  const dynamicModeStyle =
    mode === 'elevated'
      ? { backgroundColor: colors.primary }
      : mode === 'outlined'
      ? {
          borderColor: colors.outline,
          borderWidth: 1,
          backgroundColor: isDark
            ? colors.surfaceContainerLow
            : colors.surfaceContainerLowest,
        }
      : undefined;

  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === 'function') {
      return icon(18, currentTextColor);
    }
    return icon;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        buttonStyles.button,
        buttonStyles[mode],
        dynamicModeStyle,
        style,
        disabled && {
          backgroundColor: isDark ? colors.surfaceContainerHighest : '#E0E0E0',
        },
      ]}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={currentTextColor} />
      ) : (
        <>
          {iconPosition === 'left' && renderIcon()}
          {label ? (
            <Text
              theme="labelLarge"
              style={[
                buttonTextStyles[mode],
                { color: currentTextColor },
                labelStyle,
              ]}
            >
              {label}
            </Text>
          ) : (
            children
          )}
          {iconPosition === 'right' && renderIcon()}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
