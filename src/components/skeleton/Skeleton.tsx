import React, { type FC, useEffect, useRef } from 'react';
import {
  Animated,
  type DimensionValue,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';
import { skeletonStyles } from '../../styles/skeleton/skeleton';
import { colorSystem } from '../../utils/colorSystem';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  circle?: boolean;
  color?: string;
  lines?: number;
  style?: StyleProp<ViewStyle>;
}

const Skeleton: FC<SkeletonProps> = (props) => {
  const {
    width = '100%',
    height = 16,
    borderRadius = 4,
    circle = false,
    color = colorSystem.gray[200],
    lines,
    style,
  } = props;

  const opacityAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.9,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacityAnim]);

  if (lines && lines > 1) {
    return (
      <View style={skeletonStyles.linesContainer}>
        {Array.from({ length: lines }).map((_, index) => {
          const lineWidth: DimensionValue = index === lines - 1 ? '60%' : width;
          return (
            <Animated.View
              key={index}
              style={[
                skeletonStyles.skeleton,
                {
                  width: lineWidth,
                  height,
                  borderRadius,
                  backgroundColor: color,
                  opacity: opacityAnim,
                },
                style,
              ]}
            />
          );
        })}
      </View>
    );
  }

  const computedBorderRadius = circle
    ? typeof height === 'number'
      ? height / 2
      : 50
    : borderRadius;

  return (
    <Animated.View
      style={[
        skeletonStyles.skeleton,
        {
          width: circle ? height : width,
          height,
          borderRadius: computedBorderRadius,
          backgroundColor: color,
          opacity: opacityAnim,
        },
        style,
      ]}
    />
  );
};

export default Skeleton;
