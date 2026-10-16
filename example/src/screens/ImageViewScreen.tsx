import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Button, Card, ImageView, Text } from 'react-native-luma-ui';

export const ImageViewScreen = () => {
  const [openViewer, setOpenViewer] = useState(false);

  const sampleImages = [
    {
      uri: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800',
    },
    { uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800' },
    { uri: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800' },
  ];

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Card title="Fullscreen Image Viewer">
        <Text style={{ color: '#757575', marginBottom: 12 }}>
          View full screen photos with next/previous navigation, index counter, and Share & Download buttons:
        </Text>
        <Button
          label="Open Image Viewer (3 images)"
          mode="elevated"
          onPress={() => setOpenViewer(true)}
        />
      </Card>

      <ImageView
        open={openViewer}
        onClose={() => setOpenViewer(false)}
        images={sampleImages}
        onShare={(img) =>
          Alert.alert(
            'Share',
            `Share image: ${typeof img === 'string' ? img : img.uri}`
          )
        }
        onDownload={(img) =>
          Alert.alert(
            'Download',
            `Downloading image: ${typeof img === 'string' ? img : img.uri}`
          )
        }
      />
    </ScrollView>
  );
};

export default ImageViewScreen;
