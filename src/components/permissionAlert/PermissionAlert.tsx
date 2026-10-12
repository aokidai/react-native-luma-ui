import React, { type FC, type ReactNode } from 'react';
import {
  Linking,
  type StyleProp,
  Text,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import BottomAlert from '../bottomAlert/BottomAlert';
import { permissionAlertStyles } from '../../styles/permissionAlert/permissionAlert';
import { colorSystem } from '../../utils/colorSystem';

export interface PermissionAlertProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  permissionName?: string;
  description?: string;
  icon?: ReactNode;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  style?: StyleProp<ViewStyle>;
}

const PermissionShieldIcon: FC<{ size?: number; color?: string }> = ({
  size = 28,
  color = colorSystem.primary,
}) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: size * 0.76,
          height: size * 0.86,
          borderWidth: 2.2,
          borderColor: color,
          borderTopLeftRadius: size * 0.35,
          borderTopRightRadius: size * 0.35,
          borderBottomLeftRadius: size * 0.45,
          borderBottomRightRadius: size * 0.45,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: size * 0.22,
            height: size * 0.38,
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderColor: color,
            transform: [{ rotate: '45deg' }, { translateY: -size * 0.05 }],
          }}
        />
      </View>
    </View>
  );
};

const PermissionAlert: FC<PermissionAlertProps> = (props) => {
  const {
    visible,
    onClose,
    title = 'Cho phép truy cập quyền',
    permissionName = 'Camera',
    description = 'Ứng dụng cần quyền này để tiếp tục thực hiện tác vụ của bạn.',
    icon,
    cancelText = 'Hủy',
    confirmText = 'Cài đặt',
    onConfirm,
    onCancel,
    style,
  } = props;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      Linking.openSettings();
      onClose();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  return (
    <BottomAlert visible={visible} onClose={onClose}>
      <View style={[permissionAlertStyles.container, style]}>
        {title ? (
          <Text style={permissionAlertStyles.title}>{title}</Text>
        ) : null}

        <View style={permissionAlertStyles.bodyRow}>
          <View style={permissionAlertStyles.iconBox}>
            {icon ?? (
              <PermissionShieldIcon size={26} color={colorSystem.primary} />
            )}
          </View>
          <View style={permissionAlertStyles.contentCol}>
            {permissionName ? (
              <Text style={permissionAlertStyles.permissionName}>
                {permissionName}
              </Text>
            ) : null}
            {description ? (
              <Text style={permissionAlertStyles.description}>
                {description}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={permissionAlertStyles.actionsRow}>
          <TouchableOpacity
            style={permissionAlertStyles.button}
            onPress={handleCancel}
            activeOpacity={0.7}
          >
            <Text style={permissionAlertStyles.buttonText}>{cancelText}</Text>
          </TouchableOpacity>
          <View style={permissionAlertStyles.divider} />
          <TouchableOpacity
            style={permissionAlertStyles.button}
            onPress={handleConfirm}
            activeOpacity={0.7}
          >
            <Text style={permissionAlertStyles.confirmButtonText}>
              {confirmText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomAlert>
  );
};

export default PermissionAlert;
