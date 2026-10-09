import React, {FC, ReactNode} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native';
import useAppTheme from '../../../../../hooks/useAppTheme';
import {appColors} from '../../../../../constants/appColors';
import {SystemUtils} from '../../../../../utils/system';

interface Props {
  children?: ReactNode;
  onPress: () => void;
  selected: boolean;
  label?: string;
  style?: StyleProp<ViewStyle>;
}

const LumaSegmentedButtons: FC<Props> = props => {
  const {children, onPress, selected, label, style} = props;
  const themeColor = useAppTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: selected
            ? themeColor
            : appColors.lumaBackgroundSegmentedButton,
          borderWidth: 1,
          borderColor: selected
            ? themeColor
            : SystemUtils.addAlpha(themeColor, 0.1),
        },
        style,
      ]}>
      {label && (
        <Text
          allowFontScaling={false}
          style={[
            styles.label,
            {color: selected ? appColors.white : themeColor},
          ]}>
          {label}
        </Text>
      )}
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  label: {
    fontSize: 12,
  },
});

export default LumaSegmentedButtons;

