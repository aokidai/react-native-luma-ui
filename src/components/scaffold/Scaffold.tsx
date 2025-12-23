import { type FC, type ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scaffoldStyles } from '../../styles/scaffold/scaffold';
import AppStatusBar from './AppStatusBar';
import { colorSystem } from '../../utils/colorSystem';

interface Props {
  children: ReactNode;
  appBar?: ReactNode;
  bottomNavigationBar?: ReactNode;
  floatingActionButton?: ReactNode;
  backgroundColor?: string;
}

const Scaffold: FC<Props> = (props) => {
  const {
    children,
    appBar,
    bottomNavigationBar,
    floatingActionButton,
    backgroundColor = colorSystem.surface,
  } = props;

  return (
    <SafeAreaView
      style={[
        scaffoldStyles.scaffold,
        backgroundColor && { backgroundColor: backgroundColor },
      ]}
    >
      <AppStatusBar barStyle={'dark-content'} />
      {appBar && appBar}
      {children}
      {bottomNavigationBar && bottomNavigationBar}
      {floatingActionButton && floatingActionButton}
    </SafeAreaView>
  );
};

export default Scaffold;
