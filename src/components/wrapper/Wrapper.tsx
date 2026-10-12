import React, { type FC, type ReactNode } from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';
import { wrapperStyles } from '../../styles/wrapper/wrapper';
import Loading from '../loading/Loading';

export interface WrapperProps {
  children: ReactNode;
  loading?: boolean;
  paddingVertical?: number;
  paddingHorizontal?: number;
  gap?: number;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

const Wrapper: FC<WrapperProps> = (props) => {
  const {
    children,
    loading = false,
    paddingVertical = 16,
    paddingHorizontal = 8,
    gap = 16,
    backgroundColor,
    style,
  } = props;

  return (
    <View
      style={[
        wrapperStyles.container,
        {
          paddingVertical,
          paddingHorizontal,
          gap,
        },
        backgroundColor ? { backgroundColor } : undefined,
        style,
      ]}
    >
      {loading ? <Loading /> : children}
    </View>
  );
};

export default Wrapper;
