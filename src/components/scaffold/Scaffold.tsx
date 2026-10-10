import React, { type FC, type ReactNode } from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';
import { type Edge, SafeAreaView } from 'react-native-safe-area-context';
import { scaffoldStyles } from '../../styles/scaffold/scaffold';
import AppStatusBar, { type AppStatusBarType } from './AppStatusBar';
import { colorSystem } from '../../utils/colorSystem';

export interface ScaffoldProps {
  children?: ReactNode;
  appBar?: ReactNode;
  bottomNavigationBar?: ReactNode;
  floatingActionButton?: ReactNode;
  backgroundColor?: string;
  statusBarColor?: string;
  barStyle?: AppStatusBarType;
  /**
   * Option 1: `edgeToEdge = true`: Xử lý tràn edge-to-edge (status bar trong suốt, tràn viền màn hình).
   * Option 2: `edgeToEdge = false` (mặc định): Giữ nguyên safe area tiêu chuẩn.
   */
  edgeToEdge?: boolean;
  translucentStatusBar?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  edges?: readonly Edge[];
}

const Scaffold: FC<ScaffoldProps> = (props) => {
  const {
    children,
    appBar,
    bottomNavigationBar,
    floatingActionButton,
    backgroundColor = colorSystem.surface,
    statusBarColor,
    barStyle = 'dark-content',
    edgeToEdge = false,
    translucentStatusBar,
    style,
    contentStyle,
    edges,
  } = props;

  const hasAppBar = Boolean(appBar);
  const isTranslucent = edgeToEdge || translucentStatusBar || hasAppBar;

  // Tự động cấu hình AppBar tràn lên status bar khi nằm trong Scaffold
  let renderedAppBar = appBar;
  if (React.isValidElement(appBar)) {
    renderedAppBar = React.cloneElement(appBar as React.ReactElement<any>, {
      safeAreaTop: (appBar.props as any)?.safeAreaTop ?? true,
    });
  }

  if (edgeToEdge) {
    // Option 1: Edge-to-edge mode
    return (
      <View
        style={[
          scaffoldStyles.scaffold,
          backgroundColor ? { backgroundColor } : undefined,
          style,
        ]}
      >
        <AppStatusBar
          barStyle={barStyle}
          translucent={true}
          backgroundColor="transparent"
        />
        {renderedAppBar}
        <View style={[{ flex: 1 }, contentStyle]}>{children}</View>
        {bottomNavigationBar}
        {floatingActionButton}
      </View>
    );
  }

  // Option 2: Non edge-to-edge mode (mặc định)
  // Khi có appBar, safe area top do AppBar đảm nhiệm (nền tràn lên status bar).
  const defaultEdges: readonly Edge[] = hasAppBar
    ? ['left', 'right', 'bottom']
    : ['top', 'left', 'right', 'bottom'];
  const effectiveEdges = edges ?? defaultEdges;

  return (
    <SafeAreaView
      edges={effectiveEdges}
      style={[
        scaffoldStyles.scaffold,
        backgroundColor ? { backgroundColor } : undefined,
        style,
      ]}
    >
      <AppStatusBar
        barStyle={barStyle}
        translucent={isTranslucent}
        backgroundColor={
          isTranslucent ? 'transparent' : statusBarColor ?? backgroundColor
        }
      />
      {renderedAppBar}
      <View style={[{ flex: 1 }, contentStyle]}>{children}</View>
      {bottomNavigationBar}
      {floatingActionButton}
    </SafeAreaView>
  );
};

export default Scaffold;
