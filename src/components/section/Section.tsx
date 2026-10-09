import React, { type FC, type ReactNode } from 'react';
import {
  type StyleProp,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import { sectionStyles } from '../../styles/section/section';

export interface SectionProps {
  title?: string;
  customTitle?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
  flex?: number;
  gap?: number;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const Section: FC<SectionProps> = (props) => {
  const {
    title,
    customTitle,
    action,
    children,
    flex,
    gap,
    style,
    headerStyle,
    titleStyle,
  } = props;

  return (
    <View
      style={[
        sectionStyles.container,
        flex !== undefined ? { flex } : undefined,
        gap !== undefined ? { gap } : undefined,
        style,
      ]}
    >
      {(title || customTitle || action) && (
        <View style={[sectionStyles.header, headerStyle]}>
          {customTitle ? (
            customTitle
          ) : title ? (
            <Text style={[sectionStyles.title, titleStyle]}>{title}</Text>
          ) : null}
          {action ? <View>{action}</View> : null}
        </View>
      )}
      {children}
    </View>
  );
};

export default Section;
