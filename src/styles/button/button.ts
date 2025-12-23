import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';
import { height, radius, size } from '../../utils/size';

export const buttonStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.ro,
    paddingVertical: size.md,
    paddingHorizontal: size.lg,
    gap: size.sm,
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

export const buttonIconStyles = StyleSheet.create({
  iconButton: {
    height: height.sm,
    width: height.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.ro,
  },
  elevated: { backgroundColor: colorSystem.primary },
  outlined: { borderColor: colorSystem.gray[300], borderWidth: 1 },
  text: {},
});

export const buttonFABStyles = StyleSheet.create({
  button: {
    minHeight: height.lg,
    minWidth: height.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.ro,
    gap: size.sm,
    flexDirection: 'row',
    backgroundColor: colorSystem.primary,
    position: 'absolute',
    bottom: size.lg,
    right: size.lg,
  },
  buttonWithLabel: {
    paddingVertical: size.md,
    paddingHorizontal: size.lg,
  },
});
