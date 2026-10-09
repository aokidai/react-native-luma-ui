import {View, Text} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {strings} from '../../../../../languages/strings';
import {appColors} from '../../../../../constants/appColors';
import useAppTheme from '../../../../../hooks/useAppTheme';
import {SystemUtils} from '../../../../../utils/system';
import LumaBottomAlert from './LumaBottomAlert';
import {FC} from 'react';

interface Props {
  label?: string;
}

const LumaLoading: FC<Props> = props => {
  const {label = strings.OpeningFile} = props;

  const themeColor = useAppTheme();

  const isSuccess = label === strings.DownloadSuccessfully;
  const isFailed = label === strings.DownloadFailed;

  return (
    <LumaBottomAlert visible={true} onClose={() => {}}>
      <View style={{paddingVertical: 28, justifyContent: 'center', gap: 18}}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          {isSuccess && (
            <MaterialIcons
              name="check"
              size={22}
              color={appColors.processActive || '#299A3B'}
            />
          )}
          {isFailed && (
            <MaterialIcons
              name="close"
              size={22}
              color={appColors.danger || '#EA4A4A'}
            />
          )}
          <Text style={{color: appColors.text, fontWeight: 600, fontSize: 16}}>
            {label}
          </Text>
        </View>
        {!isSuccess && !isFailed && (
          <ProgressBar
            indeterminate={true}
            color={themeColor}
            style={[{backgroundColor: SystemUtils.addAlpha(themeColor, 0.1)}]}
          />
        )}
      </View>
    </LumaBottomAlert>
  );
};

export default LumaLoading;
