import React, {memo, useMemo} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
} from 'react-native';
import {WorkThreadAttachModel} from '../../../../../../../models/chat/thread/workThreadAttachModel';
import {appColors} from '../../../../../../../constants/appColors';
import LumaLoading from '../../LumaLoading';

interface ImageGridProps {
  images: WorkThreadAttachModel[];
  onImagePress: (image: WorkThreadAttachModel, index: number) => void;
  gap?: number;
  height?: number;
  singleRowHeight?: number;
  loadingFileId?: string | number | null;
}

const ImageGridComponent: React.FC<ImageGridProps> = props => {
  const {
    images,
    onImagePress,
    gap = 4,
    height = 300,
    singleRowHeight = 100,
    loadingFileId,
  } = props;

  if (!images || images.length === 0) return null;

  const rows = useMemo(() => {
    const total = images.length;
    const result: {
      items: {
        url: string;
        originalIndex: number;
        image: WorkThreadAttachModel;
      }[];
    }[] = [];

    const indexedImages = images.map((image, index) => ({
      url: image.viewUrl,
      originalIndex: index,
      image: image,
    }));

    if (total === 1) {
      result.push({items: indexedImages});
    } else if (total === 2) {
      result.push({items: indexedImages});
    } else if (total === 3) {
      result.push({items: indexedImages});
    } else if (total === 4) {
      result.push({items: indexedImages.slice(0, 2)});
      result.push({items: indexedImages.slice(2, 4)});
    } else if (total === 5) {
      result.push({items: indexedImages.slice(0, 3)});
      result.push({items: indexedImages.slice(3, 5)});
    } else {
      for (let i = 0; i < total; i += 3) {
        result.push({items: indexedImages.slice(i, i + 3)});
      }
    }

    return result;
  }, [images]);

  const totalRows = rows.length;

  const actualGridHeight = useMemo(() => {
    return totalRows === 1 ? singleRowHeight : height;
  }, [totalRows, singleRowHeight, height]);

  const totalVerticalGap = (totalRows - 1) * gap;
  const rowHeight = (actualGridHeight - totalVerticalGap) / totalRows;

  const renderRow = ({
    item: row,
    index: rowIndex,
  }: {
    item: {
      items: {
        url: string;
        originalIndex: number;
        image: WorkThreadAttachModel;
      }[];
    };
    index: number;
  }) => {
    const isLastRow = rowIndex === totalRows - 1;

    return (
      <View
        style={[
          styles.row,
          {
            height: rowHeight,
            marginBottom: isLastRow ? 0 : gap,
          },
        ]}>
        {row.items.map(img => {
          const isThisFileLoading = loadingFileId === img.image.id;

          return (
            <TouchableOpacity
              key={img.originalIndex}
              activeOpacity={0.8}
              style={[styles.imageContainer, {marginHorizontal: gap / 2}]}
              onPress={() => onImagePress(img.image, img.originalIndex)}>
              {isThisFileLoading && <LumaLoading />}
              <Image
                source={{uri: img.url}}
                style={styles.image}
                resizeMode="cover"
                resizeMethod={'resize'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={[styles.container, {height: actualGridHeight}]}>
      <FlatList
        data={rows}
        keyExtractor={(_, index) => `row-${index}`}
        renderItem={renderRow}
        removeClippedSubviews={true}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  imageContainer: {
    flex: 1,
    height: '100%',
    borderRadius: 6,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: appColors.threadBorderColor,
    borderRadius: 12,
  },
});

export const ImageGrid = memo(ImageGridComponent, (prevProps, nextProps) => {
  return (
    prevProps.height === nextProps.height &&
    prevProps.images.length === nextProps.images.length &&
    prevProps.loadingFileId === nextProps.loadingFileId &&
    prevProps.images.every(
      (img, idx) => img.viewUrl === nextProps.images[idx]?.viewUrl,
    )
  );
});
