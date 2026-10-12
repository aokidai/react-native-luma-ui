import React, {
  type FC,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  type StyleProp,
  Text,
  type TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  type ViewStyle,
} from 'react-native';
import { switchStyles } from '../../styles/switch/switch';
import { colorSystem } from '../../utils/colorSystem';
import { useTheme } from '../../utils/theme';

export interface SwitchProps {
  value?: boolean;
  defaultValue?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  color?: string;
  trackColor?: { false?: string; true?: string };
  thumbColor?: { false?: string; true?: string };
  thumbIcon?: (props: { checked: boolean; size: number }) => ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface SwitchItemProps extends SwitchProps {
  label: ReactNode;
  description?: ReactNode;
  labelStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  position?: 'leading' | 'trailing';
}

const SwitchBase: FC<SwitchProps> = (props) => {
  const { isDark, colors } = useTheme();
  const {
    value,
    defaultValue = false,
    onValueChange,
    disabled = false,
    color,
    trackColor,
    thumbColor,
    thumbIcon,
    style,
    testID,
  } = props;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const checked = isControlled ? !!value : internalValue;

  // Animation values: 0 for unchecked, 1 for checked
  const animValue = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: checked ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [checked, animValue]);

  const handleToggle = () => {
    if (disabled) return;
    const nextValue = !checked;
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  // Interpolations
  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  const thumbSize = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 24],
  });

  const resolvedColor =
    color ?? (isDark ? colors.primary : colorSystem.primary);
  const activeTrackColor = trackColor?.true ?? resolvedColor;
  const inactiveTrackColor =
    trackColor?.false ??
    (isDark ? colors.surfaceContainerHighest : colorSystem.gray[200]);
  const activeThumbColor =
    thumbColor?.true ?? (isDark ? colors.onPrimary : colorSystem.onPrimary);
  const inactiveThumbColor =
    thumbColor?.false ?? (isDark ? colors.outline : colorSystem.gray[600]);

  const currentTrackBg = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveTrackColor, activeTrackColor],
  });

  const currentTrackBorder = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      isDark ? colors.outline : colorSystem.gray[500],
      activeTrackColor,
    ],
  });

  const currentThumbBg = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveThumbColor, activeThumbColor],
  });

  return (
    <TouchableWithoutFeedback
      testID={testID}
      onPress={handleToggle}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
    >
      <Animated.View
        style={[
          switchStyles.track,
          {
            backgroundColor: currentTrackBg,
            borderColor: currentTrackBorder,
          },
          disabled && switchStyles.trackDisabled,
          style,
        ]}
      >
        <Animated.View
          style={[
            switchStyles.thumb,
            {
              width: thumbSize,
              height: thumbSize,
              backgroundColor: currentThumbBg,
              transform: [{ translateX }],
            },
          ]}
        >
          {thumbIcon && thumbIcon({ checked, size: checked ? 14 : 10 })}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export const SwitchItem: FC<SwitchItemProps> = (props) => {
  const { isDark, colors } = useTheme();
  const {
    label,
    description,
    labelStyle,
    descriptionStyle,
    position = 'trailing',
    value,
    defaultValue,
    onValueChange,
    disabled,
    style,
    ...rest
  } = props;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? false);
  const checked = isControlled ? !!value : internalValue;

  const handlePress = () => {
    if (disabled) return;
    const nextVal = !checked;
    if (!isControlled) {
      setInternalValue(nextVal);
    }
    onValueChange?.(nextVal);
  };

  const switchElement = (
    <SwitchBase
      value={checked}
      onValueChange={onValueChange}
      disabled={disabled}
      {...rest}
    />
  );

  return (
    <TouchableOpacity
      style={[switchStyles.itemContainer, disabled && { opacity: 0.5 }, style]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
    >
      {position === 'leading' && (
        <View style={{ marginRight: 16 }}>{switchElement}</View>
      )}

      <View style={switchStyles.itemContent}>
        {typeof label === 'string' ? (
          <Text
            style={[
              switchStyles.label,
              isDark && { color: colors.onSurface },
              labelStyle,
            ]}
          >
            {label}
          </Text>
        ) : (
          label
        )}
        {description ? (
          typeof description === 'string' ? (
            <Text
              style={[
                switchStyles.description,
                isDark && { color: colors.onSurfaceVariant },
                descriptionStyle,
              ]}
            >
              {description}
            </Text>
          ) : (
            description
          )
        ) : null}
      </View>

      {position === 'trailing' && switchElement}
    </TouchableOpacity>
  );
};

export interface SwitchComponent extends FC<SwitchProps> {
  Item: typeof SwitchItem;
}

export const Switch: SwitchComponent = SwitchBase as SwitchComponent;
Switch.Item = SwitchItem;

export default Switch;
