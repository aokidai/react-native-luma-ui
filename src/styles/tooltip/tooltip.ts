import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export const tooltipStyles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  bubble: {
    position: 'absolute',
    backgroundColor: colorSystem.gray[900],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  bubbleTop: {
    bottom: '100%',
    marginBottom: 8,
  },
  bubbleBottom: {
    top: '100%',
    marginTop: 8,
  },
  text: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
});
