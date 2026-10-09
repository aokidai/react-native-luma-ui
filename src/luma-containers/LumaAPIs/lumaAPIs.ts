import React from 'react';
import {Alert, Platform, Share} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import RNShare from 'react-native-share';
import {getDownloadUrlById} from '../../../../../../utils/handleOpenFile';
import {CompanyData} from '../../../../../../models/CompanyData';
import {FileModel} from '../../../../../../models/Library';

export class LumaAPIs {
  static async lumaShare(url: string) {
    try {
      await Share.share(
        Platform.OS === 'android'
          ? {
              message: url,
            }
          : {
              url,
            },
      );
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }

  static async shareFile(
    companyUrl: CompanyData[],
    file: FileModel,
    onLoading?: (isLoading: boolean) => void,
  ) {
    onLoading?.(true);

    try {
      const {dirs} = ReactNativeBlobUtil.fs;
      const filePath = `${dirs.CacheDir}/${file.name + (file.flag !== 'file' ? '.zip' : '')}`;

      const urlShare = await getDownloadUrlById(companyUrl, file);

      if (!urlShare) {
        onLoading?.(false);
        return;
      }

      const res = await ReactNativeBlobUtil.config({
        path: filePath,
        fileCache: true,
      }).fetch('GET', urlShare);

      const rawUri = `file://${res.path()}`;
      const localFileUri = encodeURI(rawUri);

      onLoading?.(false);

      await RNShare.open({
        url: localFileUri,
        filename: file.name,
      });

      ReactNativeBlobUtil.fs.unlink(res.path());
    } catch (error: any) {
      onLoading?.(false);

      if (error?.message !== 'User did not share') {
        console.log('Lỗi tải/chia sẻ file:', error);
      }
    }
  }
}
