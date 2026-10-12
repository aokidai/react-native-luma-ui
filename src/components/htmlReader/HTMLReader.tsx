import React, { type FC, useMemo, useState } from 'react';
import {
  type StyleProp,
  Text,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { htmlReaderStyles } from '../../styles/htmlReader/htmlReader';
import { colorSystem } from '../../utils/colorSystem';

export interface HTMLReaderProps {
  html?: string;
  textColor?: string;
  aTagColor?: string;
  fontSize?: number;
  collapse?: boolean;
  collapsedHeight?: number;
  onOpenUrl?: (url: string) => void;
  style?: StyleProp<ViewStyle>;
}

const stripHtml = (htmlString?: string): string => {
  if (!htmlString) return '';
  return htmlString
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/gi, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .trim();
};

const HTMLReader: FC<HTMLReaderProps> = (props) => {
  const {
    html = '',
    textColor = colorSystem.onSurface,
    aTagColor = colorSystem.primary,
    fontSize = 14,
    collapse = false,
    collapsedHeight = 100,
    style,
  } = props;

  const [expanded, setExpanded] = useState(!collapse);

  const plainText = useMemo(() => stripHtml(html), [html]);

  return (
    <View style={[htmlReaderStyles.container, style]}>
      <View
        style={
          collapse && !expanded
            ? { maxHeight: collapsedHeight, overflow: 'hidden' }
            : undefined
        }
      >
        <Text
          style={[
            htmlReaderStyles.text,
            { color: textColor, fontSize, lineHeight: fontSize * 1.5 },
          ]}
        >
          {plainText}
        </Text>
      </View>

      {collapse && (
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          style={htmlReaderStyles.collapseToggle}
          activeOpacity={0.7}
        >
          <Text
            style={[htmlReaderStyles.collapseToggleText, { color: aTagColor }]}
          >
            {expanded ? 'Thu gọn' : 'Xem thêm'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HTMLReader;
