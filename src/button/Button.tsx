import React, { type FC, type ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { buttonStyles } from '../styles/button/button';

interface ButtonProps {
  onPress?: () => void;
  icon?: React.ReactNode;
  children?: ReactNode;
  label?: string;
}

const Button: FC<ButtonProps> = (props) => {
  const { onPress, icon, children, label } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyles.button]}>
      {icon && icon}
      {label ? <Text>{label}</Text> : children}
    </TouchableOpacity>
  );
};

export default Button;
