import React from 'react';
import { useRouter } from 'expo-router';
import { Button, useWindowDimensions, XStack, YStack } from '@blinkdotnew/mobile-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/common/AppHeader';
import { PhotoPreview } from '@/components/common/PhotoPreview';
import { Label } from '@/components/common/Label';
import { colors } from '@/constants/theme';
import { useCameraDemo } from '@/context/CameraDemoContext';

export default function CapturePreviewScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const { selectedFilter } = useCameraDemo();
  const filterIndex = Math.max(0, ['Original', 'Trong trẻo', 'Ấm áp', 'Lạnh', 'Hàn Quốc', 'Nhật Bản', 'Vintage', 'Film', 'Cinematic', 'Dreamy', 'Sunset', 'Đen trắng'].indexOf(selectedFilter));
  return (
    <YStack flex={1} backgroundColor={colors.black} paddingTop={Math.max(insets.top, 12)}
      paddingBottom={Math.max(insets.bottom, 10)} paddingHorizontal={14}>
      <AppHeader title="Ảnh vừa chụp" onBack={() => router.back()}
        right={<Button chromeless onPress={() => router.push('/compare')}><Label size={13} color="#dab3de">So sánh</Label></Button>} />
      <YStack flex={1} justifyContent="center" paddingVertical={10}>
        <YStack height={Math.min(height * 0.68, width * 1.25)} borderRadius={18} overflow="hidden">
          <PhotoPreview filterIndex={filterIndex} />
        </YStack>
      </YStack>
      <XStack gap={12} paddingBottom={10}>
        <Button flex={1} height={50} borderRadius={25} backgroundColor="#292729" borderColor={colors.line} borderWidth={1}
          onPress={() => router.replace('/capture')}><Label size={14}>Chụp lại</Label></Button>
        <Button flex={1} height={50} borderRadius={25} backgroundColor="#f5f2f2" onPress={() => router.push('/editor')}>
          <Label size={14} color="#171516" weight="700">Dùng ảnh</Label>
        </Button>
      </XStack>
    </YStack>
  );
}
