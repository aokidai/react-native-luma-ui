import React from 'react';
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {appColors} from '../../../../../constants/appColors';
import useAppTheme from '../../../../../hooks/useAppTheme';
import {SystemUtils} from '../../../../../utils/system';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const LumaActionGroup = (props: Props) => {
  const {children, style} = props;
  const themeColor = useAppTheme();

  return (
    <View
      style={[
        styles.groupAction,
        {borderColor: SystemUtils.addAlpha(themeColor, 0.1)},
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  groupAction: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    backgroundColor: appColors.lumaBackground,
    borderRadius: 54,
    borderWidth: 1,
  },
});

export default LumaActionGroup;
