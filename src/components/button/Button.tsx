import React, { type FC, type ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { buttonStyles, buttonTextStyles } from '../../styles/button/button';
import Text from '../text/Text';
import { colorSystem } from '../../utils/colorSystem';

export type ButtonMode = 'elevated' | 'outlined' | 'text';
export type ButtonIconPosition = 'left' | 'right';

interface ButtonProps {
  onPress?: () => void;
  icon?: React.ReactNode;
  children?: ReactNode;
  label?: string;
  style?: object;
  labelStyle?: object;
  mode?: ButtonMode;
  labelColor?: string;
  iconPosition?: ButtonIconPosition;
  disabled?: boolean;
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
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        buttonStyles.button,
        buttonStyles[mode],
        style,
        disabled && { backgroundColor: colorSystem.gray[400] },
      ]}
      disabled={disabled}
    >
      {iconPosition === 'left' && icon && icon}
      {label ? (
        <Text
          theme="labelLarge"
          style={[
            buttonTextStyles[mode],
            labelColor && { color: labelColor },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      ) : (
        children && children
      )}
      {iconPosition === 'right' && icon && icon}
    </TouchableOpacity>
  );
};

export default Button;
