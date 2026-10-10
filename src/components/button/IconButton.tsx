import React, { type FC, type ReactNode } from 'react';
import {
  type StyleProp,
  Text,
  TouchableOpacity,
  type ViewStyle,
} from 'react-native';
import { colorSystem } from '../../utils/colorSystem';
import { buttonIconStyles } from '../../styles/button/button';
import type { ButtonMode } from './Button';

export interface IconButtonProps {
  onPress?: () => void;
  icon?: ReactNode | ((size: number, color: string) => ReactNode);
  size?: number;
  iconSize?: number;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  label?: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  mode?: ButtonMode;
}

const IconButton: FC<IconButtonProps> = (props) => {
  const {
    onPress,
    icon,
    size = 40,
    iconSize = 20,
    color,
    backgroundColor,
    borderColor,
    borderRadius,
    label,
    children,
    style,
    disabled = false,
    mode = 'elevated',
  } = props;

  const defaultIconColor =
    mode === 'elevated' ? colorSystem.onPrimary : colorSystem.primary;
  const currentIconColor = color ?? defaultIconColor;

  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === 'function') {
      return icon(iconSize, currentIconColor);
    }
    return icon;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        buttonIconStyles.iconButton,
        buttonIconStyles[mode],
        size ? { width: label ? undefined : size, height: size } : undefined,
        backgroundColor ? { backgroundColor } : undefined,
        borderColor ? { borderColor, borderWidth: 1 } : undefined,
        borderRadius !== undefined ? { borderRadius } : undefined,
        label
          ? {
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 12,
              gap: 6,
            }
          : undefined,
        style,
        disabled && { backgroundColor: colorSystem.gray[400] },
      ]}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {renderIcon()}
      {label ? (
        <Text
          style={{
            color: currentIconColor,
            fontWeight: '600',
            fontSize: 13,
          }}
        >
          {label}
        </Text>
      ) : null}
      {children}
    </TouchableOpacity>
  );
};

export default IconButton;
