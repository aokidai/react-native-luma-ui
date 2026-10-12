import React, { type FC, type ReactNode } from 'react';
import {
  type StyleProp,
  Text,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { chipStyles } from '../../styles/chip/chip';
import { colorSystem } from '../../utils/colorSystem';
import { useTheme } from '../../utils/theme';

export type ChipVariant = 'assist' | 'filter' | 'input' | 'suggestion';

export interface ChipProps {
  label: string;
  variant?: ChipVariant;
  selected?: boolean;
  elevated?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  onPress?: () => void;
  onClose?: () => void;
  selectedColor?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const ChipCheckIcon: FC<{ size?: number; color?: string }> = ({
  size = 18,
  color = colorSystem.primary,
}) => {
  const width = size * 0.32;
  const height = size * 0.55;
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width,
          height,
          borderBottomWidth: 2,
          borderRightWidth: 2,
          borderColor: color,
          transform: [{ rotate: '45deg' }, { translateY: -height * 0.15 }],
        }}
      />
    </View>
  );
};

const ChipCancelIcon: FC<{ size?: number; color?: string }> = ({
  size = 18,
  color = colorSystem.gray[600],
}) => {
  const barLength = size * 0.5;
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          position: 'absolute',
          width: barLength,
          height: 1.8,
          backgroundColor: color,
          borderRadius: 1,
          transform: [{ rotate: '45deg' }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: barLength,
          height: 1.8,
          backgroundColor: color,
          borderRadius: 1,
          transform: [{ rotate: '-45deg' }],
        }}
      />
    </View>
  );
};

const Chip: FC<ChipProps> = (props) => {
  const { isDark, colors } = useTheme();
  const {
    label,
    variant = 'assist',
    selected = false,
    elevated = false,
    disabled = false,
    icon,
    onPress,
    onClose,
    selectedColor,
    style,
    labelStyle,
  } = props;

  const resolvedSelectedColor = selectedColor ?? colors.primary;

  const isFilter = variant === 'filter';
  const showCheck = isFilter && selected;

  return (
    <TouchableOpacity
      style={[
        chipStyles.container,
        {
          backgroundColor: isDark
            ? elevated
              ? colors.surfaceContainer
              : colors.surfaceContainerLow
            : elevated
            ? colors.surfaceContainerLowest
            : colors.surfaceContainerLowest,
          borderColor: colors.outlineVariant,
        },
        elevated && chipStyles.elevated,
        selected &&
          (elevated ? chipStyles.selectedElevated : chipStyles.selected),
        selected && {
          borderColor: resolvedSelectedColor,
          backgroundColor: `${resolvedSelectedColor}25`,
        },
        disabled && chipStyles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
    >
      {showCheck ? (
        <ChipCheckIcon size={18} color={resolvedSelectedColor} />
      ) : (
        icon && <View>{icon}</View>
      )}

      <Text
        style={[
          chipStyles.label,
          { color: colors.onSurface },
          selected && chipStyles.labelSelected,
          selected && { color: resolvedSelectedColor },
          labelStyle,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>

      {onClose ? (
        <TouchableOpacity
          onPress={onClose}
          style={chipStyles.closeButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <ChipCancelIcon
            size={18}
            color={selected ? resolvedSelectedColor : colors.onSurfaceVariant}
          />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

export default Chip;
