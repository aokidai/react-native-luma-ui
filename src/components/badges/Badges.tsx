import { type FC, type ReactNode } from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';
import { badgesStyles } from '../../styles/badges/badges';
import Text from '../text/Text';

export interface BadgesProps {
  children?: ReactNode;
  visible?: boolean;
  count?: number;
  maxCount?: number;
  dot?: boolean;
  color?: string;
  countColor?: string;
  style?: StyleProp<ViewStyle>;
  badgeStyle?: StyleProp<ViewStyle>;
}

const Badges: FC<BadgesProps> = (props) => {
  const {
    children,
    visible = true,
    count,
    maxCount = 99,
    dot = false,
    color = colorSystem.error,
    countColor = colorSystem.onError,
    style,
    badgeStyle,
  } = props;

  const showCount = !dot && typeof count === 'number';
  const isCountVisible = typeof count === 'number' ? count > 0 : true;

  if (!visible || !isCountVisible) {
    return <View style={style}>{children}</View>;
  }

  const displayCount =
    count !== undefined ? (count > maxCount ? `${maxCount}+` : `${count}`) : '';

  return (
    <View style={[badgesStyles.container, style]}>
      {children}

      <View
        style={[
          badgesStyles.badge,
          { backgroundColor: color },
          dot && {
            width: 8,
            height: 8,
            minWidth: 8,
            borderRadius: 4,
            paddingHorizontal: 0,
            top: -3,
            right: -3,
          },
          showCount && badgesStyles.badgeWithCount,
          badgeStyle,
        ]}
      >
        {showCount && displayCount ? (
          <Text color={countColor} theme="bodySmall">
            {displayCount}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default Badges;
