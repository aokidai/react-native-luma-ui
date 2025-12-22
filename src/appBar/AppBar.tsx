import type { FC, ReactNode } from 'react';
import { FlatList } from 'react-native';
import { View, Text } from 'react-native';
import { appBarStyles } from '../styles/appBar/appBar';

interface Props {
  title?: string;
  children?: ReactNode;
  leader?: ReactNode;
  actions?: ReactNode[];
}

const AppBar: FC<Props> = (props) => {
  const { title, children, leader, actions } = props;

  return (
    <View style={appBarStyles.appBar}>
      {leader}
      {title && <Text>{title}</Text>}
      {children}
      {actions && actions.length > 0 && (
        <FlatList
          data={actions}
          renderItem={({ item }) => <View>{item}</View>}
          keyExtractor={(e) => e?.toString() ?? ''}
        />
      )}
    </View>
  );
};

export default AppBar;
