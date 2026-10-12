import React, { type FC, type ReactNode, useEffect, useState } from 'react';
import {
  Image,
  Modal,
  StatusBar,
  type StyleProp,
  Text,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { imageViewStyles } from '../../styles/imageView/imageView';

export type ImageSourceItem = { uri: string; [key: string]: any } | string;

export interface ImageViewProps {
  open: boolean;
  onClose: () => void;
  images: ImageSourceItem[];
  imageIndex?: number;
  onIndexChange?: (index: number) => void;
  onShare?: (image: ImageSourceItem) => void;
  onDownload?: (image: ImageSourceItem) => void;
  header?: ReactNode;
  footer?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const getImageUri = (item?: ImageSourceItem): string | undefined => {
  if (!item) return undefined;
  if (typeof item === 'string') return item;
  return item.uri;
};

const ImageViewCloseIcon: FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = '#ffffff',
}) => {
  const barLength = size * 0.6;
  return (
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
          position: 'absolute',
          width: barLength,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
          transform: [{ rotate: '45deg' }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: barLength,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
          transform: [{ rotate: '-45deg' }],
        }}
      />
    </View>
  );
};

const ImageViewChevronLeft: FC<{ size?: number; color?: string }> = ({
  size = 32,
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
        width: size * 0.35,
        height: size * 0.35,
        borderLeftWidth: 2.5,
        borderBottomWidth: 2.5,
        borderColor: color,
        transform: [{ rotate: '45deg' }, { translateX: size * 0.05 }],
      }}
    />
  </View>
);

const ImageViewChevronRight: FC<{ size?: number; color?: string }> = ({
  size = 32,
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
        width: size * 0.35,
        height: size * 0.35,
        borderRightWidth: 2.5,
        borderTopWidth: 2.5,
        borderColor: color,
        transform: [{ rotate: '45deg' }, { translateX: -size * 0.05 }],
      }}
    />
  </View>
);

const ImageViewShareIcon: FC<{ size?: number; color?: string }> = ({
  size = 18,
  color = '#ffffff',
}) => {
  return (
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
          position: 'absolute',
          left: 1,
          top: size / 2 - 2.5,
          width: 5,
          height: 5,
          borderRadius: 2.5,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: 1,
          top: 1,
          width: 5,
          height: 5,
          borderRadius: 2.5,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: 1,
          bottom: 1,
          width: 5,
          height: 5,
          borderRadius: 2.5,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: size * 0.62,
          height: 1.6,
          backgroundColor: color,
          transform: [{ rotate: '-32deg' }, { translateY: -size * 0.1 }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: size * 0.62,
          height: 1.6,
          backgroundColor: color,
          transform: [{ rotate: '32deg' }, { translateY: size * 0.1 }],
        }}
      />
    </View>
  );
};

const ImageViewDownloadIcon: FC<{ size?: number; color?: string }> = ({
  size = 18,
  color = '#ffffff',
}) => {
  return (
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
          position: 'absolute',
          top: 2,
          width: 2,
          height: size * 0.52,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: size * 0.32,
          width: size * 0.38,
          height: size * 0.38,
          borderBottomWidth: 2,
          borderRightWidth: 2,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 1,
          width: size * 0.78,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
    </View>
  );
};

const ImageView: FC<ImageViewProps> = (props) => {
  const {
    open,
    onClose,
    images = [],
    imageIndex = 0,
    onIndexChange,
    onShare,
    onDownload,
    header,
    footer,
    style,
  } = props;

  const insets = useSafeAreaInsets();
  const headerTop = insets.top > 0 ? insets.top + 8 : 44;
  const footerBottom = insets.bottom > 0 ? insets.bottom + 16 : 30;

  const [currentIndex, setCurrentIndex] = useState(imageIndex);

  useEffect(() => {
    setCurrentIndex(imageIndex);
  }, [imageIndex]);

  const handleIndexChange = (newIndex: number) => {
    setCurrentIndex(newIndex);
    if (onIndexChange) {
      onIndexChange(newIndex);
    }
  };

  const currentItem = images[currentIndex];
  const currentUri = getImageUri(currentItem);
  const totalCount = images.length;

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={[imageViewStyles.container, style]}>
        {/* Header */}
        {header ?? (
          <View style={[imageViewStyles.header, { top: headerTop }]}>
            <Text style={imageViewStyles.counterText}>
              {totalCount > 0 ? `${currentIndex + 1} / ${totalCount}` : ''}
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={imageViewStyles.closeButton}
              activeOpacity={0.7}
            >
              <ImageViewCloseIcon size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        )}

        {/* Previous Button */}
        {currentIndex > 0 && (
          <TouchableOpacity
            style={[imageViewStyles.navButton, imageViewStyles.prevButton]}
            onPress={() => handleIndexChange(currentIndex - 1)}
            activeOpacity={0.7}
          >
            <ImageViewChevronLeft size={32} color="#ffffff" />
          </TouchableOpacity>
        )}

        {/* Main Image */}
        <View style={imageViewStyles.imageWrapper}>
          {currentUri ? (
            <Image
              source={{ uri: currentUri }}
              style={imageViewStyles.image}
              resizeMode="contain"
            />
          ) : null}
        </View>

        {/* Next Button */}
        {currentIndex < totalCount - 1 && (
          <TouchableOpacity
            style={[imageViewStyles.navButton, imageViewStyles.nextButton]}
            onPress={() => handleIndexChange(currentIndex + 1)}
            activeOpacity={0.7}
          >
            <ImageViewChevronRight size={32} color="#ffffff" />
          </TouchableOpacity>
        )}

        {/* Footer */}
        {footer ?? (
          <View style={[imageViewStyles.footer, { bottom: footerBottom }]}>
            {onShare && currentItem && (
              <TouchableOpacity
                style={imageViewStyles.actionButton}
                onPress={() => onShare(currentItem)}
                activeOpacity={0.7}
              >
                <ImageViewShareIcon size={18} color="#ffffff" />
                <Text style={imageViewStyles.actionButtonText}>Chia sẻ</Text>
              </TouchableOpacity>
            )}
            {onDownload && currentItem && (
              <TouchableOpacity
                style={imageViewStyles.actionButton}
                onPress={() => onDownload(currentItem)}
                activeOpacity={0.7}
              >
                <ImageViewDownloadIcon size={18} color="#ffffff" />
                <Text style={imageViewStyles.actionButtonText}>Tải về</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
};

export default ImageView;
