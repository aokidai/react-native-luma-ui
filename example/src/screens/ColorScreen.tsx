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
          The Luma UI color system includes Key Roles, Surface Elevation, and Tonal Palettes.
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <SegmentedButton
            label="☀️ Light"
            selected={themeMode === 'light'}
            onPress={() => setThemeMode('light')}
          />
          <SegmentedButton
            label="🌙 Dark"
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
          Primary color represents brand identity and key user actions.
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <ColorSwatch
            label="Primary"
            color={currentColors.primary}
            onColor={currentColors.onPrimary}
            description="Primary Color"
          />
          <ColorSwatch
            label="On Primary"
            color={currentColors.onPrimary}
            onColor={currentColors.primary}
            description="On Primary"
          />
          <ColorSwatch
            label="Primary Container"
            color={currentColors.primaryContainer}
            onColor={currentColors.onPrimaryContainer}
            description="Primary Container"
          />
          <ColorSwatch
            label="On Primary Container"
            color={currentColors.onPrimaryContainer}
            onColor={currentColors.primaryContainer}
            description="On Container"
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
          Secondary color is used for secondary components like chips, filters, and auxiliary buttons.
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <ColorSwatch
            label="Secondary"
            color={currentColors.secondary}
            onColor={currentColors.onSecondary}
            description="Secondary Color"
          />
          <ColorSwatch
            label="On Secondary"
            color={currentColors.onSecondary}
            onColor={currentColors.secondary}
            description="On Secondary"
          />
          <ColorSwatch
            label="Secondary Container"
            color={currentColors.secondaryContainer}
            onColor={currentColors.onSecondaryContainer}
            description="Secondary Container"
          />
          <ColorSwatch
            label="On Secondary Container"
            color={currentColors.onSecondaryContainer}
            onColor={currentColors.secondaryContainer}
            description="On Container"
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
          Tertiary color adds balanced accent highlights between primary and secondary.
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <ColorSwatch
            label="Tertiary"
            color={currentColors.tertiary}
            onColor={currentColors.onTertiary}
            description="Tertiary Accent"
          />
          <ColorSwatch
            label="On Tertiary"
            color={currentColors.onTertiary}
            onColor={currentColors.tertiary}
            description="On Tertiary"
          />
          <ColorSwatch
            label="Tertiary Container"
            color={currentColors.tertiaryContainer}
            onColor={currentColors.onTertiaryContainer}
            description="Tertiary Container"
          />
          <ColorSwatch
            label="On Tertiary Container"
            color={currentColors.onTertiaryContainer}
            onColor={currentColors.tertiaryContainer}
            description="On Container"
          />
        </View>
      </Card>

      {/* Error Role */}
      <Card
        title="4. Error Role"
        style={{ backgroundColor: currentColors.surfaceContainerLow }}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <ColorSwatch
            label="Error"
            color={currentColors.error}
            onColor={currentColors.onError}
            description="Error / Warning"
          />
          <ColorSwatch
            label="Error Container"
            color={currentColors.errorContainer}
            onColor={currentColors.onErrorContainer}
            description="Error Container"
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
          Surface elevation hierarchy replaces rigid traditional drop shadows:
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
              label: 'Surface Container (Default)',
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
          Tonal Palettes algorithmically generated to ensure WCAG contrast ratios:
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
