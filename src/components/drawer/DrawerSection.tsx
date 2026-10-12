import React, { type FC, type ReactNode } from 'react';
import { type StyleProp, Text, View, type ViewStyle } from 'react-native';
import { drawerStyles } from '../../styles/drawer/drawer';
import { useTheme } from '../../utils/theme';

export interface DrawerSectionProps {
  title?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const DrawerSection: FC<DrawerSectionProps> = (props) => {
  const { colors } = useTheme();
  const { title, children, style } = props;

  return (
    <View style={[drawerStyles.section, style]}>
      {title ? (
        <Text style={[drawerStyles.sectionTitle, { color: colors.primary }]}>
          {title}
        </Text>
      ) : null}
      {children}
    </View>
  );
};

export default DrawerSection;
