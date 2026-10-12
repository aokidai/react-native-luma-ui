import React, { type FC, useRef, useState } from 'react';
import {
  PanResponder,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';
import { sliderStyles } from '../../styles/slider/slider';
import { colorSystem } from '../../utils/colorSystem';

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  color?: string;
  trackColor?: string;
  style?: StyleProp<ViewStyle>;
}

const Slider: FC<SliderProps> = (props) => {
  const {
    value: controlledValue,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    onValueChange,
    disabled = false,
    color = colorSystem.primary,
    trackColor = colorSystem.gray[200],
    style,
  } = props;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const [trackWidth, setTrackWidth] = useState(0);

  const currentValue =
    controlledValue !== undefined ? controlledValue : internalValue;
  const clampedValue = Math.min(Math.max(currentValue, min), max);

  const currentValueRef = useRef(clampedValue);
  currentValueRef.current = clampedValue;

  const onValueChangeRef = useRef(onValueChange);
  onValueChangeRef.current = onValueChange;

  const minRef = useRef(min);
  minRef.current = min;

  const maxRef = useRef(max);
  maxRef.current = max;

  const stepRef = useRef(step);
  stepRef.current = step;

  const disabledRef = useRef(disabled);
  disabledRef.current = disabled;

  const controlledValueRef = useRef(controlledValue);
  controlledValueRef.current = controlledValue;

  const trackWidthRef = useRef(0);
  const startXRef = useRef(0);

  const clampValue = (val: number) => {
    const curMin = minRef.current;
    const curMax = maxRef.current;
    const curStep = stepRef.current;
    let rounded = Math.round((val - curMin) / curStep) * curStep + curMin;
    return Math.min(Math.max(rounded, curMin), curMax);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabledRef.current,
      onStartShouldSetPanResponderCapture: () => !disabledRef.current,
      onMoveShouldSetPanResponder: () => !disabledRef.current,
      onMoveShouldSetPanResponderCapture: () => !disabledRef.current,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (evt) => {
        const width = trackWidthRef.current;
        if (width <= 0) return;
        const curMin = minRef.current;
        const curMax = maxRef.current;
        const touchX = Math.max(0, Math.min(width, evt.nativeEvent.locationX));
        startXRef.current = touchX;
        const ratio = touchX / width;
        const newVal = clampValue(curMin + ratio * (curMax - curMin));
        if (controlledValueRef.current === undefined) {
          setInternalValue(newVal);
        }
        onValueChangeRef.current?.(newVal);
      },
      onPanResponderMove: (_, gestureState) => {
        const width = trackWidthRef.current;
        if (width <= 0) return;
        const curMin = minRef.current;
        const curMax = maxRef.current;
        const currentX = Math.max(
          0,
          Math.min(width, startXRef.current + gestureState.dx)
        );
        const ratio = currentX / width;
        const newVal = clampValue(curMin + ratio * (curMax - curMin));
        if (controlledValueRef.current === undefined) {
          setInternalValue(newVal);
        }
        onValueChangeRef.current?.(newVal);
      },
    })
  ).current;

  const progressPercent =
    max > min ? ((clampedValue - min) / (max - min)) * 100 : 0;

  const thumbSize = 20;
  const thumbLeft =
    trackWidth > thumbSize
      ? (progressPercent / 100) * (trackWidth - thumbSize)
      : 0;

  return (
    <View
      style={[sliderStyles.container, disabled && { opacity: 0.38 }, style]}
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        if (w > 0) {
          setTrackWidth(w);
          trackWidthRef.current = w;
        }
      }}
      {...panResponder.panHandlers}
    >
      <View
        pointerEvents="none"
        style={[
          sliderStyles.track,
          trackColor ? { backgroundColor: trackColor } : undefined,
        ]}
      >
        <View
          style={[
            sliderStyles.activeTrack,
            { width: `${progressPercent}%`, backgroundColor: color },
          ]}
        />
      </View>

      <View
        pointerEvents="none"
        style={[
          sliderStyles.thumb,
          {
            left: thumbLeft,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
};

export default Slider;
