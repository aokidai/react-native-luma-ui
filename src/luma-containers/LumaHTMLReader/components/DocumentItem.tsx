import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Platform} from 'react-native';
import {WorkThreadAttachModel} from '../../../../../../../models/chat/thread/workThreadAttachModel';
import LumaLoading from '../../LumaLoading';
import {
  renderIcon,
  renderTextIcon,
} from '../../../../../../../components/AttachmentDetail';
import {appColors} from '../../../../../../../constants/appColors';
import LumaUser from '../../LumaUser';
import {SystemUtils} from '../../../../../../../utils/system';

interface Props {
  file: WorkThreadAttachModel;
  loadingFileId?: string | number | null;
  onPress: (file: WorkThreadAttachModel) => void;
  isThisFileLoading: boolean;
}

const DocumentItem: FC<Props> = props => {
  const {file, onPress, isThisFileLoading} = props;

  return (
    <TouchableOpacity
      key={file.id}
      onPress={() => onPress(file)}
      style={[
        styles.container,
        {
          paddingBottom: 4,
          backgroundColor: SystemUtils.lightenColor(
            renderTextIcon(`.${file.name.split('.').pop()}`)?.color,
            0.9,
          ),
        },
      ]}>
      {isThisFileLoading && <LumaLoading />}
      <View
        style={{
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: renderTextIcon(`.${file.name.split('.').pop()}`)
            ?.color,
          borderRadius: 8,
          padding: 4,
        }}>
        <Text
          style={{color: appColors.white, fontSize: 10, fontWeight: 'bold'}}
          allowFontScaling={false}>
          {renderTextIcon(`.${file.name.split('.').pop()}`)?.text.toUpperCase()}
        </Text>
      </View>
      <View style={{gap: 4, maxWidth: '85%'}}>
        <Text
          style={{
            color: appColors.text,
            fontWeight: '600',
          }}
          numberOfLines={1}
          allowFontScaling={false}>
          {file.name}
        </Text>
        {/* <LumaUser userEmail={file.createdBy} nameSize={12} /> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'flex-start',
    width: '100%',
    padding: 8,
    borderRadius: 8,
  },
});

export default DocumentItem;
