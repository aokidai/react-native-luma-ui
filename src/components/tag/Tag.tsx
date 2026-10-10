import React, { type FC, type ReactNode } from 'react';
import {
  type StyleProp,
  Text,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { tagStyles } from '../../styles/tag/tag';

export type TagVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

export interface TagProps {
  text?: string;
  children?: ReactNode;
  variant?: TagVariant;
  color?: string;
  textColor?: string;
  borderColor?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  marginRight?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const Tag: FC<TagProps> = (props) => {
  const {
    text,
    children,
    variant = 'default',
    color,
    textColor,
    borderColor,
    icon,
    iconPosition = 'left',
    marginRight,
    style,
    textStyle,
    onPress,
  } = props;

  const containerVariantStyle =
    variant === 'primary'
      ? tagStyles.primaryContainer
      : variant === 'success'
      ? tagStyles.successContainer
      : variant === 'danger'
      ? tagStyles.dangerContainer
      : variant === 'warning'
      ? tagStyles.warningContainer
      : variant === 'info'
      ? tagStyles.infoContainer
      : tagStyles.defaultContainer;

  const textVariantStyle =
    variant === 'primary'
      ? tagStyles.primaryText
      : variant === 'success'
      ? tagStyles.successText
      : variant === 'danger'
      ? tagStyles.dangerText
      : variant === 'warning'
      ? tagStyles.warningText
      : variant === 'info'
      ? tagStyles.infoText
      : tagStyles.defaultText;

  const combinedContainerStyle: StyleProp<ViewStyle> = [
    tagStyles.container,
    containerVariantStyle,
    color ? { backgroundColor: color } : undefined,
    borderColor ? { borderWidth: 1, borderColor } : undefined,
    marginRight !== undefined ? { marginRight } : undefined,
    style,
  ];

  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      {text !== undefined ? (
        <Text
          style={[
            tagStyles.text,
            textVariantStyle,
            textColor ? { color: textColor } : undefined,
            textStyle,
          ]}
          numberOfLines={1}
        >
          {text}
        </Text>
      ) : null}
      {children}
      {icon && iconPosition === 'right' && icon}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={combinedContainerStyle}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={combinedContainerStyle}>{content}</View>;
};

export default Tag;
