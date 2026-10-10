import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export const htmlReaderStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: colorSystem.onSurface,
  },
  bold: {
    fontWeight: '700',
  },
  italic: {
    fontStyle: 'italic',
  },
  link: {
    color: colorSystem.primary,
    textDecorationLine: 'underline',
  },
  collapseToggle: {
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  collapseToggleText: {
    color: colorSystem.primary,
    fontWeight: '600',
    fontSize: 13,
  },
});
