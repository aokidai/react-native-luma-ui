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
  ScrollView,
  type StyleProp,
  TouchableWithoutFeedback,
  View,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { drawerStyles } from '../../styles/drawer/drawer';
import DrawerItem from './DrawerItem';
import DrawerSection from './DrawerSection';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DEFAULT_DRAWER_WIDTH = Math.min(Math.round(SCREEN_WIDTH * 0.78), 320);

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  width?: number;
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  dismissable?: boolean;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

interface DrawerComponent extends FC<DrawerProps> {
  Item: typeof DrawerItem;
  Section: typeof DrawerSection;
}

const Drawer: DrawerComponent = (props) => {
  const {
    open,
    onClose,
    position = 'left',
    width = DEFAULT_DRAWER_WIDTH,
    children,
    header,
    footer,
    dismissable = true,
    backgroundColor,
    style,
  } = props;

  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(open);

  if (open && !modalVisible) {
    setModalVisible(true);
  }

  const initialTranslate = position === 'left' ? -width : width;
  const slideAnim = useRef(new Animated.Value(initialTranslate)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      if (!open) {
        return;
      }
    }

    if (open) {
      slideAnim.stopAnimation();
      opacityAnim.stopAnimation();
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      slideAnim.stopAnimation();
      opacityAnim.stopAnimation();
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: position === 'left' ? -width : width,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start((result) => {
        if (result.finished) {
          setModalVisible(false);
        }
      });
    }
  }, [open, width, position, slideAnim, opacityAnim]);

  const handleDismiss = () => {
    if (dismissable) {
      onClose();
    }
  };

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      statusBarTranslucent={true}
      onRequestClose={handleDismiss}
    >
      <View style={{ flex: 1 }}>
        {/* Backdrop */}
        <TouchableWithoutFeedback onPress={handleDismiss}>
          <Animated.View
            style={[drawerStyles.backdrop, { opacity: opacityAnim }]}
          />
        </TouchableWithoutFeedback>

        {/* Drawer Container */}
        <Animated.View
          style={[
            drawerStyles.drawer,
            {
              width,
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              transform: [{ translateX: slideAnim }],
            },
            position === 'left' ? { left: 0 } : { right: 0 },
            backgroundColor ? { backgroundColor } : undefined,
            style,
          ]}
        >
          {header ? <View style={drawerStyles.header}>{header}</View> : null}

          <ScrollView
            style={drawerStyles.content}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>

          {footer ? <View style={drawerStyles.footer}>{footer}</View> : null}
        </Animated.View>
      </View>
    </Modal>
  );
};

Drawer.Item = DrawerItem;
Drawer.Section = DrawerSection;

export default Drawer;
