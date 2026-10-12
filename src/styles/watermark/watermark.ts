import { StyleSheet } from 'react-native';

export const watermarkStyles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    minHeight: 220,
    backgroundColor: '#1E1E24',
    borderRadius: 16,
  },
  watermarkOverlay: {
    position: 'absolute',
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    gap: 4,
    maxWidth: '85%',
  },
  bottomLeft: {
    bottom: 12,
    left: 12,
  },
  bottomRight: {
    bottom: 12,
    right: 12,
  },
  topLeft: {
    top: 12,
    left: 12,
  },
  topRight: {
    top: 12,
    right: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  titleText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
