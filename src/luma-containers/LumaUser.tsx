import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {UserAvatar} from '../../../../../components/UserAvatar';
import {appColors} from '../../../../../constants/appColors';
import {PermissionWorkflowModel} from '../../../../../models/workflow/permissionWorkflowModel';
import {CommunityCompanyUtils} from '../../../../../utils/company/CommunityCompanyUtils';
import {useDispatch, useSelector} from 'react-redux';
import {companyUrlSelector} from '../../../../../redux/reducers/companyUrlReducer';
import {
  addWorkflowUser,
  workflowUserSelector,
} from '../../../../../redux/workflow/workflowUserReducer';
import uuid from 'react-native-uuid';
import {langSelector} from '../../../../../redux/reducers/languageReducer';
import getWorkflowApi from '../../../../../api/workflowapi';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  userEmail: string;
  avatarOnly?: boolean;
  size?: number;
  nameSize?: number;
  isCompress?: boolean;
  avatarNameSize?: number;
  fullName?: string;
  userId?: string | number;
}

const LumaUser: FC<Props> = props => {
  const {
    userEmail,
    avatarOnly = false,
    size = 20,
    nameSize = 13,
    isCompress = true,
    avatarNameSize,
    fullName,
    userId,
  } = props;
  const workflowUser = useSelector(workflowUserSelector);
  const companyUrl = useSelector(companyUrlSelector);
  const lang = useSelector(langSelector);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState<PermissionWorkflowModel>();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (workflowUser.length === 0) {
      getWorkflowUser();
    }
  }, [workflowUser]);

  const getWorkflowUser = async () => {
    const cachedWorkflowUser = await AsyncStorage.getItem('WORKFLOW_USER');

    if (cachedWorkflowUser) {
      dispatch(addWorkflowUser(JSON.parse(cachedWorkflowUser)));
    }

    try {
      const url = `/Permissions?isOnlyActivePersonalProfile=false&isOnlyPersonalProfile=true&lang=${lang}`;
      try {
        const res: any = await getWorkflowApi.getWorkflowApi(companyUrl, url);

        if (res) {
          dispatch(addWorkflowUser(res));

          await AsyncStorage.setItem('WORKFLOW_USER', JSON.stringify(res));
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error('Error fetching permission workflow:', error);
    }
  };

  useEffect(() => {
    if (!userId && userEmail && workflowUser.length > 0) {
      if (userEmail.includes('@')) {
        getUserData();
      } else {
        setUserName(userEmail);
      }
    }
  }, [userEmail, workflowUser, userId]);

  const getUserData = () => {
    const find = workflowUser.find(
      (item: PermissionWorkflowModel) => item.email === userEmail,
    );

    if (find) {
      setUserData(find);
    } else {
      setUserData({
        id: uuid.v4().toString(),
        title: '',
        note: '',
        userId: new Date().getTime(),
        staffId: uuid.v4().toString(),
        userStatus: 0,
        searchText: '',
        fullName: fullName ?? '',
        email: userEmail,
        accountName: userEmail,
        positionTitle: '',
        departmentTitle: '',
        mobile: '',
        internalPhone: '',
        linkAvatar: '',
      });
    }
  };

  return (
    <>
      {userEmail && userEmail.includes('@') && userData ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <UserAvatar
            data={{
              email: userData?.email,
              fullName: userData?.fullName,
              id: userData?.id.toString(),
              photoURL: `${
                CommunityCompanyUtils.getUrlWithTarget(
                  companyUrl,
                  'URL_WORKFLOW',
                )?.linkAPI
              }/api/personalProfiles/${userData.userId}/getThumbnailById?IsCompress=${isCompress}`,
            }}
            size={size}
            customAvatar
            layout={false}
            style={{
              marginRight: avatarOnly ? 0 : 4,
              borderWidth: 1,
              borderColor: appColors.threadGrayBorder,
            }}
            customFontSize={avatarNameSize}
            userEmail={userEmail}
          />
          {!avatarOnly && (
            <Text
              allowFontScaling={false}
              style={{
                color: appColors.gray8,
                fontSize: nameSize,
                fontWeight: 500,
              }}>
              {userData.fullName}
            </Text>
          )}
        </View>
      ) : userName ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <UserAvatar
            data={{
              email: userName,
              fullName: userName,
              id: '',
            }}
            size={size}
            customAvatar
            layout={false}
            style={{marginRight: 4}}
          />
          {!avatarOnly && (
            <Text
              allowFontScaling={false}
              style={{
                color: appColors.gray8,
                fontSize: nameSize,
                fontWeight: 500,
              }}>
              {userName}
            </Text>
          )}
        </View>
      ) : (
        userId && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <UserAvatar
              data={{
                email: userName,
                fullName: fullName ?? userName,
                id: userId.toString(),
                photoURL: `${
                  CommunityCompanyUtils.getUrlWithTarget(
                    companyUrl,
                    'URL_WORKFLOW',
                  )?.linkAPI
                }/api/personalProfiles/${userId && typeof userId === 'string' ? (userId.includes('P:') ? userId.replace('P:', '') : userId) : userId}/getThumbnailById?IsCompress=${isCompress}`,
              }}
              size={size}
              customAvatar
              layout={false}
              style={{
                marginRight: avatarOnly ? 0 : 4,
                borderWidth: 1,
                borderColor: appColors.threadGrayBorder,
              }}
              customFontSize={avatarNameSize}
              userEmail={userEmail}
            />
            {!avatarOnly && userName && (
              <Text
                allowFontScaling={false}
                style={{
                  color: appColors.gray8,
                  fontSize: nameSize,
                  fontWeight: 500,
                }}>
                {fullName}
              </Text>
            )}
          </View>
        )
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default LumaUser;
