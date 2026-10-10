import React, {
  createContext,
  type FC,
  type ReactNode,
  useContext,
} from 'react';
import {
  type StyleProp,
  Text,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { navigationBarStyles } from '../../styles/navigationBar/navigationBar';
import { colorSystem } from '../../utils/colorSystem';

interface NavigationBarContextType {
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  indicatorBorderRadius?: number;
}

const NavigationBarContext = createContext<NavigationBarContextType>({});

export interface NavigationItemProps {
  label?: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
  badge?: ReactNode;
  onPress?: () => void;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  indicatorBorderRadius?: number;
  labelStyle?: StyleProp<TextStyle>;
  index?: number;
}

export const NavigationItem: FC<NavigationItemProps> = (props) => {
  const {
    label,
    icon,
    activeIcon,
    badge,
    onPress,
    selected: explicitSelected,
    style,
    indicatorStyle,
    indicatorBorderRadius: explicitBorderRadius,
    labelStyle,
    index,
  } = props;

  const context = useContext(NavigationBarContext);
  const isSelected =
    explicitSelected !== undefined
      ? explicitSelected
      : index !== undefined && context.selectedIndex === index;

  const activeColor = context.activeColor ?? colorSystem.primary;
  const inactiveColor = context.inactiveColor ?? colorSystem.gray[600];
  const borderRadius =
    explicitBorderRadius ?? context.indicatorBorderRadius ?? 16;

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (index !== undefined && context.onSelect) {
      context.onSelect(index);
    }
  };

  const displayIcon = isSelected && activeIcon ? activeIcon : icon;

  return (
    <TouchableOpacity
      style={[navigationBarStyles.item, style]}
      onPress={handlePress}
      activeOpacity={0.7}
      accessibilityRole="tab"
      accessibilityState={{ selected: isSelected }}
    >
      <View
        style={[
          navigationBarStyles.indicator,
          { borderRadius },
          isSelected && navigationBarStyles.indicatorActive,
          isSelected && { borderRadius, overflow: 'hidden' },
          isSelected && activeColor !== colorSystem.primary
            ? { backgroundColor: `${activeColor}25` }
            : undefined,
          indicatorStyle,
        ]}
      >
        <View style={navigationBarStyles.badgeWrapper}>
          {displayIcon}
          {badge}
        </View>
      </View>

      {label ? (
        <Text
          style={[
            navigationBarStyles.label,
            { color: isSelected ? activeColor : inactiveColor },
            isSelected && navigationBarStyles.labelActive,
            labelStyle,
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export interface NavigationBarProps {
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  indicatorBorderRadius?: number;
  children: ReactNode;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

interface NavigationBarComponent extends FC<NavigationBarProps> {
  Item: typeof NavigationItem;
}

const NavigationBarBase: FC<NavigationBarProps> = (props) => {
  const {
    selectedIndex,
    onSelect,
    activeColor,
    inactiveColor,
    indicatorBorderRadius,
    children,
    backgroundColor,
    style,
  } = props;

  const insets = useSafeAreaInsets();

  return (
    <NavigationBarContext.Provider
      value={{
        selectedIndex,
        onSelect,
        activeColor,
        inactiveColor,
        indicatorBorderRadius,
      }}
    >
      <View
        style={[
          navigationBarStyles.container,
          {
            paddingTop: 12,
            paddingBottom: 12 + (insets.bottom > 0 ? insets.bottom : 0),
          },
          backgroundColor ? { backgroundColor } : undefined,
          style,
        ]}
      >
        {React.Children.map(children, (child, idx) => {
          if (React.isValidElement<NavigationItemProps>(child)) {
            return React.cloneElement(child, {
              index: child.props.index ?? idx,
            });
          }
          return child;
        })}
      </View>
    </NavigationBarContext.Provider>
  );
};

export const NavigationBar: NavigationBarComponent =
  NavigationBarBase as NavigationBarComponent;
NavigationBar.Item = NavigationItem;

export default NavigationBar;
