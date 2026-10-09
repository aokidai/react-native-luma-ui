import React, {
  FC,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
  BackHandler,
  Platform,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {ImageSource} from 'react-native-image-viewing/dist/@types';
import {Portal} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import ReactNativeBlobUtil from 'react-native-blob-util';
import RNShare from 'react-native-share';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import Toast from 'react-native-toast-message';

import LumaDialog from './LumaDialog';
import LumaLoading from './LumaLoading';
import {LumaAPIs} from './LumaAPIs/lumaAPIs';
import {FileModel} from '../../../../../models/Library';
import {companyUrlSelector} from '../../../../../redux/reducers/companyUrlReducer';
import getLibraryAPI from '../../../../../api/libraryApi';
import {handleDownloadFile} from '../../../../../utils/handleDownloadFile';
import {showToast} from '../../../../../utils/showToast';
import {strings} from '../../../../../languages/strings';
import {appColors} from '../../../../../constants/appColors';

export interface ViewImageModel {
  uri: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  imageUrl: ImageSource[];
  imageIndex: number;
  imageBackgroundUrl: ViewImageModel[];
  portal?: boolean;
  file?: FileModel;
  item?: FileModel;
  files?: FileModel[];
}

const getImageUri = (imgSource?: ImageSource): string | undefined => {
  if (
    typeof imgSource === 'object' &&
    imgSource !== null &&
    'uri' in imgSource
  ) {
    return (imgSource as {uri?: string}).uri;
  }
  return undefined;
};

const LumaImageView: FC<Props> = ({
  open,
  onClose,
  imageUrl,
  imageIndex,
  imageBackgroundUrl,
  portal = true,
  file,
  item,
  files,
}) => {
  const insets = useSafeAreaInsets();
  const companyUrl = useSelector(companyUrlSelector);

  const [index, setIndex] = useState(imageIndex);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState(
    strings.Prepearingdownloadlink || 'Đang chuẩn bị link tải',
  );
  const fadeAnim = useMemo(() => new Animated.Value(1), []);

  const [toastText, setToastText] = useState<string | null>(null);
  const toastOpacity = useRef(new Animated.Value(0)).current;
  const toastTranslateY = useRef(new Animated.Value(-20)).current;
  const toastTimeoutRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (open) {
      setIndex(imageIndex);
      setMenuVisible(false);
      setIsLoading(false);
    } else {
      setMenuVisible(false);
      setIsLoading(false);
      setToastText(null);
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    }
  }, [open, imageIndex]);

  const onIndexChange = (newIdx: number) => {
    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setIndex(newIdx);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    if (!open) return;
    const backAction = () => {
      onClose();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [open, onClose]);

  const currentFile = files?.[index] || file || item;

  const handleShareFile = async () => {
    setMenuVisible(false);
    setLoadingLabel(strings.PreparingFileShare || 'Đang chuẩn bị chia sẻ...');
    if (currentFile?.id) {
      await LumaAPIs.shareFile(companyUrl, currentFile, setIsLoading);
    } else {
      const currentUri = getImageUri(imageUrl[index]);
      if (!currentUri) return;
      try {
        setIsLoading(true);
        const fileName =
          currentFile?.name ||
          currentUri.split('/').pop()?.split('?')[0] ||
          `image_${Date.now()}.jpg`;
        const finalFileName = fileName.includes('.')
          ? fileName
          : `${fileName}.jpg`;

        if (currentUri.startsWith('file://')) {
          setIsLoading(false);
          await RNShare.open({
            url: currentUri,
            filename: finalFileName,
          });
        } else {
          const {dirs} = ReactNativeBlobUtil.fs;
          const filePath = `${dirs.CacheDir}/${finalFileName}`;

          const res = await ReactNativeBlobUtil.config({
            path: filePath,
            fileCache: true,
          }).fetch('GET', currentUri);

          const rawUri = `file://${res.path()}`;
          const localFileUri = encodeURI(rawUri);

          setIsLoading(false);

          await RNShare.open({
            url: localFileUri,
            filename: finalFileName,
          });

          ReactNativeBlobUtil.fs.unlink(res.path());
        }
      } catch (error: any) {
        setIsLoading(false);
        console.log('Error sharing image:', error);
      }
    }
  };

  const topOffset = Math.max(insets.top, Platform.OS === 'ios' ? 12 : 16);

  const saveImageToCameraRoll = async (
    url: string,
    fileName?: string,
  ): Promise<boolean> => {
    try {
      if (url.startsWith('file://') || url.startsWith('data:')) {
        await CameraRoll.saveAsset(url, {type: 'photo'});
        return true;
      }

      const ext = (
        fileName?.split('.').pop() ||
        url.split('.').pop()?.split('?')[0] ||
        'jpg'
      ).toLowerCase();
      const validExt = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic'].includes(
        ext,
      )
        ? ext
        : 'jpg';
      const tempPath = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/save_${Date.now()}.${validExt}`;

      const res = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: tempPath,
      }).fetch('GET', url);

      const localPath = res.path();
      const localFileUri = localPath.startsWith('file://')
        ? localPath
        : `file://${localPath}`;

      await CameraRoll.saveAsset(localFileUri, {type: 'photo'});

      ReactNativeBlobUtil.fs.unlink(localPath).catch(() => {});
      return true;
    } catch (error) {
      console.log('Error saving image to camera roll:', error);
      return false;
    }
  };

  const handleGetDownloadUrl = async () => {
    setMenuVisible(false);
    setLoadingLabel(strings.downloading);
    setIsLoading(true);

    if (currentFile?.id) {
      if (currentFile.flag === 'file') {
        const api = `/Library/GetTempFilePath/${currentFile.id}`;
        try {
          const res: any = await getLibraryAPI.getLibraryAPI(companyUrl, api);

          if (res && res.data) {
            if (Platform.OS === 'ios') {
              const success = await saveImageToCameraRoll(
                res.data,
                currentFile.name,
              );
              const message = success
                ? strings.DownloadSuccessfully
                : strings.DownloadFailed;
              setLoadingLabel(message);
              showToast(message);
              setTimeout(() => {
                setIsLoading(false);
              }, 1200);
            } else {
              await handleDownloadFile(
                JSON.stringify({
                  path: res.data,
                  fileName: currentFile.name,
                }),
                '',
              );
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
            console.log('Can not get download url');
          }
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      } else {
        const apiDownloadFolder = `/Library/DownloadFolder/${currentFile.id}`;
        setLoadingLabel(strings.Loading || 'Đang tải...');

        try {
          const res: any = await getLibraryAPI.getLibraryAPI(
            companyUrl,
            apiDownloadFolder,
          );

          if (res) {
            const fileName =
              res.data.split('/')[res.data.split('/').length - 1];
            const path = res.data;

            const dataDownload = JSON.stringify({
              path,
              fileName,
            });
            await handleDownloadFile(dataDownload);

            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          } else {
            console.log('Can not generate zip file');
          }
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      }
    } else {
      const currentUri = getImageUri(imageUrl[index]);
      if (!currentUri) {
        setIsLoading(false);
        return;
      }
      try {
        const fileName =
          currentFile?.name ||
          currentUri.split('/').pop()?.split('?')[0] ||
          `image_${Date.now()}.jpg`;
        const finalFileName = fileName.includes('.')
          ? fileName
          : `${fileName}.jpg`;

        if (Platform.OS === 'ios') {
          const success = await saveImageToCameraRoll(
            currentUri,
            finalFileName,
          );
          const message = success
            ? strings.DownloadSuccessfully
            : strings.DownloadFailed;
          setLoadingLabel(message);
          showToast(message);
          setTimeout(() => {
            setIsLoading(false);
          }, 1200);
        } else {
          await handleDownloadFile(
            JSON.stringify({
              path: currentUri,
              fileName: finalFileName,
            }),
            '',
          );

          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  const renderHeader = useCallback(
    ({imageIndex: currentIdx}: {imageIndex: number}) => {
      const activeIdx = currentIdx !== undefined ? currentIdx : index;

      return (
        <View style={styles.headerWrapper} pointerEvents="box-none">
          <View
            style={[styles.headerBar, {top: topOffset}]}
            pointerEvents="box-none">
            {/* Close button */}
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={onClose}
              activeOpacity={0.7}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <MaterialIcons name="close" size={24} color={appColors.white} />
            </TouchableOpacity>

            {/* Counter badge if multiple images */}
            {imageUrl && imageUrl.length > 1 ? (
              <View style={styles.counterBadge}>
                <Text style={styles.counterText}>
                  {`${activeIdx + 1} / ${imageUrl.length}`}
                </Text>
              </View>
            ) : (
              <View />
            )}

            {/* Menu (More button) */}
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => setMenuVisible(prev => !prev)}
              activeOpacity={0.7}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <MaterialIcons
                name="more-vert"
                size={24}
                color={appColors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    [index, imageUrl, topOffset, onClose],
  );

  const screenHeight = Dimensions.get('window').height;

  const renderFooter = useCallback(() => {
    return (
      <View
        style={[styles.footerOverlay, {height: screenHeight}]}
        pointerEvents="box-none">
        {/* Backdrop tap to dismiss menu */}
        {menuVisible && (
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
          />
        )}

        {/* Dropdown Menu Card rendered on top of images */}
        {menuVisible && (
          <View style={[styles.menuCard, {top: topOffset + 48}]}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleGetDownloadUrl}
              activeOpacity={0.7}>
              <MaterialIcons
                name="file-download"
                size={20}
                color={appColors.text}
                style={styles.menuItemIcon}
              />
              <Text style={styles.menuItemTitle}>
                {strings.Download || 'Tải xuống'}
              </Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleShareFile}
              activeOpacity={0.7}>
              <MaterialIcons
                name="share"
                size={20}
                color={appColors.text}
                style={styles.menuItemIcon}
              />
              <Text style={styles.menuItemTitle}>
                {strings.Share || 'Chia sẻ'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {isLoading && <LumaLoading label={loadingLabel} />}

        {/* Custom in-viewer Toast notification always on top of images */}
        {Boolean(toastText) && (
          <Animated.View
            style={[
              styles.toastWrapper,
              {
                top: topOffset + 12,
                opacity: toastOpacity,
                transform: [{translateY: toastTranslateY}],
              },
            ]}
            pointerEvents="none">
            <View style={styles.toastBox}>
              <MaterialIcons
                name="info"
                size={20}
                color={appColors.white}
                style={{marginRight: 8}}
              />
              <Text style={styles.toastText}>{toastText}</Text>
            </View>
          </Animated.View>
        )}

        <Toast topOffset={topOffset + 10} />
      </View>
    );
  }, [
    menuVisible,
    isLoading,
    loadingLabel,
    toastText,
    toastOpacity,
    toastTranslateY,
    screenHeight,
    topOffset,
    handleGetDownloadUrl,
    handleShareFile,
  ]);

  return (
    <LumaDialog
      visible={open}
      portal={portal}
      onClose={onClose}
      fullScreen
      backgroundColor="black">
      <View style={styles.container}>
        {Boolean(imageBackgroundUrl[index]?.uri) && (
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                opacity: fadeAnim,
              },
            ]}>
            <Image
              source={{
                uri: imageBackgroundUrl[index].uri,
              }}
              style={StyleSheet.absoluteFillObject}
              blurRadius={Platform.OS === 'ios' ? 45 : 18}
              resizeMode="cover"
            />
            {/* Lớp phủ mờ tối nhẹ giúp ảnh chính sắc nét và tương phản tốt hơn */}
            <View
              style={[
                StyleSheet.absoluteFillObject,
                {backgroundColor: 'rgba(0, 0, 0, 0.45)'},
              ]}
            />
          </Animated.View>
        )}
        <ImageView
          images={imageUrl}
          imageIndex={imageIndex}
          visible={open}
          onRequestClose={onClose}
          presentationStyle="overFullScreen"
          swipeToCloseEnabled
          doubleTapToZoomEnabled
          backgroundColor="transparent"
          onImageIndexChange={onIndexChange}
          HeaderComponent={renderHeader}
          FooterComponent={renderFooter}
        />
      </View>
    </LumaDialog>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerWrapper: {
    width: Dimensions.get('window').width,
    height: 80,
  },
  headerBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  counterText: {
    color: appColors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  footerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  menuCard: {
    position: 'absolute',
    right: 16,
    backgroundColor: appColors.white,
    borderRadius: 14,
    paddingVertical: 4,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemIcon: {
    marginRight: 12,
  },
  menuItemTitle: {
    fontSize: 14,
    color: appColors.text,
    fontWeight: '500',
  },
  menuDivider: {
    backgroundColor: '#E5E7EB',
    height: 0.5,
    marginHorizontal: 12,
  },
  toastWrapper: {
    position: 'absolute',
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 999999,
  },
  toastBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(28, 28, 30, 0.95)',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 12,
    maxWidth: '92%',
  },
  toastText: {
    color: appColors.white,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default React.memo(LumaImageView);
