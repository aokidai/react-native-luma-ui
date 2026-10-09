import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
  FlatList,
} from 'react-native';
import LumaLoading from '../../LumaLoading';
import {WorkThreadAttachModel} from '../../../../../../../models/chat/thread/workThreadAttachModel';
import {renderIcon} from '../../../../../../../components/AttachmentDetail';
import {appColors} from '../../../../../../../constants/appColors';
import {extensionFile} from '../../../../../../../constants/extensionFile';
import {ImageGrid} from './ImageGrid';
import {strings} from '../../../../../../../languages/strings';
import DocumentItem from './DocumentItem';
import LumaImageView, {ViewImageModel} from '../../LumaImageView';
import {ImageSource} from 'react-native-vector-icons/Icon';

interface Props {
  listAttachment: WorkThreadAttachModel[];
  loadingFileId: number | string | null;
  thread?: boolean;
  onPress: (file: WorkThreadAttachModel) => void;
}

const AttachedFile: FC<Props> = props => {
  const {listAttachment, loadingFileId, thread, onPress} = props;

  const [listImage, setListImage] = useState<WorkThreadAttachModel[]>([]);
  const [listDocument, setListDocument] = useState<WorkThreadAttachModel[]>([]);
  const [indexImage, setIndexImage] = useState(-1);
  const [imageUrl, setImageUrl] = useState<ImageSource[]>([]);

  useEffect(() => {
    if (listAttachment) {
      const image = listAttachment.filter(file =>
        extensionFile.imageExtension.includes(
          `.${file.name.split('.').pop()}` || '',
        ),
      );
      const document = listAttachment.filter(
        file =>
          !extensionFile.imageExtension.includes(
            `.${file.name.split('.').pop()}` || '',
          ),
      );
      setListImage(image);
      setListDocument(document);

      const newList: ImageSource[] = [];

      image.forEach(e => {
        newList.push({uri: e.downloadUrl});
      });

      setImageUrl(newList);
    }
  }, [listAttachment]);

  return (
    <View
      style={[
        {
          marginTop: 8,
          justifyContent: 'center',
          flex: 1,
          gap: 8,
        },
        !thread && {
          alignItems: 'center',
        },
      ]}>
      {listImage.length > 0 && (
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
            gap: 6,
          }}>
          <Text
            style={{fontSize: 12, fontWeight: 600, color: appColors.gray}}
            allowFontScaling={false}>
            {strings.Picture.toUpperCase()} ({listImage.length})
          </Text>
          <ImageGrid
            images={listImage}
            height={150}
            gap={4}
            onImagePress={(img, index) => {
              setIndexImage(index);
            }}
            loadingFileId={loadingFileId}
          />
        </View>
      )}
      {listDocument.length > 0 && (
        <View
          style={{
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            width: '100%',
            gap: 6,
          }}>
          <Text
            style={{fontSize: 12, fontWeight: 600, color: appColors.gray}}
            allowFontScaling={false}>
            {strings.Document.toUpperCase()} ({listDocument.length})
          </Text>

          <FlatList
            data={listDocument}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            contentContainerStyle={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              width: '100%',
            }}
            ItemSeparatorComponent={() => <View style={{height: 6}} />}
            renderItem={({item: file, index}) => {
              const isThisFileLoading = loadingFileId === file.id;
              return (
                <DocumentItem
                  file={file}
                  loadingFileId={loadingFileId}
                  onPress={onPress}
                  isThisFileLoading={isThisFileLoading}
                />
              );
            }}
          />
        </View>
      )}
      <LumaImageView
        open={indexImage >= 0}
        onClose={() => setIndexImage(-1)}
        imageUrl={imageUrl}
        imageBackgroundUrl={imageUrl}
        imageIndex={indexImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AttachedFile;
