import React, { type FC, type ReactNode } from 'react';
import {
  Image,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { watermarkStyles } from '../../styles/watermark/watermark';

export interface WatermarkProps {
  children?: ReactNode;
  imageUri?: string;
  userName?: string;
  address?: string;
  locationText?: string;
  time?: string;
  date?: string;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  watermarkStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

const WatermarkPersonIcon: FC<{ size?: number; color?: string }> = ({
  size = 14,
  color = '#ffffff',
}) => (
  <View
    style={{
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        width: size * 0.44,
        height: size * 0.44,
        borderRadius: size * 0.22,
        backgroundColor: color,
        marginBottom: 1,
      }}
    />
    <View
      style={{
        width: size * 0.75,
        height: size * 0.38,
        borderTopLeftRadius: size * 0.38,
        borderTopRightRadius: size * 0.38,
        backgroundColor: color,
      }}
    />
  </View>
);

const WatermarkLocationIcon: FC<{ size?: number; color?: string }> = ({
  size = 14,
  color = '#ffffff',
}) => (
  <View
    style={{
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        width: size * 0.6,
        height: size * 0.6,
        borderRadius: size * 0.3,
        borderWidth: 1.8,
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.2,
          height: size * 0.2,
          borderRadius: size * 0.1,
          backgroundColor: color,
        }}
      />
    </View>
    <View
      style={{
        width: 2,
        height: size * 0.25,
        backgroundColor: color,
        marginTop: -1,
      }}
    />
  </View>
);

const WatermarkClockIcon: FC<{ size?: number; color?: string }> = ({
  size = 14,
  color = '#ffffff',
}) => (
  <View
    style={{
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        width: size * 0.85,
        height: size * 0.85,
        borderRadius: size * 0.45,
        borderWidth: 1.5,
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: size * 0.18,
          width: 1.5,
          height: size * 0.25,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: size * 0.2,
          width: size * 0.22,
          height: 1.5,
          backgroundColor: color,
        }}
      />
    </View>
  </View>
);

const Watermark: FC<WatermarkProps> = (props) => {
  const {
    children,
    imageUri,
    userName,
    address,
    locationText,
    time,
    date,
    position = 'bottom-left',
    watermarkStyle,
    style,
  } = props;

  const positionStyle =
    position === 'bottom-right'
      ? watermarkStyles.bottomRight
      : position === 'top-left'
      ? watermarkStyles.topLeft
      : position === 'top-right'
      ? watermarkStyles.topRight
      : watermarkStyles.bottomLeft;

  const hasWatermarkData = userName || address || locationText || time || date;

  return (
    <View style={[watermarkStyles.container, style]}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        />
      ) : null}

      {children}

      {hasWatermarkData ? (
        <View
          style={[
            watermarkStyles.watermarkOverlay,
            positionStyle,
            watermarkStyle,
          ]}
        >
          {userName ? (
            <View style={watermarkStyles.infoRow}>
              <WatermarkPersonIcon size={14} color="#ffffff" />
              <Text style={watermarkStyles.titleText}>{userName}</Text>
            </View>
          ) : null}

          {locationText ? (
            <View style={watermarkStyles.infoRow}>
              <WatermarkLocationIcon size={14} color="#ffffff" />
              <Text style={watermarkStyles.text}>{locationText}</Text>
            </View>
          ) : null}

          {address ? (
            <View style={watermarkStyles.infoRow}>
              <WatermarkLocationIcon size={14} color="#ffffff" />
              <Text style={watermarkStyles.text} numberOfLines={2}>
                {address}
              </Text>
            </View>
          ) : null}

          {time || date ? (
            <View style={watermarkStyles.infoRow}>
              <WatermarkClockIcon size={14} color="#ffffff" />
              <Text style={watermarkStyles.text}>
                {[time, date].filter(Boolean).join(' - ')}
              </Text>
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default Watermark;
