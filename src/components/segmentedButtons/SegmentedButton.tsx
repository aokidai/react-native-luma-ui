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
import { useTheme } from '../../utils/theme';

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
  const { isDark, colors } = useTheme();
  const {
    selected,
    onPress,
    label,
    icon,
    children,
    selectedColor,
    unselectedColor,
    selectedTextColor,
    unselectedTextColor,
    borderColor,
    disabled = false,
    style,
    labelStyle,
  } = props;

  const resolvedSelectedColor =
    selectedColor ?? (isDark ? colors.primary : colorSystem.primary);
  const resolvedUnselectedColor =
    unselectedColor ??
    (isDark ? colors.surfaceContainerHighest : colorSystem.gray[100]);
  const resolvedSelectedTextColor =
    selectedTextColor ?? (isDark ? colors.onPrimary : colorSystem.onPrimary);
  const resolvedUnselectedTextColor =
    unselectedTextColor ?? (isDark ? colors.onSurface : colorSystem.primary);

  const activeBorderColor =
    borderColor ??
    (selected
      ? resolvedSelectedColor
      : isDark
      ? colors.outlineVariant
      : colorSystem.gray[300]);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        segmentedButtonStyles.button,
        {
          backgroundColor: selected
            ? resolvedSelectedColor
            : resolvedUnselectedColor,
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
            {
              color: selected
                ? resolvedSelectedTextColor
                : resolvedUnselectedTextColor,
            },
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
