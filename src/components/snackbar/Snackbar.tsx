import React, {
  type FC,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  type StyleProp,
  Text,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { snackbarStyles } from '../../styles/snackbar/snackbar';

export interface SnackbarAction {
  label: string;
  onPress: () => void;
  color?: string;
}

export interface SnackbarProps {
  visible: boolean;
  onDismiss: () => void;
  children: ReactNode;
  duration?: number; // ms
  action?: SnackbarAction;
  icon?: ReactNode;
  bottom?: number;
  style?: StyleProp<ViewStyle>;
}

export const DURATION_SHORT = 2000;
export const DURATION_MEDIUM = 4000;
export const DURATION_LONG = 7000;

const Snackbar: FC<SnackbarProps> = (props) => {
  const {
    visible,
    onDismiss,
    children,
    duration = DURATION_MEDIUM,
    action,
    icon,
    bottom,
    style,
  } = props;

  const insets = useSafeAreaInsets();
  const computedBottom = bottom ?? Math.max(insets.bottom + 12, 16);

  const [rendered, setRendered] = useState(visible);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      if (duration > 0 && duration !== Infinity) {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          onDismiss();
        }, duration);
      }
    } else {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 20,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setRendered(false);
      });
      if (timerRef.current) clearTimeout(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, duration, onDismiss, opacityAnim, translateYAnim]);

  if (!rendered) return null;

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[
        snackbarStyles.container,
        {
          bottom: computedBottom,
          opacity: opacityAnim,
          transform: [{ translateY: translateYAnim }],
        },
        style,
      ]}
    >
      <View style={snackbarStyles.content}>
        <View style={snackbarStyles.messageRow}>
          {icon ? <View>{icon}</View> : null}
          {typeof children === 'string' ? (
            <Text style={snackbarStyles.message}>{children}</Text>
          ) : (
            children
          )}
        </View>

        {action ? (
          <TouchableOpacity
            style={snackbarStyles.actionButton}
            onPress={() => {
              action.onPress();
              onDismiss();
            }}
            activeOpacity={0.7}
          >
            <Text
              style={[
                snackbarStyles.actionLabel,
                action.color ? { color: action.color } : undefined,
              ]}
            >
              {action.label}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </Animated.View>
  );
};

export default Snackbar;
