import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export const noContentStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  iconContainer: {
    padding: 16,
    borderRadius: 50,
    backgroundColor: colorSystem.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colorSystem.onSurface,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: colorSystem.gray[600],
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 14,
  },
});
