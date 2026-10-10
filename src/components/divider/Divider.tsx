import React, { type FC } from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';
import { dividerStyles } from '../../styles/divider/divider';

export interface DividerProps {
  bold?: boolean;
  color?: string;
  inset?: boolean;
  insetType?: 'left' | 'right' | 'both';
  vertical?: boolean;
  thickness?: number;
  style?: StyleProp<ViewStyle>;
}

const Divider: FC<DividerProps> = (props) => {
  const {
    bold = false,
    color,
    inset = false,
    insetType = 'both',
    vertical = false,
    thickness,
    style,
  } = props;

  return (
    <View
      style={[
        vertical ? dividerStyles.vertical : dividerStyles.horizontal,
        bold && (vertical ? dividerStyles.boldVertical : dividerStyles.bold),
        color ? { backgroundColor: color } : undefined,
        thickness !== undefined
          ? vertical
            ? { width: thickness }
            : { height: thickness }
          : undefined,
        inset && !vertical
          ? insetType === 'left'
            ? dividerStyles.insetLeft
            : insetType === 'right'
            ? dividerStyles.insetRight
            : dividerStyles.insetBoth
          : undefined,
        style,
      ]}
    />
  );
};

export default Divider;
