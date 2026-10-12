import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export const sliderStyles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    width: '100%',
  },
  track: {
    height: 16,
    borderRadius: 8,
    backgroundColor: colorSystem.gray[200],
    overflow: 'hidden',
    position: 'relative',
  },
  activeTrack: {
    height: '100%',
    backgroundColor: colorSystem.primary,
    borderRadius: 8,
  },
  thumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colorSystem.primary,
    borderWidth: 2,
    borderColor: colorSystem.onPrimary,
    top: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  valueText: {
    fontSize: 12,
    color: colorSystem.gray[600],
    textAlign: 'center',
    marginTop: 4,
  },
});
