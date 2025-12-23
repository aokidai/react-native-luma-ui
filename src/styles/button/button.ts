import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export const buttonStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 54,
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
  },
  elevated: { backgroundColor: colorSystem.primary },
  outlined: { borderColor: colorSystem.gray[300], borderWidth: 1 },
  text: {},
});

export const buttonTextStyles = StyleSheet.create({
  elevated: { color: colorSystem.onPrimary },
  outlined: { color: colorSystem.primary },
  text: { color: colorSystem.primary },
});
