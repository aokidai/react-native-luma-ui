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
  const {
    label,
    variant = 'assist',
    selected = false,
    elevated = false,
    disabled = false,
    icon,
    onPress,
    onClose,
    selectedColor = colorSystem.primary,
    style,
    labelStyle,
  } = props;

  const isFilter = variant === 'filter';
  const showCheck = isFilter && selected;

  return (
    <TouchableOpacity
      style={[
        chipStyles.container,
        elevated && chipStyles.elevated,
        selected &&
          (elevated ? chipStyles.selectedElevated : chipStyles.selected),
        selected && selectedColor !== colorSystem.primary
          ? {
              borderColor: selectedColor,
              backgroundColor: `${selectedColor}20`,
            }
          : undefined,
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
        <ChipCheckIcon size={18} color={selectedColor} />
      ) : (
        icon && <View>{icon}</View>
      )}

      <Text
        style={[
          chipStyles.label,
          selected && chipStyles.labelSelected,
          selected && selectedColor !== colorSystem.primary
            ? { color: selectedColor }
            : undefined,
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
            color={selected ? selectedColor : colorSystem.gray[600]}
          />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

export default Chip;
