import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import useAppTheme from '../../../../../hooks/useAppTheme';

const Loading = () => {
  const themeColor = useAppTheme();

  return (
    <View style={styles.boxLoading}>
      <ActivityIndicator size={18} color={themeColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  boxLoading: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});

export default Loading;
