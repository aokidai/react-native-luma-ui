import { type FC } from 'react';
import { StatusBar } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export type AppStatusBarType = 'light-content' | 'dark-content';

interface Props {
  backgroundColor?: string;
  barStyle: AppStatusBarType;
  animated?: boolean;
}

const AppStatusBar: FC<Props> = (props) => {
  const {
    backgroundColor = colorSystem.background,
    barStyle,
    animated = false,
  } = props;

  return (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={barStyle}
      animated={animated}
    />
  );
};

export default AppStatusBar;
