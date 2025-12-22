import React, { type FC, type ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { buttonStyles } from '../styles/button/button';
import { colorSystem } from '../utils/colorSystem';

export type ButtonMode = 'elevated' | 'filled' | 'outlined' | 'text' | 'icon';
export type ButtonIconPosition = 'left' | 'right';

interface ButtonProps {
  onPress?: () => void;
  icon?: React.ReactNode;
  children?: ReactNode;
  label?: string;
  style?: object;
  labelStyle?: object;
  mode?: ButtonMode;
  color?: string;
  labelColor?: string;
  iconPosition?: ButtonIconPosition;
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
    color = colorSystem.primary,
    labelColor = colorSystem.onPrimary,
    iconPosition = 'left',
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style,
        buttonStyles.button,
        mode === 'elevated' ? { backgroundColor: color } : {},
      ]}
    >
      {iconPosition === 'left' && icon && icon}
      {label ? (
        <Text style={[labelStyle, { color: labelColor }]}>{label}</Text>
      ) : (
        children
      )}
      {iconPosition === 'right' && icon && icon}
    </TouchableOpacity>
  );
};

export default Button;
