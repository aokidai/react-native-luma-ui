import React, {
  forwardRef,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  type StyleProp,
  Text,
  TextInput,
  type TextInputProps,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import { textFieldStyles } from '../../styles/textField/textField';
import { colorSystem } from '../../utils/colorSystem';

export type TextFieldMode = 'outlined' | 'filled';

export interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  mode?: TextFieldMode;
  helperText?: string;
  errorText?: string;
  error?: boolean;
  disabled?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  activeColor?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

const TextField = forwardRef<any, TextFieldProps>((props, ref) => {
  const {
    label,
    mode = 'outlined',
    helperText,
    errorText,
    error = !!errorText,
    disabled = false,
    leadingIcon,
    trailingIcon,
    activeColor = colorSystem.primary,
    value,
    defaultValue,
    placeholder,
    onFocus,
    onBlur,
    style,
    inputStyle,
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState(value ?? defaultValue ?? '');

  useEffect(() => {
    if (value !== undefined) {
      setText(value);
    }
  }, [value]);

  const hasValue = text.length > 0;
  const isFloating = isFocused || hasValue;

  const floatAnim = useRef(new Animated.Value(isFloating ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(floatAnim, {
      toValue: isFloating ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFloating, floatAnim]);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  // Label position calculations
  const labelTop = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: mode === 'outlined' ? [18, -10] : [18, 6],
  });

  const labelFontSize = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 12],
  });

  const labelLeft = leadingIcon ? 44 : 16;

  const activeBorderColor = error
    ? colorSystem.error
    : isFocused
    ? activeColor
    : mode === 'outlined'
    ? colorSystem.gray[400]
    : colorSystem.gray[500];

  return (
    <View
      style={[
        textFieldStyles.container,
        disabled && textFieldStyles.disabled,
        style,
      ]}
    >
      <View
        style={[
          textFieldStyles.inputWrapper,
          mode === 'outlined'
            ? textFieldStyles.outlined
            : textFieldStyles.filled,
          isFocused &&
            (mode === 'outlined'
              ? textFieldStyles.outlinedFocused
              : textFieldStyles.filledFocused),
          error &&
            (mode === 'outlined'
              ? textFieldStyles.outlinedError
              : textFieldStyles.filledError),
          { borderColor: activeBorderColor },
          mode === 'filled' && { borderBottomColor: activeBorderColor },
        ]}
      >
        {leadingIcon ? (
          <View style={textFieldStyles.leadingIcon}>{leadingIcon}</View>
        ) : null}

        {label ? (
          <Animated.Text
            style={[
              textFieldStyles.label,
              {
                top: labelTop,
                left: labelLeft,
                fontSize: labelFontSize,
                backgroundColor:
                  mode === 'outlined' && isFloating
                    ? colorSystem.background
                    : 'transparent',
                paddingHorizontal: mode === 'outlined' && isFloating ? 4 : 0,
              },
              isFocused && { color: activeColor },
              error && textFieldStyles.labelError,
            ]}
          >
            {label}
          </Animated.Text>
        ) : null}

        <TextInput
          ref={ref}
          value={text}
          onChangeText={(newText) => {
            setText(newText);
            props.onChangeText?.(newText);
          }}
          placeholder={isFocused || !label ? placeholder : undefined}
          placeholderTextColor={colorSystem.gray[500]}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            textFieldStyles.input,
            label ? textFieldStyles.inputWithFloatingLabel : undefined,
            inputStyle,
          ]}
          {...rest}
        />

        {trailingIcon ? (
          <View style={textFieldStyles.trailingIcon}>{trailingIcon}</View>
        ) : null}
      </View>

      {errorText || helperText ? (
        <Text
          style={[
            textFieldStyles.helperText,
            error && textFieldStyles.errorText,
          ]}
        >
          {errorText ?? helperText}
        </Text>
      ) : null}
    </View>
  );
});

export default TextField;
