import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useAppTheme from '../../../../../hooks/useAppTheme';

const {width} = Dimensions.get('window');
const BAR_WIDTH = width;

interface GradientLoadingBarProps {
  isLoading?: boolean;
  height?: number;
}

export const LumaProgressBar: React.FC<GradientLoadingBarProps> = ({
  isLoading = true,
  height = 3,
}) => {
  const themeColor = useAppTheme();
  const translateX = useRef(new Animated.Value(-BAR_WIDTH)).current;

  const covertThemeColor = themeColor.replaceAll('"', '');

  const alpha00 = `${covertThemeColor}00`;
  const alpha05 = `${covertThemeColor}05`;
  const alpha1A = `${covertThemeColor}1A`;
  const alpha4D = `${covertThemeColor}4D`;
  const alphaFF = covertThemeColor;

  const GRADIENT_COLORS = [
    alpha00 ?? '#235AC3',
    alpha05 ?? '#235AC3',
    alpha1A ?? '#235AC3',
    alpha4D ?? '#235AC3',
    alpha4D ?? '#235AC3',
    alphaFF ?? '#235AC3',
    alphaFF ?? '#235AC3',
    alpha1A ?? '#235AC3',
    alpha05 ?? '#235AC3',
    alpha00 ?? '#235AC3',
  ];

  const GRADIENT_LOCATIONS = [
    0.0, 0.15, 0.25, 0.35, 0.45, 0.5, 0.7, 0.85, 0.95, 1.0,
  ];

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(translateX, {
          toValue: width,
          duration: 1500,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      translateX.stopAnimation();
      translateX.setValue(-BAR_WIDTH);
    }
  }, [isLoading, translateX]);

  if (!isLoading) return <View style={{height}} />;

  return (
    <View style={[styles.container, {height}]}>
      <Animated.View
        style={[styles.animatedWrapper, {transform: [{translateX}]}]}>
        <LinearGradient
          colors={GRADIENT_COLORS}
          locations={GRADIENT_LOCATIONS}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    zIndex: 999,
  },
  animatedWrapper: {
    width: BAR_WIDTH,
    height: '100%',
  },
  gradient: {
    flex: 1,
    borderRadius: 10,
  },
});
