import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  InteractionManager,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Asset} from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import {Location, User} from 'iconsax-react-native';
import {getDay, getDayMonthYear, getTime} from '../../../../../utils/calcTime';
import {strings} from '../../../../../languages/strings';
import LumaUser from './LumaUser';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export interface WatermarkMetadata {
  fullName?: string;
  location?: {latitude: number; longitude: number} | null;
  address?: string;
  time?: string;
  date?: string;
  dayOfWeek?: string;
  lang?: string;
}

export interface WatermarkTask {
  id: string;
  asset: Asset;
  metadata?: Partial<WatermarkMetadata>;
}

export interface LumaWatermarkRef {
  processImage: (asset: Asset, metadata?: Partial<WatermarkMetadata>) => void;
  processImages: (
    assets: Asset[],
    metadata?: Partial<WatermarkMetadata>,
  ) => void;
  isProcessing: boolean;
  queueLength: number;
}

export interface LumaWatermarkProps {
  userInfo?: {fullName?: string; email?: string};
  location?: {latitude: number; longitude: number} | null;
  address?: string;
  lang?: string;
  showMap?: boolean;
  onSuccess: (snapshot: Asset) => void;
  onError?: (error: any) => void;
  onProcessingChange?: (isProcessing: boolean) => void;
}

const LumaWatermark = forwardRef<LumaWatermarkRef, LumaWatermarkProps>(
  (
    {
      userInfo,
      location,
      address,
      lang = 'vi',
      showMap = true,
      onSuccess,
      onError,
      onProcessingChange,
    },
    ref,
  ) => {
    const [queue, setQueue] = useState<WatermarkTask[]>([]);
    const viewShotRef = useRef<any>(null);
    const captureTimeoutRef = useRef<any>(null);
    const safetyTimeoutRef = useRef<any>(null);
    const isCapturingRef = useRef(false);

    const currentTask = queue[0] || null;

    console.log(currentTask);

    // Cập nhật trạng thái xử lý cho component cha
    useEffect(() => {
      onProcessingChange?.(queue.length > 0);
    }, [queue.length, onProcessingChange]);

    // Expose API qua ref
    useImperativeHandle(ref, () => ({
      processImage: (asset: Asset, metadata?: Partial<WatermarkMetadata>) => {
        if (!asset || !asset.uri) return;
        const taskId = (asset as any).id || (uuid.v4() as string);
        if (asset.width && asset.height) {
          setQueue(prev => [...prev, {id: taskId, asset, metadata}]);
        } else {
          Image.getSize(
            asset.uri,
            (w, h) => {
              const updatedAsset = {...asset, width: w, height: h};
              setQueue(prev => [
                ...prev,
                {id: taskId, asset: updatedAsset, metadata},
              ]);
            },
            () => {
              setQueue(prev => [...prev, {id: taskId, asset, metadata}]);
            },
          );
        }
      },
      processImages: (
        assets: Asset[],
        metadata?: Partial<WatermarkMetadata>,
      ) => {
        if (!assets || assets.length === 0) return;
        assets.forEach(asset => {
          if (!asset || !asset.uri) return;
          const taskId = (asset as any).id || (uuid.v4() as string);
          if (asset.width && asset.height) {
            setQueue(prev => [...prev, {id: taskId, asset, metadata}]);
          } else {
            Image.getSize(
              asset.uri,
              (w, h) => {
                const updatedAsset = {...asset, width: w, height: h};
                setQueue(prev => [
                  ...prev,
                  {id: taskId, asset: updatedAsset, metadata},
                ]);
              },
              () => {
                setQueue(prev => [...prev, {id: taskId, asset, metadata}]);
              },
            );
          }
        });
      },
      isProcessing: queue.length > 0,
      queueLength: queue.length,
    }));

    // Hàm chuyển sang task tiếp theo trong hàng đợi
    const advanceQueue = useCallback(() => {
      isCapturingRef.current = false;
      if (captureTimeoutRef.current) {
        clearTimeout(captureTimeoutRef.current);
        captureTimeoutRef.current = null;
      }
      if (safetyTimeoutRef.current) {
        clearTimeout(safetyTimeoutRef.current);
        safetyTimeoutRef.current = null;
      }
      setQueue(prev => prev.slice(1));
    }, []);

    // Thực hiện capture ViewShot
    const executeCapture = useCallback(
      (task: WatermarkTask) => {
        if (isCapturingRef.current) return;
        isCapturingRef.current = true;

        InteractionManager.runAfterInteractions(() => {
          if (viewShotRef.current && viewShotRef.current.capture) {
            viewShotRef.current
              .capture()
              .then((uri: string) => {
                const snapshot: Asset = {
                  fileName: `${uuid.v4()}.jpg`,
                  type: 'image/jpeg',
                  uri,
                  id: task.id,
                  width: task.asset.width,
                  height: task.asset.height,
                };

                onSuccess(snapshot);
                advanceQueue();
              })
              .catch((err: any) => {
                console.log('[LumaWatermark] Capture error:', err);
                onError?.(err);
                advanceQueue();
              });
          } else {
            advanceQueue();
          }
        });
      },
      [onSuccess, onError, advanceQueue],
    );

    // Khi hình ảnh trong ViewShot load xong
    const handleImageLoaded = useCallback(() => {
      if (!currentTask) return;

      if (captureTimeoutRef.current) {
        clearTimeout(captureTimeoutRef.current);
      }

      // Trên Android cần thời gian để decode bitmap và vẽ mini map hoàn chỉnh
      const delay = Platform.OS === 'android' ? 650 : 350;

      captureTimeoutRef.current = setTimeout(() => {
        if (currentTask) {
          executeCapture(currentTask);
        }
      }, delay);
    }, [currentTask, executeCapture]);

    // Safety timeout: nếu quá 5s chưa capture xong thì tự động bỏ qua để không nghẽn queue
    useEffect(() => {
      if (currentTask) {
        safetyTimeoutRef.current = setTimeout(() => {
          console.warn(
            '[LumaWatermark] Safety timeout triggered for task:',
            currentTask.id,
          );
          advanceQueue();
        }, 5000);
      }
      return () => {
        if (safetyTimeoutRef.current) {
          clearTimeout(safetyTimeoutRef.current);
        }
      };
    }, [currentTask?.id, advanceQueue]);

    if (!currentTask) return null;

    // Dữ liệu hiển thị (kết hợp prop chung và metadata riêng của task)
    const taskMeta = currentTask.metadata || {};
    const displayFullName = taskMeta.fullName ?? userInfo?.fullName ?? '';
    const displayLocation =
      taskMeta.location !== undefined ? taskMeta.location : location;
    const displayAddress = taskMeta.address ?? address;
    const displayTime = taskMeta.time ?? getTime();
    const displayDate = taskMeta.date ?? getDayMonthYear();
    const displayDayOfWeek =
      taskMeta.dayOfWeek ?? getDay(taskMeta.lang ?? lang);

    // Tính toán chiều cao tỉ lệ theo kích thước ảnh gốc chuẩn xác
    const originalWidth = currentTask.asset.width || 0;
    const originalHeight = currentTask.asset.height || 0;
    const viewHeight =
      originalWidth > 0 && originalHeight > 0
        ? (SCREEN_WIDTH * originalHeight) / originalWidth
        : SCREEN_WIDTH * 1.333;

    const hasLocation = !!(
      displayLocation?.latitude && displayLocation?.longitude
    );

    console.log(hasLocation, displayLocation);

    return (
      <ViewShot
        ref={viewShotRef}
        options={{format: 'jpg', quality: 0.95}}
        style={[
          styles.viewShotContainer,
          {
            width: SCREEN_WIDTH,
            height: viewHeight,
          },
        ]}>
        {/* Ảnh gốc full container với kích thước chính xác */}
        <Image
          source={{uri: currentTask.asset.uri}}
          style={{
            width: SCREEN_WIDTH,
            height: viewHeight,
          }}
          resizeMode="cover"
          onLoad={handleImageLoaded}
        />

        {/* Lớp phủ Gradient đen mờ trải full chiều rộng ảnh trên iOS & Android */}
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={[
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0.45)',
            'rgba(0, 0, 0, 0.88)',
          ]}
          locations={[0, 0.3, 1]}
          style={[
            styles.gradientOverlay,
            {
              width: SCREEN_WIDTH,
            },
          ]}>
          {/* Header: Badge Người thực hiện */}
          <View
            style={{
              paddingHorizontal: 10,
              marginBottom: Platform.OS === 'android' ? 10 : 36,
            }}>
            {displayFullName ? (
              <View style={styles.userBadgeContainer}>
                <View style={styles.userBadge}>
                  <LumaUser userEmail={userInfo?.email ?? ''} avatarOnly />
                  <Text style={styles.userBadgeText} numberOfLines={1}>
                    {displayFullName}
                  </Text>
                </View>
              </View>
            ) : null}

            {/* Khối chính: Thời gian bên trái & Mini Map bên phải */}
            <View style={styles.mainInfoRow}>
              {/* Bên trái: Giờ to, vạch ngăn cách, Ngày & Thứ */}
              <View style={styles.timeSection}>
                <Text style={styles.timeText}>{displayTime}</Text>

                <View style={styles.verticalDivider} />

                <View style={styles.dateBlock}>
                  <Text style={styles.dateText}>{displayDate}</Text>
                  <Text style={styles.dayOfWeekText}>{displayDayOfWeek}</Text>
                </View>
              </View>

              {/* Bên phải: Mini Map nếu có vị trí */}
              {showMap && hasLocation && displayLocation ? (
                <View style={styles.miniMapWrapper}>
                  <MapView
                    style={StyleSheet.absoluteFill}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    pitchEnabled={false}
                    rotateEnabled={false}
                    userInterfaceStyle="light"
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                      latitude: displayLocation.latitude + 0.00035,
                      longitude: displayLocation.longitude,
                      latitudeDelta: 0.002,
                      longitudeDelta: 0.004,
                    }}
                    region={{
                      latitude: displayLocation.latitude + 0.00035,
                      longitude: displayLocation.longitude,
                      latitudeDelta: 0.002,
                      longitudeDelta: 0.004,
                    }}>
                    <Marker coordinate={displayLocation} />
                  </MapView>
                </View>
              ) : null}
            </View>

            {/* Dưới cùng: Tọa độ hoặc địa chỉ chi tiết */}
            {hasLocation && displayLocation ? (
              <View style={styles.locationFooterRow}>
                <Location size={14} color="#FF5252" variant="Bold" />
                <Text style={styles.locationText} numberOfLines={1}>
                  {displayAddress
                    ? `${displayAddress} (${displayLocation.latitude.toFixed(4)}, ${displayLocation.longitude.toFixed(4)})`
                    : `${strings.Coords || 'Tọa độ'}: ${displayLocation.latitude.toFixed(5)}, ${displayLocation.longitude.toFixed(5)}`}
                </Text>
              </View>
            ) : null}
          </View>
        </LinearGradient>
      </ViewShot>
    );
  },
);

export default React.memo(LumaWatermark);

const styles = StyleSheet.create({
  viewShotContainer: {
    position: 'absolute',
    left: SCREEN_WIDTH,
    top: SCREEN_HEIGHT,
    backgroundColor: '#000000',
    overflow: 'hidden',
    opacity: 1,
    zIndex: 1,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    // paddingHorizontal: 10,
    paddingTop: 24,
    // paddingBottom: 10,
  },
  userBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 14,
    gap: 5,
    borderWidth: 0.8,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  userBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  mainInfoRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  timeSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timeText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  verticalDivider: {
    width: 2,
    height: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 1,
  },
  dateBlock: {
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  dayOfWeekText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  miniMapWrapper: {
    width: 120,
    height: 72,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#333333',
  },
  locationFooterRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255, 255, 255, 0.35)',
  },
  locationText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.95)',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
});
