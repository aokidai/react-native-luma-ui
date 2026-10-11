import React, {
  type FC,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  type StyleProp,
  Text,
  TextInput,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { searchBarStyles } from '../../styles/searchBar/searchBar';
import { colorSystem } from '../../utils/colorSystem';
import { useTheme } from '../../utils/theme';

export interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  allowClear?: boolean;
  debounceTime?: number;
  height?: number;
  flex?: number;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  renderLeftIcon?: () => ReactNode;
  renderRightIcon?: () => ReactNode;
  autoFocus?: boolean;
  editable?: boolean;
}

const SearchBar: FC<SearchBarProps> = (props) => {
  const { isDark, colors } = useTheme();
  const {
    value: controlledValue,
    onChangeText,
    placeholder = 'Search',
    placeholderTextColor,
    backgroundColor,
    borderColor,
    allowClear = true,
    debounceTime = 200,
    height,
    flex,
    style,
    inputStyle,
    onPress,
    renderLeftIcon,
    renderRightIcon,
    autoFocus = false,
    editable = true,
  } = props;

  const [text, setText] = useState(controlledValue ?? '');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setText(controlledValue);
    }
  }, [controlledValue]);

  const handleChangeText = useCallback(
    (newText: string) => {
      setText(newText);
      if (onChangeText) {
        if (debounceTime > 0) {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          timerRef.current = setTimeout(() => {
            onChangeText(newText);
          }, debounceTime);
        } else {
          onChangeText(newText);
        }
      }
    },
    [debounceTime, onChangeText]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const containerStyle: StyleProp<ViewStyle> = [
    searchBarStyles.container,
    isDark && {
      backgroundColor: colors.surfaceContainerHigh,
      borderColor: colors.outlineVariant,
    },
    flex !== undefined ? { flex } : undefined,
    backgroundColor ? { backgroundColor } : undefined,
    borderColor ? { borderColor } : undefined,
    height !== undefined ? { height } : undefined,
    style,
  ];

  const resolvedPlaceholderTextColor =
    placeholderTextColor ??
    (isDark ? colors.onSurfaceVariant : colorSystem.gray[500]);

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={containerStyle}
      >
        {renderLeftIcon && renderLeftIcon()}
        <Text
          style={[
            searchBarStyles.placeholderText,
            isDark && { color: colors.onSurfaceVariant },
          ]}
          numberOfLines={1}
        >
          {text || placeholder}
        </Text>
        {renderRightIcon && renderRightIcon()}
      </TouchableOpacity>
    );
  }

  return (
    <View style={containerStyle}>
      {renderLeftIcon && renderLeftIcon()}
      <TextInput
        value={text}
        placeholder={placeholder}
        placeholderTextColor={resolvedPlaceholderTextColor}
        onChangeText={handleChangeText}
        clearButtonMode={allowClear ? 'while-editing' : 'never'}
        autoFocus={autoFocus}
        editable={editable}
        style={[
          searchBarStyles.textInput,
          isDark && { color: colors.onSurface },
          inputStyle,
        ]}
      />
      {renderRightIcon && renderRightIcon()}
    </View>
  );
};

export default SearchBar;
