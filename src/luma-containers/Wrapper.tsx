import React from 'react';
import {StyleSheet, View} from 'react-native';
import {appColors} from '../../../../../constants/appColors';
import Loading from './Loading';
import NoContent from './NoContent';

interface Props {
  children: React.ReactNode;
  loading?: boolean;
  paddingVertical?: number;
  gap?: number;
  noBackground?: boolean;
}

const Wrapper: React.FC<Props> = ({
  children,
  loading,
  paddingVertical = 16,
  gap = 16,
  noBackground,
}) => {
  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingVertical: paddingVertical,
          gap: gap,
          backgroundColor: noBackground
            ? 'transparent'
            : appColors.threadChatBackground,
        },
      ]}>
      {loading ? <Loading /> : <>{children}</>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',

    paddingHorizontal: 8,
  },
});

export default Wrapper;
