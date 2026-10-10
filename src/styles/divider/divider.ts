import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export const dividerStyles = StyleSheet.create({
  horizontal: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colorSystem.gray[300],
    width: '100%',
  },
  vertical: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: colorSystem.gray[300],
    height: '100%',
  },
  bold: {
    height: 1,
  },
  boldVertical: {
    width: 1,
  },
  insetLeft: {
    marginLeft: 16,
  },
  insetRight: {
    marginRight: 16,
  },
  insetBoth: {
    marginHorizontal: 16,
  },
});
