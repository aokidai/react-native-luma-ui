import React, {
  type FC,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  TouchableWithoutFeedback,
  View,
  type ViewStyle,
} from 'react-native';
import { tooltipStyles } from '../../styles/tooltip/tooltip';

export interface TooltipProps {
  title: string;
  children: ReactNode;
  position?: 'top' | 'bottom';
  duration?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Tooltip: FC<TooltipProps> = (props) => {
  const {
    title,
    children,
    position = 'top',
    duration = 6000,
    style,
    textStyle,
  } = props;

  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const triggerRef = useRef<any>(null);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = () => {
    setVisible(true);
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      hideTooltip();
    }, duration);
  };

  const hideTooltip = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  const updateCoords = (callback?: () => void) => {
    if (triggerRef.current?.measureInWindow) {
      triggerRef.current.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          if (width > 0 && height > 0) {
            setCoords({ x, y, width, height });
          }
          callback?.();
        }
      );
    } else {
      callback?.();
    }
  };

  const handleTrigger = () => {
    updateCoords(() => {
      showTooltip();
    });
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const childElement = React.isValidElement(children)
    ? React.cloneElement(children as any, {
        onPress: (e: any) => {
          (children.props as any)?.onPress?.(e);
          handleTrigger();
        },
        onLongPress: (e: any) => {
          (children.props as any)?.onLongPress?.(e);
          handleTrigger();
        },
      })
    : children;

  const bubbleTop =
    position === 'top'
      ? Math.max(coords.y - 48, 40)
      : coords.y + Math.max(coords.height, 48) + 8;
  const bubbleLeft = Math.max(
    16,
    Math.min(SCREEN_WIDTH - 200, coords.x + coords.width / 2 - 70)
  );

  return (
    <View
      ref={triggerRef}
      collapsable={false}
      onLayout={() => updateCoords()}
      style={tooltipStyles.container}
    >
      <Pressable onPress={handleTrigger} onLongPress={handleTrigger}>
        {childElement}
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="none"
        statusBarTranslucent={true}
        onRequestClose={hideTooltip}
      >
        <TouchableWithoutFeedback onPress={hideTooltip}>
          <View style={StyleSheet.absoluteFillObject}>
            <Animated.View
              pointerEvents="none"
              style={[
                tooltipStyles.bubble,
                {
                  top: bubbleTop,
                  left: bubbleLeft,
                  opacity: opacityAnim,
                },
                style,
              ]}
            >
              <Text style={[tooltipStyles.text, textStyle]}>{title}</Text>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Tooltip;
