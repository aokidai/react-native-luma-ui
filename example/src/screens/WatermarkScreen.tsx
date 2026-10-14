import React from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Text, Watermark } from 'react-native-luma-ui';

export const WatermarkScreen = () => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      {/* Watermark with image */}
      <Card title="Add Information Watermark on Image">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Watermark displaying user, timestamp, date, and location:
        </Text>
        <View style={{ height: 260, borderRadius: 16, overflow: 'hidden' }}>
          <Watermark
            imageUri="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800"
            userName="Alex Morgan"
            address="Luma Tower, Financial District"
            locationText="10.7769° N, 106.7009° E"
            time="14:30:25"
            date="10/10/2026"
            position="bottom-left"
          />
        </View>
      </Card>

      {/* Watermark top-right corner */}
      <Card title="Top-Right Watermark">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          Positioned flexibly across screen or photo corners:
        </Text>
        <View style={{ height: 200, borderRadius: 16, overflow: 'hidden' }}>
          <Watermark
            userName="Project Alpha - Luma UI"
            time="19:45"
            date="10/10/2026"
            position="top-right"
            style={{ backgroundColor: '#1A237E' }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{ color: '#9FA8DA', fontSize: 16, fontWeight: '600' }}
              >
                Content Area / Confidential Document
              </Text>
            </View>
          </Watermark>
        </View>
      </Card>
    </ScrollView>
  );
};

export default WatermarkScreen;
