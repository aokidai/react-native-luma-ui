import React, { type FC, type ReactNode } from 'react';
import {
  type StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { cardStyles } from '../../styles/card/card';
import { colorSystem } from '../../utils/colorSystem';
import { useTheme } from '../../utils/theme';

export interface CardProps {
  children?: ReactNode;
  title?: string;
  content?: string;
  subContent?: string;
  customContent?: ReactNode;
  priority?: string;
  priorityColor?: string;
  status?: string;
  statusColor?: string;
  time?: string;
  footer?: ReactNode;
  leftLine?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onLongPress?: () => void;
}

const Card: FC<CardProps> = (props) => {
  const { isDark, colors } = useTheme();
  const {
    children,
    title,
    content,
    subContent,
    customContent,
    priority,
    priorityColor = colors.primary,
    status,
    statusColor = colors.primary,
    time,
    footer,
    leftLine,
    backgroundColor,
    borderColor,
    borderRadius,
    style,
    onPress,
    onLongPress,
  } = props;

  const defaultCardBg = isDark
    ? colors.surfaceContainerLow
    : colors.surfaceContainerLowest;
  const defaultBorderColor = colors.outlineVariant;

  const cardStyle: StyleProp<ViewStyle> = [
    cardStyles.container,
    { backgroundColor: backgroundColor ?? defaultCardBg },
    {
      borderColor: borderColor ?? defaultBorderColor,
      borderWidth: 1,
    },
    borderRadius !== undefined ? { borderRadius } : undefined,
    leftLine
      ? {
          borderLeftWidth: 4,
          borderLeftColor: leftLine,
        }
      : undefined,
    style,
  ];

  const renderContent = () => (
    <>
      {(priority || status) && (
        <View style={styles.topRow}>
          {priority ? (
            <View
              style={[styles.badge, { backgroundColor: `${priorityColor}15` }]}
            >
              <Text style={[styles.badgeText, { color: priorityColor }]}>
                {priority}
              </Text>
            </View>
          ) : (
            <View />
          )}

          {status ? (
            <Text style={[styles.statusText, { color: statusColor }]}>
              {status}
            </Text>
          ) : null}
        </View>
      )}

      {title ? (
        <Text style={[styles.title, { color: colors.onSurface }]}>{title}</Text>
      ) : null}
      {content ? (
        <Text style={[styles.content, { color: colors.onSurfaceVariant }]}>
          {content}
        </Text>
      ) : null}
      {subContent ? (
        <Text style={[styles.subContent, { color: colors.onSurfaceVariant }]}>
          {subContent}
        </Text>
      ) : null}

      {customContent}

      {children}

      {(time || footer) && (
        <View
          style={[styles.footerRow, { borderTopColor: colors.outlineVariant }]}
        >
          {time ? (
            <Text style={[styles.timeText, { color: colors.onSurfaceVariant }]}>
              {time}
            </Text>
          ) : (
            <View />
          )}
          {footer}
        </View>
      )}
    </>
  );

  if (onPress || onLongPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        activeOpacity={0.7}
        style={cardStyle}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colorSystem.onSurface,
    marginBottom: 4,
  },
  content: {
    fontSize: 14,
    color: colorSystem.onSurfaceVariant,
    marginBottom: 4,
  },
  subContent: {
    fontSize: 13,
    color: colorSystem.gray[600],
    marginBottom: 6,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colorSystem.gray[200],
    paddingTop: 8,
  },
  timeText: {
    fontSize: 12,
    color: colorSystem.gray[500],
  },
});

export default Card;
