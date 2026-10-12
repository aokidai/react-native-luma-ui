import React, { type FC } from 'react';
import {
  ActivityIndicator,
  type StyleProp,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import { loadingStyles } from '../../styles/loading/loading';
import { colorSystem } from '../../utils/colorSystem';
import { useTheme } from '../../utils/theme';

export interface LoadingProps {
  size?: number | 'small' | 'large';
  color?: string;
  label?: string;
  fullScreen?: boolean;
  overlay?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const Loading: FC<LoadingProps> = (props) => {
  const { isDark, colors } = useTheme();
  const {
    size = 'small',
    color,
    label,
    fullScreen = false,
    overlay = false,
    style,
    labelStyle,
  } = props;

  const resolvedColor =
    color ?? (isDark ? colors.primary : colorSystem.primary);

  return (
    <View
      style={[
        loadingStyles.container,
        fullScreen && loadingStyles.fullScreen,
        overlay && loadingStyles.overlay,
        style,
      ]}
    >
      <ActivityIndicator size={size} color={resolvedColor} />
      {label ? (
        <Text
          style={[
            loadingStyles.label,
            isDark && { color: colors.onSurface },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      ) : null}
    </View>
  );
};

export default Loading;
