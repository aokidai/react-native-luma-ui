import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';
import { size } from '../../utils/size';

export const checkboxStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  containerDisabled: {
    opacity: 0.6,
  },
  checkboxWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    marginLeft: size.sm,
    justifyContent: 'center',
    flexShrink: 1,
  },
  labelContainerLeft: {
    marginRight: size.sm,
    marginLeft: 0,
    justifyContent: 'center',
    flexShrink: 1,
  },
  label: {
    fontSize: 16,
    color: colorSystem.gray[900],
  },
  labelDisabled: {
    color: colorSystem.gray[500],
  },
  description: {
    fontSize: 13,
    color: colorSystem.gray[600],
    marginTop: 2,
  },
  descriptionDisabled: {
    color: colorSystem.gray[400],
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: size.sm,
    paddingHorizontal: size.md,
    width: '100%',
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  itemContentLeading: {
    marginLeft: size.md,
  },
  itemContentTrailing: {
    marginRight: size.md,
  },
});
