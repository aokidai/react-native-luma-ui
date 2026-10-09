import React, { type FC, type ReactNode } from 'react';
import {
  type StyleProp,
  Text,
  type TextStyle,
  TouchableOpacity,
  type ViewStyle,
} from 'react-native';
import { segmentedButtonStyles } from '../../styles/segmentedButtons/segmentedButtons';
import { colorSystem } from '../../utils/colorSystem';

export interface SegmentedButtonProps {
  selected: boolean;
  onPress: () => void;
  label?: string;
  icon?: ReactNode;
  children?: ReactNode;
  selectedColor?: string;
  unselectedColor?: string;
  selectedTextColor?: string;
  unselectedTextColor?: string;
  borderColor?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const SegmentedButton: FC<SegmentedButtonProps> = (props) => {
  const {
    selected,
    onPress,
    label,
    icon,
    children,
    selectedColor = colorSystem.primary,
    unselectedColor = colorSystem.gray[100],
    selectedTextColor = colorSystem.onPrimary,
    unselectedTextColor = colorSystem.primary,
    borderColor,
    disabled = false,
    style,
    labelStyle,
  } = props;

  const activeBorderColor =
    borderColor ?? (selected ? selectedColor : colorSystem.gray[300]);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        segmentedButtonStyles.button,
        {
          backgroundColor: selected ? selectedColor : unselectedColor,
          borderColor: activeBorderColor,
        },
        disabled ? segmentedButtonStyles.disabled : undefined,
        style,
      ]}
    >
      {icon && icon}
      {label !== undefined ? (
        <Text
          style={[
            segmentedButtonStyles.label,
            { color: selected ? selectedTextColor : unselectedTextColor },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      ) : null}
      {children}
    </TouchableOpacity>
  );
};

export default SegmentedButton;
