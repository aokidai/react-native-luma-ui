import React, {
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  ScrollView,
  type StyleProp,
  Text,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { tabsStyles } from '../../styles/tabs/tabs';
import { colorSystem } from '../../utils/colorSystem';

interface TabsContextType {
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  scrollable?: boolean;
}

const TabsContext = createContext<TabsContextType>({});

export interface TabProps {
  label: string;
  icon?: ReactNode;
  badge?: ReactNode;
  onPress?: () => void;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  index?: number;
}

export const Tab: FC<TabProps> = (props) => {
  const {
    label,
    icon,
    badge,
    onPress,
    selected: explicitSelected,
    style,
    labelStyle,
    index,
  } = props;

  const context = useContext(TabsContext);
  const isSelected =
    explicitSelected !== undefined
      ? explicitSelected
      : index !== undefined && context.selectedIndex === index;

  const activeColor = context.activeColor ?? colorSystem.primary;
  const inactiveColor = context.inactiveColor ?? colorSystem.gray[600];

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (index !== undefined && context.onSelect) {
      context.onSelect(index);
    }
  };

  return (
    <TouchableOpacity
      style={[
        tabsStyles.tab,
        context.scrollable && tabsStyles.tabScrollable,
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
      accessibilityRole="tab"
      accessibilityState={{ selected: isSelected }}
    >
      {icon ? <View>{icon}</View> : null}
      <Text
        style={[
          tabsStyles.label,
          { color: isSelected ? activeColor : inactiveColor },
          isSelected && tabsStyles.labelActive,
          labelStyle,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
      {badge ? <View>{badge}</View> : null}
    </TouchableOpacity>
  );
};

export interface TabsProps {
  selectedIndex: number;
  onSelect: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  scrollable?: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface TabsComponent extends FC<TabsProps> {
  Tab: typeof Tab;
}

const TabsBase: FC<TabsProps> = (props) => {
  const {
    selectedIndex,
    onSelect,
    activeColor = colorSystem.primary,
    inactiveColor,
    scrollable = false,
    children,
    style,
  } = props;

  const [containerWidth, setContainerWidth] = useState(0);
  const totalTabs = React.Children.count(children);
  const tabWidth = scrollable
    ? 100
    : containerWidth > 0 && totalTabs > 0
    ? containerWidth / totalTabs
    : 0;

  const indicatorTranslate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (tabWidth > 0) {
      Animated.spring(indicatorTranslate, {
        toValue: selectedIndex * tabWidth,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
    }
  }, [selectedIndex, tabWidth, indicatorTranslate]);

  const content = (
    <TabsContext.Provider
      value={{
        selectedIndex,
        onSelect,
        activeColor,
        inactiveColor,
        scrollable,
      }}
    >
      <View
        style={[tabsStyles.container, style]}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      >
        {React.Children.map(children, (child, idx) => {
          if (React.isValidElement<TabProps>(child)) {
            return React.cloneElement(child, {
              index: child.props.index ?? idx,
            });
          }
          return child;
        })}

        {tabWidth > 0 && (
          <Animated.View
            style={[
              tabsStyles.indicatorContainer,
              {
                width: tabWidth,
                transform: [{ translateX: indicatorTranslate }],
              },
            ]}
          >
            <View
              style={[tabsStyles.indicator, { backgroundColor: activeColor }]}
            />
          </Animated.View>
        )}
      </View>
    </TabsContext.Provider>
  );

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {content}
      </ScrollView>
    );
  }

  return content;
};

export const Tabs: TabsComponent = TabsBase as TabsComponent;
Tabs.Tab = Tab;

export default Tabs;
