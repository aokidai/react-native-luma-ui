import React, { type FC, type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import BottomSheet from '../bottomSheet/BottomSheet';

export interface BottomAlertProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  dismissable?: boolean;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  showDragHandle?: boolean;
}

const BottomAlert: FC<BottomAlertProps> = (props) => {
  const {
    visible,
    onClose,
    children,
    dismissable = true,
    style,
    backgroundColor,
    showDragHandle = true,
  } = props;

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      dismissable={dismissable}
      showCloseButton={false}
      showDragHandle={showDragHandle}
      style={[backgroundColor ? { backgroundColor } : undefined, style]}
    >
      {children}
    </BottomSheet>
  );
};

export default BottomAlert;
