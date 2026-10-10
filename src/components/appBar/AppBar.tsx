import type { FC, ReactNode } from 'react';
import {
  StatusBar,
  type StyleProp,
  StyleSheet,
  Text as RNText,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appBarStyles } from '../../styles/appBar/appBar';
import { colorSystem } from '../../utils/colorSystem';
import { height } from '../../utils/size';
import Text from '../text/Text';

export interface AppBarProps {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  leader?: ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  actions?: ReactNode[];
  backgroundColor?: string;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  centerTitle?: boolean;
  /**
   * Tự động thêm padding top bằng chiều cao status bar để nền AppBar tràn lên status bar.
   * Mặc định là `true` khi sử dụng bên trong Scaffold.
   */
  safeAreaTop?: boolean;
}

const ArrowBackIcon: FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = colorSystem.onSurface,
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
        position: 'absolute',
        width: size * 0.65,
        height: 2,
        backgroundColor: color,
        borderRadius: 1,
      }}
    />
    <View
      style={{
        position: 'absolute',
        left: size * 0.2,
        width: size * 0.38,
        height: size * 0.38,
        borderLeftWidth: 2,
        borderTopWidth: 2,
        borderColor: color,
        transform: [{ rotate: '-45deg' }],
      }}
    />
  </View>
);

const AppBar: FC<AppBarProps> = (props) => {
  const {
    title,
    subtitle,
    children,
    leader,
    showBack,
    onBack,
    actions,
    backgroundColor = colorSystem.background,
    titleStyle,
    subtitleStyle,
    style,
    centerTitle = false,
    safeAreaTop = false,
  } = props;

  const insets = useSafeAreaInsets();
  const topInset = safeAreaTop ? insets.top || StatusBar.currentHeight || 0 : 0;

  const renderLeader = () => {
    if (leader) return leader;
    if (showBack || onBack) {
      return (
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ArrowBackIcon size={24} color={colorSystem.onSurface} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View
      style={[
        appBarStyles.appBar,
        { backgroundColor },
        topInset > 0 && {
          paddingTop: topInset,
          minHeight: height.xl + topInset,
        },
        style,
      ]}
    >
      <View
        style={[
          appBarStyles.leader,
          centerTitle && { justifyContent: 'flex-start' },
        ]}
      >
        {renderLeader()}
        {(title || subtitle) && (
          <View
            style={[
              appBarStyles.titleContainer,
              centerTitle && { alignItems: 'center' },
            ]}
          >
            {title && (
              <Text theme="titleLarge" style={titleStyle}>
                {title}
              </Text>
            )}
            {subtitle && (
              <RNText
                style={[styles.subtitle, subtitleStyle]}
                numberOfLines={1}
              >
                {subtitle}
              </RNText>
            )}
          </View>
        )}
        {children}
      </View>

      {actions && actions.length > 0 && (
        <View style={appBarStyles.actions}>
          {actions.map((action, index) => (
            <View key={index}>{action}</View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 4,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: colorSystem.gray[600],
    marginTop: 2,
  },
});

export default AppBar;
