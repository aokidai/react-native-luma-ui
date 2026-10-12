import React, { type FC, type ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../../utils/theme';
import Text from '../text/Text';
import { buttonFABStyles } from '../../styles/button/button';

interface ButtonProps {
  onPress?: () => void;
  icon: ReactNode;
  label?: string;
  style?: object;
  labelStyle?: object;
  labelColor?: string;
  disabled?: boolean;
}

const FAB: FC<ButtonProps> = (props) => {
  const { isDark, colors } = useTheme();
  const {
    onPress,
    icon,
    label,
    style,
    labelStyle,
    labelColor = colors.onPrimaryContainer,
    disabled = false,
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        buttonFABStyles.button,
        { backgroundColor: colors.primaryContainer },
        label && buttonFABStyles.buttonWithLabel,
        style,
        disabled && {
          backgroundColor: isDark ? colors.surfaceContainerHighest : '#E0E0E0',
        },
      ]}
      disabled={disabled}
    >
      {icon}
      {label && (
        <Text
          theme="labelLarge"
          style={[labelColor && { color: labelColor }, labelStyle]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default FAB;
