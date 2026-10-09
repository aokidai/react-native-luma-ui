import React, {FC, ReactNode} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {appColors} from '../../../../../constants/appColors';

interface Props {
  title?: string;
  children: ReactNode;
  action?: ReactNode;
  flex?: number;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  customTitle?: ({
    height,
    width,
  }: {
    height?: number;
    width?: number;
  }) => ReactNode;
}

const LumaSection: FC<Props> = props => {
  const {title, children, action, customTitle, flex, style, headerStyle} =
    props;

  return (
    <View
      style={[
        styles.container,
        flex !== undefined ? {flex} : undefined,
        style,
      ]}>
      {(title || action) && (
        <View style={[headerStyle, styles.header]}>
          {customTitle
            ? customTitle({height: 12, width: 125})
            : title && (
                <Text allowFontScaling={false} style={styles.title}>
                  {title}
                </Text>
              )}
          {action && action}
        </View>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 500,
    color: appColors.text,
    fontSize: 16,
  },
});

export default LumaSection;
