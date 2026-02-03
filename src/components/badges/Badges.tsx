import { type FC, type ReactNode } from 'react';
import { View } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';
import { badgesStyles } from '../../styles/badges/badges';
import Text from '../text/Text';

interface Props {
  visible?: boolean;
  count?: number;
  color?: string;
  countColor?: string;
  children: ReactNode;
}

const Badges: FC<Props> = (props) => {
  const {
    visible = true,
    count,
    color = colorSystem.error,
    countColor = colorSystem.onPrimary,
    children,
  } = props;
  const showCount = typeof count === 'number';

  return (
    <View style={badgesStyles.container}>
      {children}

      {visible && (
        <View
          style={[
            badgesStyles.badge,
            { backgroundColor: color },
            showCount && badgesStyles.badgeWithCount,
          ]}
        >
          {showCount && (
            <Text color={countColor} theme="bodySmall">
              {count > 99 ? '99+' : count.toString()}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default Badges;
