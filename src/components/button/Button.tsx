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
import { colorSystem } from '../../utils/colorSystem';

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
    mode === 'elevated' ? colorSystem.onPrimary : colorSystem.primary;
  const currentTextColor = labelColor ?? defaultTextColor;

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
        style,
        disabled && { backgroundColor: colorSystem.gray[400] },
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
                labelColor ? { color: labelColor } : undefined,
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
