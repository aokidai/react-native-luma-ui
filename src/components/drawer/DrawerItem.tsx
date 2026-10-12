import React, { type FC, type ReactNode } from 'react';
import {
  type StyleProp,
  Text,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { drawerStyles } from '../../styles/drawer/drawer';
import { colorSystem } from '../../utils/colorSystem';
import { useTheme } from '../../utils/theme';

export interface DrawerItemProps {
  label: string;
  icon?: ReactNode;
  active?: boolean;
  onPress?: () => void;
  badge?: ReactNode;
  activeColor?: string;
  inactiveColor?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const DrawerItem: FC<DrawerItemProps> = (props) => {
  const { colors } = useTheme();
  const {
    label,
    icon,
    active = false,
    onPress,
    badge,
    activeColor = colors.primary,
    inactiveColor = colors.onSurface,
    style,
    labelStyle,
  } = props;

  return (
    <TouchableOpacity
      style={[
        drawerStyles.item,
        active && drawerStyles.itemActive,
        active && activeColor !== colorSystem.primary
          ? { backgroundColor: `${activeColor}15` }
          : undefined,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon ? <View>{icon}</View> : null}

      <View style={drawerStyles.itemContent}>
        <Text
          style={[
            drawerStyles.itemLabel,
            { color: active ? activeColor : inactiveColor },
            active && drawerStyles.itemLabelActive,
            labelStyle,
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>

      {badge ? <View>{badge}</View> : null}
    </TouchableOpacity>
  );
};

export default DrawerItem;
