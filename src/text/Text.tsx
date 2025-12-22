import { type FC } from 'react';
import { Text as RNText } from 'react-native';
import { textStyles } from '../styles/text/text';

export type Theme =
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall';

interface TextProps {
  children: string;
  style?: object;
  theme: Theme;
}

const Text: FC<TextProps> = (props) => {
  const { children, style, theme } = props;

  return <RNText style={[style, textStyles[theme]]}>{children}</RNText>;
};

export default Text;
