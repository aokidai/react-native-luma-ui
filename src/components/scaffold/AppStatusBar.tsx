import { type FC } from 'react';
import { StatusBar } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export type AppStatusBarType = 'light-content' | 'dark-content';

export interface AppStatusBarProps {
  backgroundColor?: string;
  barStyle: AppStatusBarType;
  animated?: boolean;
  translucent?: boolean;
}

const AppStatusBar: FC<AppStatusBarProps> = (props) => {
  const {
    backgroundColor = colorSystem.background,
    barStyle,
    animated = false,
    translucent = false,
  } = props;

  return (
    <StatusBar
      backgroundColor={translucent ? 'transparent' : backgroundColor}
      barStyle={barStyle}
      animated={animated}
      translucent={translucent}
    />
  );
};

export default AppStatusBar;
