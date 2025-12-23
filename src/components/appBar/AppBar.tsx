import type { FC, ReactNode } from 'react';
import { View } from 'react-native';
import { appBarStyles } from '../../styles/appBar/appBar';
import { colorSystem } from '../../utils/colorSystem';
import Text from '../text/Text';

interface Props {
  title?: string;
  children?: ReactNode;
  leader?: ReactNode;
  actions?: ReactNode[];
  backgroundColor?: string;
}

const AppBar: FC<Props> = (props) => {
  const {
    title,
    children,
    leader,
    actions,
    backgroundColor = colorSystem.surface,
  } = props;

  return (
    <View style={[appBarStyles.appBar, { backgroundColor: backgroundColor }]}>
      <View style={appBarStyles.leader}>
        {leader}
        {title && <Text theme="titleLarge">{title}</Text>}
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

export default AppBar;
