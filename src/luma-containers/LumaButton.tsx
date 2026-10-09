import React, {useMemo} from 'react';
import {Platform, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {appColors} from '../../../../../constants/appColors';
import {SystemUtils} from '../../../../../utils/system';
import useAppTheme from '../../../../../hooks/useAppTheme';

export const lumaButtonSize = Platform.OS === 'ios' ? 20 : 16;
interface Props {
  icon: (size: number, color?: string) => React.ReactNode;
  onPress: () => void;
  size?: number;
  color?: string;
  border?: string;
  transparent?: boolean;
  children?: React.ReactNode;
  label?: string;
  disabled?: boolean;
}

const LumaButton = (props: Props) => {
  const themeColor = useAppTheme();
  const {
    icon,
    onPress,
    size = lumaButtonSize,
    color = appColors.lumaBackground,
    border = SystemUtils.addAlpha(themeColor, 0.1),
    transparent,
    children,
    label,
    disabled = false,
  } = props;

  const buttonColor = useMemo(() => {
    if (color === appColors.lumaBackground) {
      return appColors.lumaBlack;
    } else {
      return SystemUtils.lightenColor(color, 0.8);
    }
  }, [color]);

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.backButton,
        {
          backgroundColor: color,
          borderColor: border,
          padding: size / 3,
          opacity: disabled ? 0.35 : 1,
        },
        !transparent && styles.border,
        label && {
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
        },
      ]}
      onPress={onPress}>
      {icon(size, buttonColor)}
      {children}
      {label && (
        <Text style={{color: appColors.text, fontWeight: 600}}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    borderRadius: 54,
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  border: {
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowColor: '#000',
  },
});

export default LumaButton;
