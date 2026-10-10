import React, { type FC, type ReactNode } from 'react';
import {
  type DimensionValue,
  KeyboardAvoidingView,
  Modal,
  Platform,
  type StyleProp,
  Text,
  type TextStyle,
  TouchableWithoutFeedback,
  View,
  type ViewStyle,
} from 'react-native';
import { dialogStyles } from '../../styles/dialog/dialog';

export interface DialogProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
  dismissable?: boolean;
  width?: DimensionValue;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const Dialog: FC<DialogProps> = (props) => {
  const {
    visible,
    onClose,
    title,
    children,
    footer,
    dismissable = true,
    width,
    style,
    contentStyle,
    titleStyle,
  } = props;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={dismissable ? onClose : undefined}
    >
      <TouchableWithoutFeedback onPress={dismissable ? onClose : undefined}>
        <View style={dialogStyles.backdrop}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ width: '100%', alignItems: 'center' }}
          >
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View
                style={[
                  dialogStyles.dialog,
                  width !== undefined ? { width, maxWidth: width } : undefined,
                  style,
                ]}
              >
                {title ? (
                  <Text style={[dialogStyles.title, titleStyle]}>{title}</Text>
                ) : null}

                <View style={[dialogStyles.content, contentStyle]}>
                  {children}
                </View>

                {footer ? (
                  <View style={dialogStyles.footer}>{footer}</View>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Dialog;
