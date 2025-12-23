import React, { type FC, type ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';
import { buttonIconStyles } from '../../styles/button/button';
import type { ButtonMode } from './Button';

interface ButtonProps {
  onPress?: () => void;
  icon?: (size: number, color: string) => ReactNode;
  style?: object;
  disabled?: boolean;
  mode?: ButtonMode;
}

const IconButton: FC<ButtonProps> = (props) => {
  const { onPress, icon, style, disabled = false, mode = 'elevated' } = props;

  const iconColor =
    mode === 'elevated' ? colorSystem.onPrimary : colorSystem.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        buttonIconStyles.iconButton,
        buttonIconStyles[mode],
        style,
        disabled && { backgroundColor: colorSystem.gray[400] },
      ]}
      disabled={disabled}
    >
      {icon && icon(24, iconColor)}
    </TouchableOpacity>
  );
};

export default IconButton;
