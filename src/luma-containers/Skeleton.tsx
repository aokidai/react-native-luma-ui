import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {appColors} from '../../../../../constants/appColors';

const Skeleton = () => {
  return (
    <View style={{width: '100%'}}>
      <SkeletonPlaceholder backgroundColor={appColors.gray6}>
        <View style={styles.textWrapper}>
          <View style={styles.lineShort} />
          <View style={styles.lineLong} />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    flex: 1,
  },
  lineShort: {
    width: '60%',
    height: 15,
    borderRadius: 4,
  },
  lineLong: {
    width: '80%',
    height: 15,
    borderRadius: 4,
    marginTop: 6,
  },
});

export default Skeleton;
