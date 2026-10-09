import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  DeviceEventEmitter,
} from 'react-native';
import ChatModule from '../../../../../../../api/chatAPIs';
import {
  ChatThreadAllUserModel,
  ChatWorkModel,
  WorkStatusModel,
} from '../../../../../../../models/chat/thread/chatThreadModel';
import {appColors} from '../../../../../../../constants/appColors';
import ThreadMenu from '../../../ThreadMenu';
import ThreadDeadline from '../../../ThreadDeadline';
import ThreadUser from '../../../ThreadUser';
import {strings} from '../../../../../../../languages/strings';
import useAppTheme from '../../../../../../../hooks/useAppTheme';
import {ArrowRight, ArrowRight2, Task, TaskSquare} from 'iconsax-react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {companyUrlSelector} from '../../../../../../../redux/reducers/companyUrlReducer';

interface Props {
  workUrl: string;
  onOpenWorkUrl: () => void;
}

const WorkDetail: FC<Props> = props => {
  const {workUrl, onOpenWorkUrl} = props;
  const themeColor = useAppTheme();
  const companyUrl = useSelector(companyUrlSelector);

  const [workId, setWorkId] = useState('');
  const [workLoading, setWorkLoading] = useState(false);
  const [chatThreadWork, setChatThreadWork] = useState<ChatWorkModel>();

  useEffect(() => {
    const idT = workUrl.split('/');

    setWorkId(idT[idT.length - 1]);
  }, [workUrl]);

  useEffect(() => {
    if (workId) {
      fetchWorkChat(workId);
    }
  }, [workId]);

  const fetchWorkChat = async (id: string) => {
    setWorkLoading(true);
    try {
      const api = `/Work/${id}`;
      const res = await ChatModule.handleChatAPI(
        companyUrl,
        api,
        undefined,
        'get',
      );

      if (res.data) {
        setChatThreadWork(res.data);
      }
    } catch (e) {
      console.log('GetWorkChat error', e);
    }

    setWorkLoading(false);
  };

  const handleChangeStatus = async (workId: number, statusId: string) => {
    setWorkLoading(true);
    try {
      const api = `/Work/updateStatus?workId=${workId}&statusId=${statusId}`;

      await ChatModule.handleChatAPI(companyUrl, api, undefined, 'get');

      fetchWorkChat(workId.toString());
    } catch (e) {
      console.log('GetWorkChat error', e);
    }
    setWorkLoading(false);
  };

  return workLoading ? (
    <View style={{width: '100%', padding: 8}}>
      <View style={{flex: 1}}>
        <SkeletonPlaceholder backgroundColor={appColors.gray6}>
          <View
            style={{
              gap: 8,
              backgroundColor: 'yellow',
              width: '100%',
            }}>
            <View style={styles.lineLong} />
            <View style={styles.lineLong} />
          </View>
        </SkeletonPlaceholder>
      </View>
    </View>
  ) : chatThreadWork ? (
    <TouchableOpacity onPress={() => onOpenWorkUrl()} style={styles.container}>
      <Text style={styles.workTitle}>{chatThreadWork.title}</Text>
      <View
        style={[
          styles.flexRow,
          {
            justifyContent: 'space-between',
            width: '100%',
            flexWrap: 'wrap',
          },
        ]}>
        {chatThreadWork.statusType && chatThreadWork.statusName && (
          <ThreadMenu
            handleChangeStatus={() => {}}
            chatThreadWork={chatThreadWork}
            workStatus={[]}
            isLoading={false}
          />
        )}
        <ThreadUser
          data={chatThreadWork}
          handleUpdateWork={() => {}}
          finish={false}
          viewOnly
        />
      </View>
      {chatThreadWork.endDate && (
        <ThreadDeadline
          data={chatThreadWork}
          handleUpdateWork={() => {}}
          finish={false}
          system
        />
      )}
    </TouchableOpacity>
  ) : (
    <View style={[styles.container, {padding: 8}]}>
      <View style={[styles.flexRow, {gap: 8}]}>
        <TaskSquare color={appColors.gray} size={24} />
        <View
          style={[
            styles.flexCol,
            {
              width: '92%',
            },
          ]}>
          <Text style={styles.workTitle}>{strings.WorkNotAvailable}</Text>
          <Text style={styles.workDetail}>
            {strings.WorkNotAvailableDetail}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {gap: 8},
  workTitle: {
    marginTop: 4,
    fontWeight: '600',
    color: appColors.text,
  },
  workDetail: {
    color: appColors.gray,
    fontSize: 13,
  },
  flexRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  flexCol: {
    flexDirection: 'column',
    gap: 4,
  },
  actionButton: {
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
  },
  lineLong: {
    height: 15,
    borderRadius: 4,
    padding: 12,
  },
});

export default WorkDetail;
