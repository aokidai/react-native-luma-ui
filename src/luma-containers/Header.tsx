import {CommonActions, useNavigation} from '@react-navigation/native';
import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {appColors} from '../../../../../constants/appColors';
import LumaButton, {lumaButtonSize} from './LumaButton';
import {ArrowLeft2} from 'iconsax-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ChatThreadModel} from '../../../../../models/chat/thread/chatThreadModel';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Tooltip} from 'react-native-paper';
import useAppTheme from '../../../../../hooks/useAppTheme';
import {LumaProgressBar} from './LumaProgressBar';
import {useSelector} from 'react-redux';
import {systemColorSelector} from '../../../../../redux/system/systemColor';
import {SystemUtils} from '../../../../../utils/system';

interface Props {
  onNavigate: () => void;
  backRoute?: string;
  chatThreadData?: ChatThreadModel | undefined;
  headerTitleOpacity: any;
  headerTranslateY: any;
  title?: string;
  onBack?: () => void;
  action?: ReactNode;
  titleAction?: ReactNode;
  notification?: boolean;
  noBack?: boolean;
  description?: string;
  chatGoBack?: () => void;
  children?: ReactNode;
  childrenGap?: number;
  headerBackground?: string;
  titleImage?: ReactNode;
  customDescription?: ReactNode;
  titleTooltip?: boolean;
  onTitlePress?: () => void;
  loading?: boolean;
  leader?: ReactNode;
  scrollY?: any;
  customOnly?: boolean;
  navigationRef?: any;
  unNavigation?: boolean;
  modalHeader?: boolean;
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Header = (props: Props) => {
  const {
    onNavigate,
    backRoute,
    chatThreadData,
    headerTitleOpacity,
    headerTranslateY,
    title,
    onBack,
    action,
    titleAction,
    notification,
    noBack = false,
    description,
    chatGoBack,
    children,
    childrenGap = 8,
    headerBackground,
    titleImage,
    customDescription,
    titleTooltip = false,
    onTitlePress,
    loading,
    leader,
    scrollY,
    customOnly,
    navigationRef,
    unNavigation,
    modalHeader,
  } = props;
  const navigation: any = unNavigation
    ? null
    : (navigationRef ?? useNavigation());
  const insets = useSafeAreaInsets();
  const themeColor = useAppTheme();
  const realHeightRef = useRef(0);
  const realControllerHeightRef = useRef(0);
  const animProgress = useRef(new Animated.Value(0)).current;
  const selectedColorSelector = useSelector(systemColorSelector);
  const isHeaderHiddenRef = useRef(false);

  useEffect(() => {
    if (animProgress && typeof animProgress.addListener === 'function') {
      const listenerId = animProgress.addListener(({value}) => {
        isHeaderHiddenRef.current = value >= 0.9;
      });

      return () => {
        animProgress.removeListener(listenerId);
      };
    }
  }, [animProgress]);

  useEffect(() => {
    if (scrollY && typeof scrollY.addListener === 'function') {
      const listenerId = scrollY.addListener(({value}: {value: number}) => {
        const SCROLL_THRESHOLD = 50;
        const progress = Math.min(Math.max(value / SCROLL_THRESHOLD, 0), 1);

        Animated.timing(animProgress, {
          toValue: progress,
          duration: 0,
          useNativeDriver: false,
        }).start();
      });

      return () => {
        scrollY.removeListener(listenerId);
      };
    }
  }, [scrollY]);

  const gradient2Opacity = animProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const insetsTop = modalHeader
    ? Platform.OS === 'android'
      ? 0
      : insets.top
    : insets.top;

  const baseHeight = insetsTop + (46 - lumaButtonSize);

  const handleLayout = (event: LayoutChangeEvent) => {
    const {height: measuredHeight} = event.nativeEvent.layout;

    if (measuredHeight > 0 && scrollY) {
      realHeightRef.current = measuredHeight;
    }
  };

  const handleControllerLayout = (event: LayoutChangeEvent) => {
    const {height: measuredHeight} = event.nativeEvent.layout;

    if (measuredHeight > 0 && scrollY) {
      realControllerHeightRef.current =
        measuredHeight < 37 ? 37 : measuredHeight;
    }
  };

  const hasScrollAnim = useRef(new Animated.Value(scrollY ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(hasScrollAnim, {
      toValue: scrollY ? 1 : 0,
      duration: 10,
      useNativeDriver: false,
    }).start();
  }, [scrollY]);

  const noScrollGradientOpacity = hasScrollAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const withScrollGradientsOpacity = hasScrollAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const expandedHeight =
    baseHeight +
    (realHeightRef.current + realControllerHeightRef.current) +
    (Platform.OS === 'ios' ? 8 : 0);

  const animatedFinalHeight = gradient2Opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [expandedHeight, baseHeight],
    extrapolate: 'clamp',
  });

  const color = (opacity: number, custom?: boolean) => {
    const primaryColor = selectedColorSelector?.primary || '#f2f4f7';

    if (selectedColorSelector?.secondary) {
      const newColor = SystemUtils.lightenColor(
        primaryColor,
        custom ? 0.97 : 0.93,
      );

      return SystemUtils.addAlpha(newColor, opacity) ?? '#f2f4f7';
    }

    return SystemUtils.addAlpha(primaryColor, opacity) ?? '#f2f4f7';
  };

  return (
    <View style={{position: 'relative', width: '100%'}}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor="transparent"
      />

      <Animated.View
        style={[
          styles.blurContainer,
          {
            height: isHeaderHiddenRef.current
              ? baseHeight
              : animatedFinalHeight,
          },
        ]}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {opacity: withScrollGradientsOpacity},
          ]}>
          <AnimatedLinearGradient
            colors={[
              color(1) ?? '#f2f4f7',
              color(0.9) ?? '#f2f4f7',
              color(0.8) ?? '#f2f4f7',
              color(0.7) ?? '#f2f4f7',
              color(0.6) ?? '#f2f4f7',
              color(0.5) ?? '#f2f4f7',
              color(0.4) ?? '#f2f4f7',
              color(0.3) ?? '#f2f4f7',
              color(0.2) ?? '#f2f4f7',
              color(0.1) ?? '#f2f4f7',
              color(0) ?? '#f2f4f7',
            ]}
            locations={[0, 0.5, 0.55, 0.6, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1]}
            style={[StyleSheet.absoluteFill, {opacity: gradient2Opacity}]}
          />
        </Animated.View>

        <AnimatedLinearGradient
          colors={[
            color(1) ?? '#f2f4f7',
            color(0.9) ?? '#f2f4f7',
            color(0.8) ?? '#f2f4f7',
            color(0.7) ?? '#f2f4f7',
            color(0.6) ?? '#f2f4f7',
            color(0.5) ?? '#f2f4f7',
            color(0.4) ?? '#f2f4f7',
            color(0.3) ?? '#f2f4f7',
            color(0.2) ?? '#f2f4f7',
            color(0.1) ?? '#f2f4f7',
            color(0) ?? '#f2f4f7',
          ]}
          locations={[0, 0.5, 0.55, 0.6, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1]}
          style={[StyleSheet.absoluteFill, {opacity: noScrollGradientOpacity}]}
        />
      </Animated.View>
      {scrollY && (
        <Animated.View
          pointerEvents={isHeaderHiddenRef.current ? 'none' : 'auto'}
          style={[
            {
              width: '100%',
              height: expandedHeight,
              opacity: headerTitleOpacity,
              transform: [{translateY: headerTranslateY}],
              position: 'absolute',
              zIndex: 2,
              backgroundColor: color(0.98, true),
            },
          ]}
        />
      )}
      {!customOnly && (
        <View
          pointerEvents={
            isHeaderHiddenRef.current && Platform.OS === 'android'
              ? 'auto'
              : undefined
          }
          style={{
            position: 'absolute',
            left: 12,
            top: insetsTop + 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            right: 12,
            zIndex: 99,
            gap: 12,
          }}>
          {headerBackground && (
            <Animated.View
              style={[
                {
                  opacity: headerTitleOpacity,
                  transform: [{translateY: headerTranslateY}],
                  position: 'absolute',
                  backgroundColor: headerBackground,
                  height: 44 + childrenGap + insetsTop + 12,
                  width: Dimensions.get('window').width,
                  right: -12,
                  top: -(insetsTop + 12),
                  zIndex: -9,
                  elevation: -9,
                },
              ]}
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              flex: 1,
            }}>
            {leader
              ? leader
              : !noBack && (
                  <View style={{height: '100%'}}>
                    <LumaButton
                      icon={size => (
                        <ArrowLeft2 size={size} color={appColors.lumaBlack} />
                      )}
                      onPress={
                        notification
                          ? () => {
                              navigation.dispatch(
                                CommonActions.reset({
                                  index: 1,
                                  routes: [
                                    {
                                      name: 'HomeRoot',
                                      state: {
                                        routes: [
                                          {
                                            name: 'HomeNavigator',
                                            state: {
                                              routes: [{name: 'HomeScreen'}],
                                            },
                                          },
                                        ],
                                      },
                                    },
                                  ],
                                }),
                              );
                            }
                          : onBack
                            ? () => onBack()
                            : () => {
                                if (backRoute) {
                                  onNavigate();
                                } else {
                                  chatGoBack && chatGoBack();
                                }
                              }
                      }
                    />
                  </View>
                )}
            {(chatThreadData || title || customDescription) && (
              <Animated.View
                onLayout={handleControllerLayout}
                style={[
                  {
                    opacity: headerTitleOpacity,
                    transform: [{translateY: headerTranslateY}],
                    paddingRight: customDescription ? 0 : 8,
                    flex: 1,
                    gap: 4,
                    flexDirection: 'row',
                  },
                ]}>
                {customDescription && customDescription}
                {titleImage && titleImage}
                {(title || onTitlePress) && (
                  <View
                    style={[
                      {
                        flex: 1,
                        gap: 2,
                      },
                    ]}>
                    {onTitlePress ? (
                      <TouchableOpacity onPress={onTitlePress}>
                        <Text
                          allowFontScaling={false}
                          style={styles.title}
                          numberOfLines={
                            description || customDescription ? 1 : 2
                          }>
                          {chatThreadData ? chatThreadData.chat.name : title}
                        </Text>
                      </TouchableOpacity>
                    ) : titleTooltip ? (
                      <Tooltip
                        enterTouchDelay={0}
                        title={
                          chatThreadData
                            ? chatThreadData.chat.name
                            : (title ?? '')
                        }>
                        <Text
                          allowFontScaling={false}
                          style={styles.title}
                          numberOfLines={
                            description || customDescription ? 1 : 2
                          }>
                          {chatThreadData ? chatThreadData.chat.name : title}
                        </Text>
                      </Tooltip>
                    ) : (
                      <Text
                        allowFontScaling={false}
                        style={styles.title}
                        numberOfLines={
                          description || customDescription ? 1 : 2
                        }>
                        {chatThreadData ? chatThreadData.chat.name : title}
                      </Text>
                    )}

                    {description && (
                      <Text
                        allowFontScaling={false}
                        numberOfLines={2}
                        style={styles.description}>
                        {description.replace(/<\/?[^>]+(>|$)/g, '')}
                      </Text>
                    )}
                  </View>
                )}
              </Animated.View>
            )}
          </View>

          {titleAction && action && (
            <Animated.View
              style={[
                {
                  opacity: headerTitleOpacity,
                  transform: [{translateY: headerTranslateY}],
                  backgroundColor: appColors.lumaBackground,
                  borderColor: appColors.white,
                  borderWidth: 2,
                  gap: 8,
                  position: 'absolute',
                  height: 44,
                  width: 96,
                  right: -2,
                  top: -2,
                  borderRadius: 54,
                },
              ]}
            />
          )}
          {(titleAction || action) && (
            <View>
              {titleAction && (
                <Animated.View
                  style={[
                    {
                      opacity: headerTitleOpacity,
                      transform: [{translateY: headerTranslateY}],
                      marginRight: action ? 12 : 0,
                    },
                  ]}>
                  {titleAction}
                </Animated.View>
              )}
              {action && action}
            </View>
          )}
        </View>
      )}

      {loading && (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            top: insetsTop,
            opacity: 1,
            zIndex: 999,
            elevation: 999,
          }}>
          <LumaProgressBar />
        </View>
      )}

      {children && (
        <Animated.View
          onLayout={handleLayout}
          style={[
            {
              width: '100%',
              opacity: headerTitleOpacity,
              transform: [{translateY: headerTranslateY}],
              position: 'absolute',
              top: !customOnly
                ? insetsTop +
                  56 +
                  childrenGap -
                  lumaButtonSize +
                  (Platform.OS === 'ios' ? 16 : 8)
                : insetsTop,
              zIndex: 9999,
              elevation: 9999,
            },
          ]}>
          {children}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    overflow: 'hidden',
    zIndex: 2,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: appColors.lumaBlack,
  },
  description: {
    fontSize: 12,
    color: appColors.threadGrayText,
  },
});

export default Header;
