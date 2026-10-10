import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';
import { radius } from '../../utils/size';

export const snackbarStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    zIndex: 9999,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colorSystem.gray[900],
    borderRadius: radius.sm,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
    minHeight: 48,
  },
  messageRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  message: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '400',
    flex: 1,
  },
  actionButton: {
    marginLeft: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionLabel: {
    color: colorSystem.secondary,
    fontWeight: '700',
    fontSize: 14,
  },
});
