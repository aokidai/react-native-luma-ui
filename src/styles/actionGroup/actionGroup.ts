import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';
import { radius, size } from '../../utils/size';

export const actionGroupStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.sm / 2,
    backgroundColor: colorSystem.gray[50],
    borderRadius: radius.ro,
    borderWidth: 1,
    borderColor: colorSystem.gray[300],
    paddingHorizontal: size.sm / 2,
    paddingVertical: 2,
  },
});
