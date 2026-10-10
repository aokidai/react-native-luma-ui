import { Alert, Platform, Share } from 'react-native';

export class LumaAPIs {
  static async lumaShare(url: string, title?: string) {
    try {
      await Share.share(
        Platform.OS === 'android'
          ? {
              message: url,
              title: title,
            }
          : {
              url,
              title,
            }
      );
    } catch (error: any) {
      Alert.alert('Chia sẻ thất bại', error?.message);
    }
  }
}
