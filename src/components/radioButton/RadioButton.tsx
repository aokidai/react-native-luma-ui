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
import { radioButtonStyles } from '../../styles/radioButton/radioButton';
import { colorSystem } from '../../utils/colorSystem';

// Group Context
interface RadioGroupContextType {
  value?: any;
  onValueChange?: (value: any) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export interface RadioGroupProps {
  value?: any;
  onValueChange?: (value: any) => void;
  disabled?: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const RadioGroup: FC<RadioGroupProps> = ({
  value,
  onValueChange,
  disabled,
  children,
  style,
}) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange, disabled }}>
      <View style={style}>{children}</View>
    </RadioGroupContext.Provider>
  );
};

export interface RadioButtonProps {
  value?: any;
  selected?: boolean;
  onPress?: () => void;
  color?: string;
  uncheckedColor?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const RadioButtonBase: FC<RadioButtonProps> = (props) => {
  const {
    value,
    selected: explicitSelected,
    onPress,
    color = colorSystem.primary,
    uncheckedColor = colorSystem.gray[600],
    disabled: explicitDisabled,
    style,
  } = props;

  const group = useContext(RadioGroupContext);
  const isSelected =
    explicitSelected !== undefined
      ? explicitSelected
      : group && value !== undefined
      ? group.value === value
      : false;

  const disabled = explicitDisabled ?? group?.disabled ?? false;

  const handlePress = () => {
    if (disabled) return;
    if (onPress) {
      onPress();
    } else if (group && value !== undefined) {
      group.onValueChange?.(value);
    }
  };

  return (
    <TouchableOpacity
      style={[
        radioButtonStyles.container,
        disabled && { opacity: 0.38 },
        style,
      ]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected, disabled }}
    >
      <View
        style={[
          radioButtonStyles.outerCircle,
          { borderColor: isSelected ? color : uncheckedColor },
        ]}
      >
        {isSelected ? (
          <View
            style={[radioButtonStyles.innerDot, { backgroundColor: color }]}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export interface RadioButtonItemProps extends RadioButtonProps {
  label: ReactNode;
  description?: ReactNode;
  labelStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  position?: 'leading' | 'trailing';
}

export const RadioButtonItem: FC<RadioButtonItemProps> = (props) => {
  const {
    label,
    description,
    labelStyle,
    descriptionStyle,
    position = 'trailing',
    value,
    selected: explicitSelected,
    onPress,
    disabled: explicitDisabled,
    style,
    ...rest
  } = props;

  const group = useContext(RadioGroupContext);
  const isSelected =
    explicitSelected !== undefined
      ? explicitSelected
      : group && value !== undefined
      ? group.value === value
      : false;

  const disabled = explicitDisabled ?? group?.disabled ?? false;

  const handlePress = () => {
    if (disabled) return;
    if (onPress) {
      onPress();
    } else if (group && value !== undefined) {
      group.onValueChange?.(value);
    }
  };

  const radioElement = (
    <RadioButtonBase
      value={value}
      selected={isSelected}
      disabled={disabled}
      {...rest}
    />
  );

  return (
    <TouchableOpacity
      style={[
        radioButtonStyles.itemContainer,
        disabled && { opacity: 0.38 },
        style,
      ]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected, disabled }}
    >
      {position === 'leading' && (
        <View style={{ marginRight: 12 }}>{radioElement}</View>
      )}

      <View style={radioButtonStyles.itemContent}>
        {typeof label === 'string' ? (
          <Text style={[radioButtonStyles.label, labelStyle]}>{label}</Text>
        ) : (
          label
        )}
        {description ? (
          typeof description === 'string' ? (
            <Text style={[radioButtonStyles.description, descriptionStyle]}>
              {description}
            </Text>
          ) : (
            description
          )
        ) : null}
      </View>

      {position === 'trailing' && radioElement}
    </TouchableOpacity>
  );
};

export interface RadioButtonComponent extends FC<RadioButtonProps> {
  Item: typeof RadioButtonItem;
  Group: typeof RadioGroup;
}

export const RadioButton: RadioButtonComponent =
  RadioButtonBase as RadioButtonComponent;
RadioButton.Item = RadioButtonItem;
RadioButton.Group = RadioGroup;

export default RadioButton;
