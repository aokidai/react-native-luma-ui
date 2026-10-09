import React, { useState, type FC, type ReactNode } from 'react';
import {
  type StyleProp,
  Text,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { checkboxStyles } from '../../styles/checkbox/checkbox';
import { colorSystem } from '../../utils/colorSystem';

export type CheckboxStatus = 'checked' | 'unchecked' | 'indeterminate';
export type CheckboxShape = 'square' | 'circle';
export type CheckboxLabelPosition = 'left' | 'right';
export type CheckboxItemPosition = 'leading' | 'trailing';

export interface CheckboxRenderIconProps {
  status: CheckboxStatus;
  checked: boolean;
  color: string;
  size: number;
  disabled: boolean;
}

export interface CheckboxBaseProps {
  /**
   * Explicit status of the checkbox.
   */
  status?: CheckboxStatus;
  /**
   * Whether the checkbox is checked (convenient boolean alternative to status).
   */
  checked?: boolean;
  /**
   * Initial checked state for uncontrolled usage.
   */
  defaultChecked?: boolean;
  /**
   * Whether the checkbox is in an indeterminate state.
   */
  indeterminate?: boolean;
  /**
   * Callback invoked when checked state changes.
   */
  onValueChange?: (checked: boolean) => void;
  /**
   * Callback invoked on press.
   */
  onPress?: () => void;
  /**
   * Text label or custom ReactNode displayed next to the checkbox.
   */
  label?: ReactNode;
  /**
   * Optional helper or description text displayed below the label.
   */
  description?: ReactNode;
  /**
   * Shape of the checkbox ('square' | 'circle'). Default: 'square'.
   */
  shape?: CheckboxShape;
  /**
   * Color when checked or indeterminate. Default: `colorSystem.primary`.
   */
  color?: string;
  /**
   * Color when unchecked. Default: `colorSystem.gray[600]`.
   */
  uncheckedColor?: string;
  /**
   * Color when disabled. Default: `colorSystem.gray[400]`.
   */
  disabledColor?: string;
  /**
   * Size of the checkbox icon in pixels. Default: 24.
   */
  size?: number;
  /**
   * Whether the checkbox is disabled. Default: false.
   */
  disabled?: boolean;
  /**
   * Custom style for the root container.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Custom style for the checkbox icon wrapper.
   */
  checkboxStyle?: StyleProp<ViewStyle>;
  /**
   * Custom style for the label text.
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Custom style for the description text.
   */
  descriptionStyle?: StyleProp<TextStyle>;
  /**
   * Custom icon renderer function.
   */
  renderIcon?: (props: CheckboxRenderIconProps) => ReactNode;
  /**
   * Custom children to render inside the label container.
   */
  children?: ReactNode;
  /**
   * Active opacity when touched. Default: 0.7.
   */
  activeOpacity?: number;
  /**
   * Accessibility label.
   */
  accessibilityLabel?: string;
  /**
   * Test ID for testing.
   */
  testID?: string;
}

export interface CheckboxProps extends CheckboxBaseProps {
  /**
   * Position of the label relative to the checkbox ('left' | 'right'). Default: 'right'.
   */
  labelPosition?: CheckboxLabelPosition;
}

export interface CheckboxItemProps extends CheckboxBaseProps {
  /**
   * Position of the checkbox icon within the item row ('leading' | 'trailing'). Default: 'trailing'.
   */
  position?: CheckboxItemPosition;
}

const getIconName = (status: CheckboxStatus, shape: CheckboxShape): string => {
  if (shape === 'circle') {
    if (status === 'checked') return 'checkbox-marked-circle';
    if (status === 'indeterminate') return 'minus-circle';
    return 'checkbox-blank-circle-outline';
  }
  if (status === 'checked') return 'checkbox-marked';
  if (status === 'indeterminate') return 'minus-box';
  return 'checkbox-blank-outline';
};

const useCheckboxState = ({
  status,
  checked,
  defaultChecked,
  indeterminate,
  disabled,
  onValueChange,
  onPress,
}: {
  status?: CheckboxStatus;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onValueChange?: (checked: boolean) => void;
  onPress?: () => void;
}) => {
  const isControlled = status !== undefined || checked !== undefined;
  const [internalChecked, setInternalChecked] = useState<boolean>(
    defaultChecked ?? false
  );

  const currentStatus: CheckboxStatus = (() => {
    if (status !== undefined) return status;
    if (indeterminate) return 'indeterminate';
    if (checked !== undefined) return checked ? 'checked' : 'unchecked';
    return internalChecked ? 'checked' : 'unchecked';
  })();

  const isChecked = currentStatus === 'checked';

  const handlePress = () => {
    if (disabled) return;
    const nextChecked = currentStatus !== 'checked';
    if (!isControlled) {
      setInternalChecked(nextChecked);
    }
    onValueChange?.(nextChecked);
    onPress?.();
  };

  return {
    status: currentStatus,
    isChecked,
    handlePress,
  };
};

const renderIconElement = ({
  status,
  shape,
  color,
  uncheckedColor,
  disabledColor,
  size,
  disabled,
  checkboxStyle,
  renderIcon,
}: {
  status: CheckboxStatus;
  shape: CheckboxShape;
  color?: string;
  uncheckedColor?: string;
  disabledColor?: string;
  size: number;
  disabled: boolean;
  checkboxStyle?: StyleProp<ViewStyle>;
  renderIcon?: (props: CheckboxRenderIconProps) => ReactNode;
}) => {
  const isChecked = status === 'checked';
  const iconColor = disabled
    ? disabledColor ?? colorSystem.gray[400]
    : status === 'checked' || status === 'indeterminate'
    ? color ?? colorSystem.primary
    : uncheckedColor ?? colorSystem.gray[600];

  const iconNode = renderIcon ? (
    renderIcon({
      status,
      checked: isChecked,
      color: iconColor,
      size,
      disabled,
    })
  ) : (
    <MaterialCommunityIcons
      name={getIconName(status, shape)}
      size={size}
      color={iconColor}
    />
  );

  return (
    <View style={[checkboxStyles.checkboxWrapper, checkboxStyle]}>
      {iconNode}
    </View>
  );
};

export const CheckboxItem: FC<CheckboxItemProps> = (props) => {
  const {
    status,
    checked,
    defaultChecked,
    indeterminate = false,
    onValueChange,
    onPress,
    label,
    description,
    position = 'trailing',
    shape = 'square',
    color = colorSystem.primary,
    uncheckedColor = colorSystem.gray[600],
    disabledColor = colorSystem.gray[400],
    size = 24,
    disabled = false,
    style,
    checkboxStyle,
    labelStyle,
    descriptionStyle,
    renderIcon,
    children,
    activeOpacity = 0.7,
    accessibilityLabel,
    testID,
  } = props;

  const {
    status: currentStatus,
    isChecked,
    handlePress,
  } = useCheckboxState({
    status,
    checked,
    defaultChecked,
    indeterminate,
    disabled,
    onValueChange,
    onPress,
  });

  const iconElement = renderIconElement({
    status: currentStatus,
    shape,
    color,
    uncheckedColor,
    disabledColor,
    size,
    disabled,
    checkboxStyle,
    renderIcon,
  });

  const hasContent =
    label !== undefined || description !== undefined || children !== undefined;

  return (
    <TouchableOpacity
      testID={testID}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      accessibilityRole="checkbox"
      accessibilityState={{
        checked: currentStatus === 'indeterminate' ? 'mixed' : isChecked,
        disabled,
      }}
      accessibilityLabel={
        accessibilityLabel ?? (typeof label === 'string' ? label : undefined)
      }
      style={[
        checkboxStyles.itemContainer,
        disabled && checkboxStyles.containerDisabled,
        style,
      ]}
    >
      {position === 'leading' && iconElement}
      {hasContent && (
        <View
          style={[
            checkboxStyles.itemContent,
            position === 'leading'
              ? checkboxStyles.itemContentLeading
              : checkboxStyles.itemContentTrailing,
          ]}
        >
          {typeof label === 'string' ? (
            <Text
              style={[
                checkboxStyles.label,
                disabled && checkboxStyles.labelDisabled,
                labelStyle,
              ]}
            >
              {label}
            </Text>
          ) : (
            label
          )}
          {typeof description === 'string' ? (
            <Text
              style={[
                checkboxStyles.description,
                disabled && checkboxStyles.descriptionDisabled,
                descriptionStyle,
              ]}
            >
              {description}
            </Text>
          ) : (
            description
          )}
          {children}
        </View>
      )}
      {position === 'trailing' && iconElement}
    </TouchableOpacity>
  );
};

export interface CheckboxComponent extends FC<CheckboxProps> {
  Item: FC<CheckboxItemProps>;
}

const CheckboxBase: FC<CheckboxProps> = (props) => {
  const {
    status,
    checked,
    defaultChecked,
    indeterminate = false,
    onValueChange,
    onPress,
    label,
    description,
    labelPosition = 'right',
    shape = 'square',
    color = colorSystem.primary,
    uncheckedColor = colorSystem.gray[600],
    disabledColor = colorSystem.gray[400],
    size = 24,
    disabled = false,
    style,
    checkboxStyle,
    labelStyle,
    descriptionStyle,
    renderIcon,
    children,
    activeOpacity = 0.7,
    accessibilityLabel,
    testID,
  } = props;

  const {
    status: currentStatus,
    isChecked,
    handlePress,
  } = useCheckboxState({
    status,
    checked,
    defaultChecked,
    indeterminate,
    disabled,
    onValueChange,
    onPress,
  });

  const iconElement = renderIconElement({
    status: currentStatus,
    shape,
    color,
    uncheckedColor,
    disabledColor,
    size,
    disabled,
    checkboxStyle,
    renderIcon,
  });

  const hasLabelContent =
    label !== undefined || description !== undefined || children !== undefined;

  const labelNode = hasLabelContent ? (
    <View
      style={
        labelPosition === 'left'
          ? checkboxStyles.labelContainerLeft
          : checkboxStyles.labelContainer
      }
    >
      {typeof label === 'string' ? (
        <Text
          style={[
            checkboxStyles.label,
            disabled && checkboxStyles.labelDisabled,
            labelStyle,
          ]}
        >
          {label}
        </Text>
      ) : (
        label
      )}
      {typeof description === 'string' ? (
        <Text
          style={[
            checkboxStyles.description,
            disabled && checkboxStyles.descriptionDisabled,
            descriptionStyle,
          ]}
        >
          {description}
        </Text>
      ) : (
        description
      )}
      {children}
    </View>
  ) : null;

  return (
    <TouchableOpacity
      testID={testID}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      accessibilityRole="checkbox"
      accessibilityState={{
        checked: currentStatus === 'indeterminate' ? 'mixed' : isChecked,
        disabled,
      }}
      accessibilityLabel={
        accessibilityLabel ?? (typeof label === 'string' ? label : undefined)
      }
      style={[
        checkboxStyles.container,
        disabled && checkboxStyles.containerDisabled,
        style,
      ]}
    >
      {labelPosition === 'left' && labelNode}
      {iconElement}
      {labelPosition === 'right' && labelNode}
    </TouchableOpacity>
  );
};

export const Checkbox: CheckboxComponent = CheckboxBase as CheckboxComponent;
Checkbox.Item = CheckboxItem;

export default Checkbox;
