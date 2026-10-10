import React, { type FC, useEffect, useRef } from 'react';
import { Animated, type StyleProp, View, type ViewStyle } from 'react-native';
import { progressBarStyles } from '../../styles/progressBar/progressBar';
import { colorSystem } from '../../utils/colorSystem';

export interface ProgressBarProps {
  progress?: number; // 0 to 1
  indeterminate?: boolean;
  color?: string;
  trackColor?: string;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

const ProgressBar: FC<ProgressBarProps> = (props) => {
  const {
    progress,
    indeterminate = progress === undefined,
    color = colorSystem.primary,
    trackColor,
    height = 4,
    borderRadius = 2,
    style,
  } = props;

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (indeterminate) {
      animatedValue.setValue(0);
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    } else {
      Animated.timing(animatedValue, {
        toValue: Math.min(Math.max(progress ?? 0, 0), 1),
        duration: 300,
        useNativeDriver: false,
      }).start();
      return undefined;
    }
  }, [indeterminate, progress, animatedValue]);

  const indicatorWidth = indeterminate
    ? animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0%', '70%', '100%'],
      })
    : animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
      });

  const indicatorLeft = indeterminate
    ? animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0%', '30%', '100%'],
      })
    : 0;

  return (
    <View
      style={[
        progressBarStyles.container,
        { height, borderRadius },
        trackColor ? { backgroundColor: trackColor } : undefined,
        style,
      ]}
    >
      <Animated.View
        style={[
          progressBarStyles.indicator,
          {
            backgroundColor: color,
            borderRadius,
            width: indicatorWidth,
            left: indicatorLeft,
          },
        ]}
      />
    </View>
  );
};

export default ProgressBar;
