import { type FC } from 'react';
import { Text as RNText } from 'react-native';
import { textStyles } from '../../styles/text/text';
import { colorSystem } from '../../utils/colorSystem';

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
  theme?: Theme;
  color?: string;
}

const Text: FC<TextProps> = (props) => {
  const { children, style, theme, color = colorSystem.gray[900] } = props;

  return (
    <RNText style={[{ color: color }, style, theme && textStyles[theme]]}>
      {children}
    </RNText>
  );
};

export default Text;
