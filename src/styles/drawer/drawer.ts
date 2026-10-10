import { StyleSheet } from 'react-native';
import { colorSystem } from '../../utils/colorSystem';
import { radius } from '../../utils/size';

export const drawerStyles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: colorSystem.background,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 16,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colorSystem.gray[200],
  },
  content: {
    flex: 1,
    paddingVertical: 8,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colorSystem.gray[200],
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: radius.md,
    marginHorizontal: 8,
    marginVertical: 2,
    gap: 12,
  },
  itemActive: {
    backgroundColor: `${colorSystem.primary}15`,
  },
  itemContent: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colorSystem.onSurface,
  },
  itemLabelActive: {
    fontWeight: '700',
    color: colorSystem.primary,
  },
  section: {
    marginVertical: 6,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colorSystem.gray[500],
    paddingHorizontal: 16,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
