import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Card,
  md3DarkColors,
  md3LightColors,
  md3TonalPalettes,
  SegmentedButton,
  Text,
} from 'react-native-luma-ui';

interface ColorSwatchProps {
  label: string;
  color: string;
  onColor: string;
  description?: string;
}

const ColorSwatch = ({
  label,
  color,
  onColor,
  description,
}: ColorSwatchProps) => (
  <View
    style={{
      flex: 1,
      minWidth: 150,
      backgroundColor: color,
      borderRadius: 16,
      padding: 14,
      justifyContent: 'space-between',
      minHeight: 88,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 3,
      elevation: 2,
    }}
  >
    <View>
      <Text style={{ color: onColor, fontSize: 14, fontWeight: '700' }}>
        {label}
      </Text>
      {description ? (
        <Text
          style={{ color: onColor, fontSize: 11, opacity: 0.75, marginTop: 2 }}
        >
          {description}
        </Text>
      ) : null}
    </View>
    <Text
      style={{ color: onColor, fontSize: 12, fontWeight: '600', opacity: 0.9 }}
    >
      {color.toUpperCase()}
    </Text>
  </View>
);

export const ColorScreen = () => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const currentColors = themeMode === 'light' ? md3LightColors : md3DarkColors;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: currentColors.background,
      }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Theme Mode Selector */}
      <Card
        title="Luma UI Color System"
        style={{ backgroundColor: currentColors.surfaceContainerLow }}
      >
        <Text
          style={{ color: currentColors.onSurfaceVariant, marginBottom: 14 }}
        >
          Bộ màu chuẩn Luma UI bao gồm các vai trò màu (Key Roles), Surface
          Elevation, và Tonal Palettes.
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <SegmentedButton
            label="☀️ Sáng (Light)"
            selected={themeMode === 'light'}
            onPress={() => setThemeMode('light')}
          />
          <SegmentedButton
            label="🌙 Tối (Dark)"
            selected={themeMode === 'dark'}
            onPress={() => setThemeMode('dark')}
          />
        </View>
      </Card>

      {/* Primary Role */}
      <Card
        title="1. Primary Color Role"
        style={{ backgroundColor: currentColors.surfaceContainerLow }}
      >
        <Text
          style={{ color: currentColors.onSurfaceVariant, marginBottom: 12 }}
        >
          Màu chính đại diện cho nhận diện thương hiệu và các hành động quan
          trọng nhất.
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <ColorSwatch
            label="Primary"
            color={currentColors.primary}
            onColor={currentColors.onPrimary}
            description="Màu chính"
          />
          <ColorSwatch
            label="On Primary"
            color={currentColors.onPrimary}
            onColor={currentColors.primary}
            description="Chữ trên Primary"
          />
          <ColorSwatch
            label="Primary Container"
            color={currentColors.primaryContainer}
            onColor={currentColors.onPrimaryContainer}
            description="Container màu chính"
          />
          <ColorSwatch
            label="On Primary Container"
            color={currentColors.onPrimaryContainer}
            onColor={currentColors.primaryContainer}
            description="Chữ trên Container"
          />
        </View>
      </Card>

      {/* Secondary Role */}
      <Card
        title="2. Secondary Color Role"
        style={{ backgroundColor: currentColors.surfaceContainerLow }}
      >
        <Text
          style={{ color: currentColors.onSurfaceVariant, marginBottom: 12 }}
        >
          Màu phụ dùng cho các thành phần thứ cấp như chip, filter, nút phụ.
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <ColorSwatch
            label="Secondary"
            color={currentColors.secondary}
            onColor={currentColors.onSecondary}
            description="Màu phụ"
          />
          <ColorSwatch
            label="On Secondary"
            color={currentColors.onSecondary}
            onColor={currentColors.secondary}
            description="Chữ trên Secondary"
          />
          <ColorSwatch
            label="Secondary Container"
            color={currentColors.secondaryContainer}
            onColor={currentColors.onSecondaryContainer}
            description="Container màu phụ"
          />
          <ColorSwatch
            label="On Secondary Container"
            color={currentColors.onSecondaryContainer}
            onColor={currentColors.secondaryContainer}
            description="Chữ trên Container"
          />
        </View>
      </Card>

      {/* Tertiary Role */}
      <Card
        title="3. Tertiary Color Role"
        style={{ backgroundColor: currentColors.surfaceContainerLow }}
      >
        <Text
          style={{ color: currentColors.onSurfaceVariant, marginBottom: 12 }}
        >
          Màu cấp ba tạo điểm nhấn bổ trợ cân bằng giữa primary và secondary.
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <ColorSwatch
            label="Tertiary"
            color={currentColors.tertiary}
            onColor={currentColors.onTertiary}
            description="Điểm nhấn cấp 3"
          />
          <ColorSwatch
            label="On Tertiary"
            color={currentColors.onTertiary}
            onColor={currentColors.tertiary}
            description="Chữ trên Tertiary"
          />
          <ColorSwatch
            label="Tertiary Container"
            color={currentColors.tertiaryContainer}
            onColor={currentColors.onTertiaryContainer}
            description="Container điểm nhấn"
          />
          <ColorSwatch
            label="On Tertiary Container"
            color={currentColors.onTertiaryContainer}
            onColor={currentColors.tertiaryContainer}
            description="Chữ trên Container"
          />
        </View>
      </Card>

      {/* Error Role */}
      <Card
        title="4. Error Role (Trạng thái lỗi)"
        style={{ backgroundColor: currentColors.surfaceContainerLow }}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <ColorSwatch
            label="Error"
            color={currentColors.error}
            onColor={currentColors.onError}
            description="Cảnh báo / Lỗi"
          />
          <ColorSwatch
            label="Error Container"
            color={currentColors.errorContainer}
            onColor={currentColors.onErrorContainer}
            description="Khung thông báo lỗi"
          />
        </View>
      </Card>

      {/* Surface Elevation Levels */}
      <Card
        title="5. Surface Container Levels"
        style={{ backgroundColor: currentColors.surfaceContainerLow }}
      >
        <Text
          style={{ color: currentColors.onSurfaceVariant, marginBottom: 12 }}
        >
          Hệ thống Surface nhiều tầng độ cao thay thế hoàn toàn shadow cứng
          truyền thống:
        </Text>
        <View style={{ gap: 8 }}>
          {[
            {
              label: 'Surface Container Lowest',
              val: currentColors.surfaceContainerLowest,
            },
            {
              label: 'Surface Container Low',
              val: currentColors.surfaceContainerLow,
            },
            {
              label: 'Surface Container (Mặc định)',
              val: currentColors.surfaceContainer,
            },
            {
              label: 'Surface Container High',
              val: currentColors.surfaceContainerHigh,
            },
            {
              label: 'Surface Container Highest',
              val: currentColors.surfaceContainerHighest,
            },
          ].map((item, idx) => (
            <View
              key={idx}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: item.val,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: currentColors.outlineVariant,
              }}
            >
              <Text
                style={{
                  color: currentColors.onSurface,
                  fontWeight: '600',
                  fontSize: 13,
                }}
              >
                {item.label}
              </Text>
              <Text
                style={{ color: currentColors.onSurfaceVariant, fontSize: 12 }}
              >
                {item.val.toUpperCase()}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Tonal Palettes Preview */}
      <Card
        title="6. Tonal Palette (Primary Tone 10 - 100)"
        style={{ backgroundColor: currentColors.surfaceContainerLow }}
      >
        <Text
          style={{ color: currentColors.onSurfaceVariant, marginBottom: 12 }}
        >
          Dải sắc độ Tonal Palettes được thuật toán tạo ra để đảm bảo độ tương
          phản chuẩn WCAG:
        </Text>
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 12,
            overflow: 'hidden',
            height: 48,
          }}
        >
          {Object.entries(md3TonalPalettes.primary).map(([tone, hex]) => (
            <View
              key={tone}
              style={{
                flex: 1,
                backgroundColor: hex,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 9,
                  fontWeight: '700',
                  color: Number(tone) > 50 ? '#000000' : '#FFFFFF',
                }}
              >
                {tone}
              </Text>
            </View>
          ))}
        </View>
      </Card>
    </ScrollView>
  );
};

export default ColorScreen;
