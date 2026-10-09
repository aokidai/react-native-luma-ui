import React, {Children, FC, ReactNode} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {appColors} from '../../../../../constants/appColors';

interface Props {
  count: number;
  children: ReactNode;
  dot?: boolean;
}

const LumaBadge: FC<Props> = props => {
  const {count, children, dot} = props;

  return (
    <View>
      {count > 0 && (
        <View
          style={[
            {
              position: 'absolute',
              right: -8,
              top: -6,
              zIndex: 1,
              elevation: 1,
              backgroundColor: appColors.threadDeadlineText,
              paddingVertical: 1,
              paddingHorizontal: 4,
              borderRadius: 12,
            },
            dot && {
              height: 6,
              width: 6,
              right: 0,
              top: -4,
              borderRadius: 56,
              paddingVertical: 0,
              paddingHorizontal: 0,
            },
          ]}>
          {!dot && (
            <Text
              style={{
                color: appColors.white,
                fontSize: 10,
                fontWeight: 'bold',
              }}>
              {count > 99 ? '99+' : count}
            </Text>
          )}
        </View>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({});

export default LumaBadge;
