import { type FC, type ReactNode } from 'react';
import { View } from 'react-native';
import { cardStyles } from '../../styles/card/card';

interface Props {
  children: ReactNode;
  style?: object;
}

const Card: FC<Props> = (props) => {
  const { children, style } = props;

  return <View style={[cardStyles.container, style]}>{children}</View>;
};

export default Card;
