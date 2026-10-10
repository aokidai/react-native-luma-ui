import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';
import { radius } from '../../utils/size';

export const textFieldStyles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 6,
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    paddingHorizontal: 16,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colorSystem.gray[400],
    borderRadius: radius.sm,
    backgroundColor: colorSystem.background,
  },
  outlinedFocused: {
    borderWidth: 2,
    borderColor: colorSystem.primary,
  },
  outlinedError: {
    borderColor: colorSystem.error,
  },
  filled: {
    backgroundColor: colorSystem.gray[100],
    borderBottomWidth: 1,
    borderBottomColor: colorSystem.gray[500],
    borderTopLeftRadius: radius.sm,
    borderTopRightRadius: radius.sm,
  },
  filledFocused: {
    borderBottomWidth: 2,
    borderBottomColor: colorSystem.primary,
  },
  filledError: {
    borderBottomColor: colorSystem.error,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colorSystem.onSurface,
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  inputWithFloatingLabel: {
    paddingTop: 18,
    paddingBottom: 6,
  },
  label: {
    position: 'absolute',
    left: 16,
    fontSize: 16,
    color: colorSystem.gray[600],
  },
  labelFloating: {
    fontSize: 12,
    fontWeight: '600',
  },
  labelFocused: {
    color: colorSystem.primary,
  },
  labelError: {
    color: colorSystem.error,
  },
  leadingIcon: {
    marginRight: 12,
  },
  trailingIcon: {
    marginLeft: 12,
  },
  helperText: {
    fontSize: 12,
    color: colorSystem.gray[600],
    marginTop: 4,
    marginHorizontal: 16,
  },
  errorText: {
    color: colorSystem.error,
  },
  disabled: {
    opacity: 0.38,
  },
});
