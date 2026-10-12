import React, { type FC } from 'react';
import {
  Image,
  type StyleProp,
  Text,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { avatarStyles } from '../../styles/avatar/avatar';
import { colorSystem } from '../../utils/colorSystem';

export interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const getInitials = (name?: string): string => {
  if (!name) return '';
  const trimmed = name.trim();
  const words = trimmed.split(/\s+/);
  if (words.length === 1) {
    return (words[0]?.slice(0, 2) ?? '').toUpperCase();
  }
  const first = words[0]?.charAt(0) ?? '';
  const last = words[words.length - 1]?.charAt(0) ?? '';
  return `${first}${last}`.toUpperCase();
};

const Avatar: FC<AvatarProps> = (props) => {
  const {
    uri,
    name,
    size = 36,
    backgroundColor = colorSystem.primary,
    textColor = colorSystem.onPrimary,
    borderRadius = size / 2,
    style,
    onPress,
  } = props;

  const initials = getInitials(name);
  const fontSize = Math.max(Math.round(size * 0.4), 10);

  const content = uri ? (
    <Image
      source={{ uri }}
      style={{
        width: size,
        height: size,
        borderRadius,
      }}
      resizeMode="cover"
    />
  ) : (
    <View
      style={[
        avatarStyles.avatar,
        {
          width: size,
          height: size,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    >
      <Text
        style={[
          avatarStyles.initials,
          {
            color: textColor,
            fontSize,
          },
        ]}
      >
        {initials}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={{ borderRadius }}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

export default Avatar;
