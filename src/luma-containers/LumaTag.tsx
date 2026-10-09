import {ReactNode, useState, useEffect} from 'react';
import {StyleProp, ViewStyle, TextStyle, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {appColors} from '../../../../../constants/appColors';
import {appSize} from '../../../../../constants/appSize';
import {strings} from '../../../../../languages/strings';
import {langDataSelector} from '../../../../../redux/reducers/dataLanguage';
import {global} from '../../../../../styles/global';

interface Props {
  text: string;
  color?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
  label?: string;
  marginRight?: number;
  iconPosition?: 'left' | 'right';
  borderColor?: string;
}

const LumaTag = ({
  text,
  color,
  textColor,
  style,
  textStyle,
  icon,
  label,
  marginRight = 8,
  iconPosition = 'right',
  borderColor,
}: Props) => {
  const languageData = useSelector(langDataSelector).data;

  const [backgroundColor, setBackgroundColor] = useState('#DFFDE4');
  const [labelColor, setLabelColor] = useState(appColors.text);

  useEffect(() => {
    switch (text) {
      case strings.Deny:
      case strings.Late:
      case strings.Denied:
      case strings.CancelVote:
        setBackgroundColor('#FFE3E3');
        setLabelColor('#910000');
        break;
      case strings.Finish:
        setBackgroundColor('#FFE3E3');
        setLabelColor('#1B7C31');
        break;

      case strings.WaitingForApproval:
        setBackgroundColor('#FFEFCF');
        setLabelColor('#C16C07');
        break;

      default:
        setBackgroundColor('#E3F1FF');
        setLabelColor(appColors.primary);
        break;
    }
  }, [text]);

  return (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 12,
          overflow: 'hidden',
          backgroundColor: color ?? backgroundColor,
          marginRight: marginRight,
          paddingHorizontal: 8,
          paddingVertical: 2,
          gap: 6,
        },
        borderColor && {
          borderWidth: 1,
          borderColor: borderColor,
        },
        style,
      ]}>
      {icon && iconPosition === 'left' && icon}
      <Text
        style={[
          {
            color: textColor
              ? textColor
              : labelColor
                ? labelColor
                : appColors.white,
            fontSize: 12,
          },
          textStyle,
        ]}
        numberOfLines={1}>
        {languageData
          ? languageData[`${text}`]
            ? languageData[`${text}`].replace('{{label}}', label ?? '')
            : text
          : text}
      </Text>
      {icon && iconPosition === 'right' && icon}
    </View>
  );
};

export default LumaTag;

