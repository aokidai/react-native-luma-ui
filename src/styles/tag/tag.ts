import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';
import { radius, size } from '../../utils/size';

export const tagStyles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    paddingHorizontal: size.sm,
    paddingVertical: 3,
    gap: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
  // Variant container styles
  defaultContainer: {
    backgroundColor: colorSystem.gray[100],
  },
  primaryContainer: {
    backgroundColor: '#EAE2F8',
  },
  successContainer: {
    backgroundColor: '#DFFDE4',
  },
  dangerContainer: {
    backgroundColor: '#FFE3E3',
  },
  warningContainer: {
    backgroundColor: '#FFEFCF',
  },
  infoContainer: {
    backgroundColor: '#E3F1FF',
  },
  // Variant text styles
  defaultText: {
    color: colorSystem.gray[800],
  },
  primaryText: {
    color: colorSystem.primary,
  },
  successText: {
    color: '#1B7C31',
  },
  dangerText: {
    color: '#910000',
  },
  warningText: {
    color: '#C16C07',
  },
  infoText: {
    color: '#0066CC',
  },
});
