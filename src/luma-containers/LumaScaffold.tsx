import React, {FC, ReactNode} from 'react';
import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import {appColors} from '../../../../../constants/appColors';
import {StyleProp, ViewStyle} from 'react-native';
import Svg, {Defs, RadialGradient, Stop, Rect} from 'react-native-svg';
import {systemColorSelector} from '../../../../../redux/system/systemColor';
import {useSelector} from 'react-redux';
import {SystemUtils} from '../../../../../utils/system';
import {gradientOpacitySliderSelector} from '../../../../../redux/system/gradientOpacitySlider';

interface Props {
  appBar?: ReactNode;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  barStyle?: 'light-content' | 'dark-content';
  customBackground?: string;
}

const LumaScaffold: FC<Props> = props => {
  const {
    appBar,
    children,
    style,
    barStyle = 'dark-content',
    customBackground,
  } = props;
  const selectedColorSelector = useSelector(systemColorSelector);
  const gradientOpacitySlider = useSelector(gradientOpacitySliderSelector);

  const softCornerGlow = () => {
    if (!selectedColorSelector.secondary) {
      return null;
    }

    return (
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            overflow: 'hidden',
            height: Dimensions.get('window').height,
          },
        ]}
        pointerEvents="none">
        <Svg height="100%" width="100%">
          <Defs>
            <RadialGradient
              id="scaffoldCornerGlow"
              cx="0.5"
              cy="0"
              rx="1.5"
              ry="0.6"
              fx="0.4"
              fy="0"
              gradientUnits="objectBoundingBox">
              <Stop
                offset="0%"
                stopColor={selectedColorSelector.primary}
                stopOpacity={gradientOpacitySlider}
              />
              <Stop
                offset="100%"
                stopColor={selectedColorSelector.secondary}
                stopOpacity={gradientOpacitySlider}
              />
            </RadialGradient>
          </Defs>
          <Rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#scaffoldCornerGlow)"
          />
        </Svg>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={barStyle}
        translucent
        backgroundColor="transparent"
      />
      {appBar && appBar}
      <View
        style={[
          styles.body,
          !selectedColorSelector.secondary && {
            backgroundColor: selectedColorSelector.primary,
          },
          customBackground && {backgroundColor: customBackground},
          style,
        ]}>
        {children}
      </View>
      {selectedColorSelector.secondary && softCornerGlow()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    zIndex: 1,
    elevation: 1,
  },
});

export default LumaScaffold;
