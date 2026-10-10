import React, { type FC, type ReactNode } from 'react';
import {
  type StyleProp,
  Text,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { noContentStyles } from '../../styles/noContent/noContent';
import { colorSystem } from '../../utils/colorSystem';

export interface NoContentProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  textButton?: string;
  buttonText?: string;
  onPressButton?: () => void;
  children?: ReactNode;
  buttonColor?: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

const PlusIcon: FC<{ size?: number; color?: string }> = ({
  size = 18,
  color = colorSystem.primary,
}) => (
  <View
    style={{
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        position: 'absolute',
        width: size * 0.7,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
      }}
    />
    <View
      style={{
        position: 'absolute',
        width: 2,
        height: size * 0.7,
        backgroundColor: color,
        borderRadius: 1,
      }}
    />
  </View>
);

const NoContent: FC<NoContentProps> = (props) => {
  const {
    title,
    description,
    icon,
    textButton,
    buttonText,
    onPressButton,
    children,
    buttonColor = colorSystem.primary,
    backgroundColor,
    style,
  } = props;

  const actionLabel = textButton ?? buttonText;

  return (
    <View
      style={[
        noContentStyles.container,
        backgroundColor ? { backgroundColor } : undefined,
        style,
      ]}
    >
      {icon ? <View style={noContentStyles.iconContainer}>{icon}</View> : null}

      {title ? <Text style={noContentStyles.title}>{title}</Text> : null}
      {description ? (
        <Text style={noContentStyles.description}>{description}</Text>
      ) : null}

      {children}

      {actionLabel && onPressButton ? (
        <TouchableOpacity
          style={[noContentStyles.button, { borderColor: buttonColor }]}
          onPress={onPressButton}
          activeOpacity={0.7}
        >
          <PlusIcon size={18} color={buttonColor} />
          <Text style={[noContentStyles.buttonText, { color: buttonColor }]}>
            {actionLabel}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default NoContent;
