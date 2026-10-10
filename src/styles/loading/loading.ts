import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export const loadingStyles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  label: {
    fontSize: 14,
    color: colorSystem.gray[700],
    fontWeight: '500',
  },
});
