import React, {FC, ReactNode} from 'react';
import {Platform, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Modal, Portal, ProgressBar} from 'react-native-paper';
import {useAppTheme} from 'react-native-paper/lib/typescript/core/theming';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {appColors} from '../../../../../constants/appColors';
import {strings} from '../../../../../languages/strings';
import {SystemUtils} from '../../../../../utils/system';
import {Style} from 'react-native-paper/lib/typescript/components/List/utils';

interface Props {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const LumaBottomAlert: FC<Props> = props => {
  const {visible, onClose, children, style} = props;
  const insets = useSafeAreaInsets();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        style={{justifyContent: 'flex-end'}}>
        <View
          style={[
            {
              backgroundColor: appColors.white,
              marginHorizontal: 12,
              marginBottom: Platform.OS === 'android' ? insets.bottom : 0,
              paddingHorizontal: 12,
              justifyContent: 'center',
              borderRadius: 24,
            },
            style,
          ]}>
          {children}
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({});

export default LumaBottomAlert;
