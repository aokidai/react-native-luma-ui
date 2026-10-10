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
  const {
    size = 'small',
    color = colorSystem.primary,
    label,
    fullScreen = false,
    overlay = false,
    style,
    labelStyle,
  } = props;

  return (
    <View
      style={[
        loadingStyles.container,
        fullScreen && loadingStyles.fullScreen,
        overlay && loadingStyles.overlay,
        style,
      ]}
    >
      <ActivityIndicator size={size} color={color} />
      {label ? (
        <Text style={[loadingStyles.label, labelStyle]}>{label}</Text>
      ) : null}
    </View>
  );
};

export default Loading;
