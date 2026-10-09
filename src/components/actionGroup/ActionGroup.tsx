import React, { type FC, type ReactNode } from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';
import { actionGroupStyles } from '../../styles/actionGroup/actionGroup';

export interface ActionGroupProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  borderColor?: string;
  gap?: number;
  borderRadius?: number;
}

const ActionGroup: FC<ActionGroupProps> = (props) => {
  const { children, style, backgroundColor, borderColor, gap, borderRadius } =
    props;

  return (
    <View
      style={[
        actionGroupStyles.container,
        backgroundColor ? { backgroundColor } : undefined,
        borderColor ? { borderColor } : undefined,
        gap !== undefined ? { gap } : undefined,
        borderRadius !== undefined ? { borderRadius } : undefined,
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default ActionGroup;
