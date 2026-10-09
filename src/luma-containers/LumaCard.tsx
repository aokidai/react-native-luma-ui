import {FC, ReactNode, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {appColors} from '../../../../../constants/appColors';
import {SystemUtils} from '../../../../../utils/system';
import useAppTheme from '../../../../../hooks/useAppTheme';
import {Clock} from 'iconsax-react-native';
import {strings} from '../../../../../languages/strings';
import LumaUser from './LumaUser';
import Svg, {Defs, RadialGradient, Rect, Stop} from 'react-native-svg';
import {Divider} from 'react-native-paper';

interface Props {
  priority?: string;
  priorityColor?: string;
  status?: string;
  statusColor?: string;
  content?: string;
  subContent?: string;
  time?: string;
  userEmail?: string;
  onPress?: () => void;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  onLongPress?: () => void;
  borderRadius?: number;
  leftLine?: string;
  gradient?: string;
  customContent?: ReactNode;
  backgroundColor?: string;
}

const LumaCard: FC<Props> = props => {
  const {
    priority,
    priorityColor = appColors.primary4,
    status,
    statusColor = appColors.primary4,
    content,
    subContent,
    time,
    userEmail,
    onPress,
    onLongPress,
    children,
    style,
    borderRadius = 16,
    leftLine,
    gradient,
    customContent,
    backgroundColor,
  } = props;
  const themeColor = useAppTheme();

  const [statusLabel, setStatusLabel] = useState(statusColor);

  useEffect(() => {
    if (!statusColor) {
      switch (status) {
        case strings.Deny:
        case strings.Late:
        case strings.Denied:
        case strings.CancelVote:
          setStatusLabel('#910000');
          break;
        case strings.Finish:
          setStatusLabel('#1B7C31');
          break;

        case strings.WaitingForApproval:
          setStatusLabel('#C16C07');
          break;

        default:
          setStatusLabel(appColors.primary);
          break;
      }
    }
  }, [status, statusColor]);

  const [contentHeight, setContentHeight] = useState(0);

  const renderCard = () => {
    return (
      <>
        {priority && (
          <View style={[styles.flexRow, {flexWrap: 'wrap', gap: 6}]}>
            {priority ? (
              <View
                style={[
                  styles.tag,
                  {backgroundColor: SystemUtils.addAlpha(priorityColor, 0.1)},
                ]}>
                <Text
                  style={{color: priorityColor, fontWeight: 600, fontSize: 12}}>
                  {priority}
                </Text>
              </View>
            ) : (
              <View />
            )}
          </View>
        )}
        {content && <Text style={styles.content}>{content}</Text>}

        {subContent && (
          <Text style={[styles.subContent, {color: themeColor}]}>
            {subContent}
          </Text>
        )}

        {customContent && customContent}

        {(userEmail || time) && (
          <>
            {(priority || content || subContent || customContent) && (
              <Divider style={{backgroundColor: appColors.lumaDivider2}} bold />
            )}
            <View
              style={[
                styles.flexRow,
                {
                  flexWrap: 'wrap',
                  gap: 6,
                },
              ]}>
              {userEmail && <LumaUser userEmail={userEmail} />}
              {time && (
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                  <Clock size={16} color={appColors.gray} />
                  <Text
                    style={{
                      color: appColors.gray,
                      fontSize: 12,
                      fontWeight: 600,
                    }}>
                    {time}
                  </Text>
                </View>
              )}
            </View>
          </>
        )}
        {status && (
          <View
            style={{
              flexDirection: 'row',
              gap: 4,
              alignItems: 'center',
            }}>
            <Text style={{color: statusLabel, fontWeight: 600, fontSize: 12}}>
              {status}
            </Text>
          </View>
        )}
        {children}
      </>
    );
  };

  const cardGlowId = useRef(
    `cardGlow_${Math.random().toString(36).substring(2, 9)}`,
  ).current;

  const softCornerGlow = () => {
    if (!gradient || contentHeight <= 0) {
      return null;
    }

    return (
      <View
        style={[
          {
            position: 'absolute',
            width: '100%',
            height: contentHeight,
            borderRadius: borderRadius,
            overflow: 'hidden',
            right: 0,
            top: 0,
          },
        ]}
        pointerEvents="none">
        <Svg height={contentHeight} width="100%">
          <Defs>
            <RadialGradient
              id={cardGlowId}
              cx="1"
              cy="0.5"
              rx="0.5"
              ry="1"
              fx="1"
              fy="0.5"
              gradientUnits="objectBoundingBox">
              <Stop offset="0%" stopColor={gradient} stopOpacity="0.1" />
              <Stop offset="50%" stopColor={gradient} stopOpacity="0.05" />
              <Stop offset="100%" stopColor={appColors.white} stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect
            x="0"
            y="0"
            width="100%"
            height={contentHeight}
            fill={`url(#${cardGlowId})`}
          />
        </Svg>
      </View>
    );
  };

  return (
    <>
      {onPress || onLongPress ? (
        <TouchableOpacity
          onLayout={e => setContentHeight(e.nativeEvent.layout.height)}
          onPress={onPress}
          onLongPress={onLongPress}
          activeOpacity={0.5}
          style={[
            styles.container,
            {borderRadius: borderRadius, position: 'relative', overflow: 'hidden'},
            leftLine
              ? {
                  borderLeftWidth: 4,
                  borderLeftColor: leftLine,
                  borderTopWidth: 1,
                  borderTopColor: SystemUtils.addAlpha(themeColor, 0.1),
                  borderRightWidth: 1,
                  borderRightColor: SystemUtils.addAlpha(themeColor, 0.1),
                  borderBottomWidth: 1,
                  borderBottomColor: SystemUtils.addAlpha(themeColor, 0.1),
                }
              : {
                  borderWidth: 1,
                  borderColor: SystemUtils.addAlpha(themeColor, 0.1),
                },
            backgroundColor && {
              backgroundColor: backgroundColor,
            },
            style,
          ]}>
          {gradient && softCornerGlow()}
          {renderCard()}
        </TouchableOpacity>
      ) : (
        <View
          onLayout={e => setContentHeight(e.nativeEvent.layout.height)}
          style={[
            styles.container,
            {borderRadius: borderRadius, position: 'relative', overflow: 'hidden'},
            leftLine
              ? {
                  borderLeftWidth: 4,
                  borderLeftColor: leftLine,
                  borderTopWidth: 1,
                  borderTopColor: SystemUtils.addAlpha(themeColor, 0.1),
                  borderRightWidth: 1,
                  borderRightColor: SystemUtils.addAlpha(themeColor, 0.1),
                  borderBottomWidth: 1,
                  borderBottomColor: SystemUtils.addAlpha(themeColor, 0.1),
                }
              : {
                  borderWidth: 1,
                  borderColor: SystemUtils.addAlpha(themeColor, 0.1),
                },
            backgroundColor && {
              backgroundColor: backgroundColor,
            },
            style,
          ]}>
          {gradient && softCornerGlow()}
          {renderCard()}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    backgroundColor: appColors.lumaTransparentWhite,
    padding: 12,
    overflow: 'hidden',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  content: {
    color: appColors.text,
    fontWeight: 600,
  },
  subContent: {
    fontWeight: 500,
    fontSize: 13,
  },
});

export default LumaCard;
