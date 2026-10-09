import { StyleSheet } from 'react-native';
import { radius, size } from '../../utils/size';

export const segmentedButtonStyles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: size.md,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: radius.md,
    overflow: 'hidden',
    flexDirection: 'row',
    borderWidth: 1,
    gap: 6,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.sm,
    flexWrap: 'wrap',
  },
});
