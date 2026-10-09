import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';
import { radius, size } from '../../utils/size';

export const searchBarStyles = StyleSheet.create({
  container: {
    paddingHorizontal: size.lg,
    borderRadius: radius.ro,
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.sm,
    height: 42,
    backgroundColor: colorSystem.gray[100],
    borderWidth: 1,
    borderColor: colorSystem.gray[300],
  },
  textInput: {
    color: colorSystem.gray[900],
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    fontSize: 14,
  },
  placeholderText: {
    color: colorSystem.gray[500],
    fontSize: 14,
    flex: 1,
  },
});
