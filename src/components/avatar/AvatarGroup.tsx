import React, { type FC } from 'react';
import { type StyleProp, Text, View, type ViewStyle } from 'react-native';
import { avatarStyles } from '../../styles/avatar/avatar';
import { colorSystem } from '../../utils/colorSystem';
import Avatar from './Avatar';

export interface AvatarUser {
  id?: string | number;
  uri?: string;
  name?: string;
}

export interface AvatarGroupProps {
  users?: AvatarUser[];
  maxDisplay?: number;
  size?: number;
  overlapMargin?: number;
  moreBackgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

const AvatarGroup: FC<AvatarGroupProps> = (props) => {
  const {
    users = [],
    maxDisplay = 5,
    size = 32,
    overlapMargin = -Math.round(size * 0.35),
    moreBackgroundColor = colorSystem.gray[700],
    style,
  } = props;

  const displayList = users.slice(0, maxDisplay);
  const remainingCount = users.length - maxDisplay;

  return (
    <View style={[avatarStyles.groupContainer, style]}>
      {displayList.map((user, index) => (
        <View
          key={user.id ?? `${user.name}-${index}`}
          style={[
            avatarStyles.avatarWrapper,
            {
              marginLeft: index === 0 ? 0 : overlapMargin,
              zIndex: index,
            },
          ]}
        >
          <Avatar uri={user.uri} name={user.name} size={size} />
        </View>
      ))}

      {remainingCount > 0 && (
        <View
          style={[
            avatarStyles.moreBadge,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              marginLeft: overlapMargin,
              zIndex: displayList.length,
              backgroundColor: moreBackgroundColor,
            },
          ]}
        >
          <Text
            style={[
              avatarStyles.moreText,
              {
                fontSize: Math.max(Math.round(size * 0.35), 9),
              },
            ]}
          >
            +{remainingCount}
          </Text>
        </View>
      )}
    </View>
  );
};

export default AvatarGroup;
