import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';

export const permissionAlertStyles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    gap: 16,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colorSystem.onSurface,
  },
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  iconBox: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: colorSystem.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentCol: {
    flex: 1,
    gap: 2,
  },
  permissionName: {
    fontSize: 16,
    fontWeight: '600',
    color: colorSystem.onSurface,
  },
  description: {
    fontSize: 13,
    color: colorSystem.gray[600],
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colorSystem.gray[200],
    paddingTop: 8,
  },
  button: {
    flex: 1,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colorSystem.gray[700],
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colorSystem.primary,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: colorSystem.gray[200],
  },
});
