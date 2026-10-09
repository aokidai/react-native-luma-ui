import React from 'react';
import {StyleSheet, View, Text, Linking, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {appColors} from '../../../../../constants/appColors';
import {strings} from '../../../../../languages/strings';
import LumaBottomAlert from './LumaBottomAlert';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-paper';

const LumaPermissionAlert = () => {
  const navigation = useNavigation();

  const openPermission = async () => {
    Linking.openSettings();
    navigation.goBack();
  };

  return (
    <LumaBottomAlert visible={true} onClose={() => {}}>
      <View style={styles.permissionAlert}>
        <Text style={styles.title}>
          {strings.AllowPermission.replace('{{label}}', strings.QRScanner)}
        </Text>
        <View style={styles.flexRow}>
          <MaterialIcons name="camera-alt" size={24} color={appColors.text} />
          <View style={styles.flexCol}>
            <Text style={[styles.title, {fontSize: 16}]}>Camera</Text>
            <Text style={styles.description}>
              {strings.CameraPermissionDetail}
            </Text>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.button}>
            <Text style={styles.buttonText}>{strings.Cancel}</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={openPermission} style={styles.button}>
            <Text style={styles.buttonText}>{strings.Setting}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LumaBottomAlert>
  );
};

const styles = StyleSheet.create({
  title: {
    color: appColors.text,
  },
  permissionAlert: {
    paddingVertical: 16,
    gap: 16,
    paddingHorizontal: 8,
    width: '100%',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  flexCol: {
    flex: 1,
    flexShrink: 1,
    flexDirection: 'column',
    gap: 2,
  },
  description: {
    color: appColors.gray,
    flexShrink: 1,
    fontSize: 13,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: appColors.text,
    fontWeight: '600',
    fontSize: 16,
  },
  divider: {
    width: 1,
    height: '40%',
    backgroundColor: appColors.threadBorderColor,
  },
});

export default LumaPermissionAlert;
