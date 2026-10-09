import React, {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LumaUser from './LumaUser';
import {UserAvatar} from '../../../../../components/UserAvatar';
import useAppTheme from '../../../../../hooks/useAppTheme';
import {appColors} from '../../../../../constants/appColors';

interface Props {
  listUserEmail: string[];
  maxDisplay?: number;
  avatarSize?: number;
}

const LumaGroupUser: FC<Props> = props => {
  const {listUserEmail = [], maxDisplay = 5, avatarSize = 18} = props;
  const themeColor = useAppTheme();

  const displayList = listUserEmail.slice(0, maxDisplay);
  const remainingCount = listUserEmail.length - maxDisplay;

  const overlapMargin = -Math.round(avatarSize * 0.5);

  return (
    <View style={styles.container}>
      {displayList.map((email, index) => (
        <View
          key={`${email}-${index}`}
          style={[
            styles.avatarWrapper,
            {
              marginLeft: index === 0 ? 0 : overlapMargin,
              zIndex: index,
            },
          ]}>
          <LumaUser userEmail={email} avatarOnly size={avatarSize} />
        </View>
      ))}

      {remainingCount > 0 && (
        <View
          style={[
            styles.avatarWrapper,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
              marginLeft: overlapMargin,
              zIndex: displayList.length,
              backgroundColor: themeColor,
              borderWidth: 1,
              borderColor: appColors.threadGrayBorder,
            },
          ]}>
          <Text
            allowFontScaling={false}
            style={[
              styles.moreText,
              {
                fontSize:
                  remainingCount > 9
                    ? Math.round(avatarSize * 0.42)
                    : Math.round(avatarSize * 0.48),
              },
            ]}>
            +{remainingCount}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreText: {
    color: appColors.white,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});

export default LumaGroupUser;
