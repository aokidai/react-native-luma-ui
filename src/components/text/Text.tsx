import { type FC, type ReactNode } from 'react';
import { type StyleProp, Text as RNText, type TextStyle } from 'react-native';
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

export interface TextProps {
  children?: ReactNode;
  style?: StyleProp<TextStyle>;
  theme?: Theme;
  color?: string;
  numberOfLines?: number;
}

const Text: FC<TextProps> = (props) => {
  const {
    children,
    style,
    theme,
    color = colorSystem.gray[900],
    numberOfLines,
  } = props;

  return (
    <RNText
      numberOfLines={numberOfLines}
      style={[{ color: color }, theme ? textStyles[theme] : undefined, style]}
    >
      {children}
    </RNText>
  );
};

export default Text;
