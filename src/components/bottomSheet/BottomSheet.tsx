import React, {
  type FC,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  type StyleProp,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { bottomSheetStyles } from '../../styles/bottomSheet/bottomSheet';
import { colorSystem } from '../../utils/colorSystem';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const SheetCloseIcon: FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = colorSystem.gray[600],
}) => {
  const barLength = size * 0.6;
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          position: 'absolute',
          width: barLength,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
          transform: [{ rotate: '45deg' }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: barLength,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
          transform: [{ rotate: '-45deg' }],
        }}
      />
    </View>
  );
};

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  showDragHandle?: boolean;
  showCloseButton?: boolean;
  renderHeader?: () => ReactNode;
  renderFooter?: () => ReactNode;
  renderCloseIcon?: () => ReactNode;
  closeOnBackdropPress?: boolean;
  closeOnDragDown?: boolean;
  dismissable?: boolean;
  statusBarTranslucent?: boolean;
  height?: number | `${number}%`;
  maxHeight?: number | `${number}%`;
  minHeight?: number | `${number}%`;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  backdropStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const BottomSheet: FC<BottomSheetProps> = (props) => {
  const {
    visible,
    onClose,
    title,
    showDragHandle = true,
    showCloseButton = true,
    renderHeader,
    renderFooter,
    renderCloseIcon,
    closeOnBackdropPress = true,
    closeOnDragDown = true,
    dismissable = true,
    statusBarTranslucent = true,
    height,
    maxHeight,
    minHeight,
    style,
    contentStyle,
    backdropStyle,
    children,
  } = props;

  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(visible);
  const [sheetContentHeight, setSheetContentHeight] = useState(
    SCREEN_HEIGHT * 0.5
  );

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const animateIn = useCallback(() => {
    translateY.setValue(sheetContentHeight);
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        damping: 24,
        mass: 0.8,
        stiffness: 220,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [backdropOpacity, sheetContentHeight, translateY]);

  const animateOut = useCallback(
    (callback?: () => void) => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: sheetContentHeight || SCREEN_HEIGHT * 0.6,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          setModalVisible(false);
          callback ? callback() : onCloseRef.current();
        }
      });
    },
    [backdropOpacity, sheetContentHeight, translateY]
  );

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
    } else if (modalVisible) {
      animateOut();
    }
  }, [visible, modalVisible, animateOut]);

  useEffect(() => {
    if (modalVisible && visible) {
      animateIn();
    }
  }, [modalVisible, visible, animateIn]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => closeOnDragDown && dismissable,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        closeOnDragDown && dismissable && gestureState.dy > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.7) {
          animateOut();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            damping: 22,
            stiffness: 250,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const handleBackdropPress = () => {
    if (closeOnBackdropPress && dismissable) {
      animateOut();
    }
  };

  const handleCloseButtonPress = () => {
    if (dismissable) {
      animateOut();
    }
  };

  const hasHeader = renderHeader || title || showCloseButton;

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      statusBarTranslucent={statusBarTranslucent}
      onRequestClose={() => {
        if (dismissable) animateOut();
      }}
    >
      <View style={bottomSheetStyles.modalOverlay}>
        {/* Animated Backdrop */}
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <Animated.View
            style={[
              bottomSheetStyles.backdrop,
              { opacity: backdropOpacity },
              backdropStyle,
            ]}
          />
        </TouchableWithoutFeedback>

        {/* Animated Sheet */}
        <Animated.View
          style={[
            bottomSheetStyles.sheetContainer,
            {
              transform: [{ translateY }],
              paddingBottom: Math.max(insets.bottom, 16),
            },
            height !== undefined ? { height } : undefined,
            maxHeight !== undefined ? { maxHeight } : undefined,
            minHeight !== undefined ? { minHeight } : undefined,
            style,
          ]}
          onLayout={(e) => {
            const h = e.nativeEvent.layout.height;
            if (h > 0) setSheetContentHeight(h);
          }}
        >
          {/* Drag Handle */}
          {showDragHandle && (
            <View
              {...panResponder.panHandlers}
              style={bottomSheetStyles.handleArea}
            >
              <View style={bottomSheetStyles.handleBar} />
            </View>
          )}

          {/* Header */}
          {hasHeader && (
            <View style={bottomSheetStyles.header}>
              {renderHeader ? (
                renderHeader()
              ) : (
                <>
                  {title ? (
                    <Text style={bottomSheetStyles.title} numberOfLines={1}>
                      {title}
                    </Text>
                  ) : (
                    <View style={{ flex: 1 }} />
                  )}
                  {showCloseButton && (
                    <TouchableOpacity
                      onPress={handleCloseButtonPress}
                      style={bottomSheetStyles.closeButton}
                      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                      activeOpacity={0.6}
                    >
                      {renderCloseIcon ? (
                        renderCloseIcon()
                      ) : (
                        <SheetCloseIcon
                          size={20}
                          color={colorSystem.gray[600]}
                        />
                      )}
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          )}

          {/* Content */}
          <View style={[bottomSheetStyles.content, contentStyle]}>
            {children}
          </View>

          {/* Footer */}
          {renderFooter && (
            <View style={bottomSheetStyles.footer}>{renderFooter()}</View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BottomSheet;
