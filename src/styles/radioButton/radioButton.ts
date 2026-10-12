import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export const radioButtonStyles = StyleSheet.create({
  container: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colorSystem.gray[600],
  },
  outerCircleSelected: {
    borderColor: colorSystem.primary,
  },
  innerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colorSystem.primary,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemContent: {
    flex: 1,
    marginRight: 16,
  },
  label: {
    fontSize: 16,
    color: colorSystem.onSurface,
  },
  description: {
    fontSize: 13,
    color: colorSystem.gray[600],
    marginTop: 2,
  },
});
