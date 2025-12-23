import { type FC, type ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';
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
  const {
    onPress,
    icon,
    label,
    style,
    labelStyle,
    labelColor = colorSystem.onPrimary,
    disabled = false,
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        buttonFABStyles.button,
        label && buttonFABStyles.buttonWithLabel,
        style,
        disabled && { backgroundColor: colorSystem.gray[400] },
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
