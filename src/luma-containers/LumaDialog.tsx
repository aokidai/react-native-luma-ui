import {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  Keyboard,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  ActivityIndicator,
  Dialog as DialogType,
  Portal,
} from 'react-native-paper';
import {appColors} from '../../../../../constants/appColors';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props {
  visible: boolean;
  children: any;
  title?: any;
  footer?: any[];
  height?: any;
  heightContent?: any;
  padding?: number;
  customMarginTop?: number | string;
  defaultCloseButton?: boolean;
  onClose: () => void;
  modalStyle?: any;
  style?: any;
  marginDialog?: number;
  pressOutForClose?: boolean;
  action?: any;
  leftAction?: any;
  loading?: boolean;
  loadingDetail?: boolean;
  loadingFooter?: boolean;
  dismissable?: boolean;
  fullScreen?: boolean;
  backgroundColor?: string;
  portal?: boolean;
}

const LumaDialog: FC<Props> = props => {
  const {
    visible = false,
    children,
    title,
    footer = [],
    onClose,
    height,
    heightContent,
    action,
    loading,
    loadingFooter,
    dismissable = true,
    fullScreen = false,
    backgroundColor,
    portal = true,
    style,
  } = props;

  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardOpen(true),
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setTimeout(() => setKeyboardOpen(false), 100);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const renderDialog = () => {
    return (
      <>
        {fullScreen ? (
          <DialogType
            visible={visible}
            onDismiss={onClose}
            style={[
              {
                borderWidth: 0,
                shadowColor: 'transparent',
                elevation: 0,
                shadowOpacity: 0,
                shadowOffset: {width: 0, height: 0},
                shadowRadius: 0,
                height: Dimensions.get('window').height + 32,
                width: '100%',
                marginLeft: 0,
                marginVertical: 0,
                marginHorizontal: 0,
              },
              style,
            ]}>
            <View
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                backgroundColor: backgroundColor,
                marginTop: 0,
              }}>
              {children}
            </View>
          </DialogType>
        ) : (
          <DialogType
            dismissable={dismissable}
            visible={visible}
            onDismiss={onClose}
            style={{
              height: height ?? null,
              marginBottom: keyboardOpen ? '35%' : 60,
            }}>
            {title && (
              <View style={[styles.title, {marginBottom: action ? 14 : 16}]}>
                <Text style={[styles.titleText, {color: appColors.text}]}>
                  {title}
                </Text>
                {action && <View>{action}</View>}
              </View>
            )}

            <DialogType.ScrollArea
              style={[
                {
                  height: heightContent ?? null,
                  borderColor: appColors.lumaPrimaryBackground,
                },
              ]}>
              <ScrollView>{children}</ScrollView>
            </DialogType.ScrollArea>

            {footer && footer.length > 0 && (
              <DialogType.Actions>
                {loading && loadingFooter ? (
                  <ActivityIndicator />
                ) : (
                  <>
                    {footer.map((data, index) => {
                      return <View key={index}>{data}</View>;
                    })}
                  </>
                )}
              </DialogType.Actions>
            )}
          </DialogType>
        )}
      </>
    );
  };

  return (
    <>{portal ? <Portal>{renderDialog()}</Portal> : <>{renderDialog()}</>}</>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingRight: 12,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '500',
  },
});

export default LumaDialog;
