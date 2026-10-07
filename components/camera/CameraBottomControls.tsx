import React from 'react';
import { Button, RotateCcw, Sparkles, XStack, YStack } from '@blinkdotnew/mobile-ui';
import { useRouter } from 'expo-router';
import { IconButton } from '@/components/common/IconButton';
import { Label } from '@/components/common/Label';
import { PhotoPreview } from '@/components/common/PhotoPreview';
import { colors } from '@/constants/theme';
import { demoGallery } from '@/data/demoMedia';
import { useCameraDemo } from '@/context/CameraDemoContext';

export function CameraBottomControls({ onFilters }: { onFilters: () => void }) {
  const router = useRouter();
  const { selectedFilter, cameraFacing, setCameraFacing } = useCameraDemo();
  return (
    <YStack paddingBottom={10} paddingTop={26} backgroundColor="rgba(10,11,11,0.42)">
      <XStack justifyContent="center" marginBottom={10}>
        <Button onPress={onFilters} height={34} paddingHorizontal={17} borderRadius={20}
          backgroundColor="rgba(18,17,18,0.78)" borderColor="rgba(255,255,255,0.16)" borderWidth={1}
          pressStyle={{ opacity: 0.75 }}>
          <XStack alignItems="center" gap={7}><Sparkles size={14} color="#e6a8d4" /><Label size={12}>Bộ lọc · {selectedFilter}</Label></XStack>
        </Button>
      </XStack>
      <XStack height={72} paddingHorizontal={18} alignItems="center" justifyContent="space-between">
        <Button onPress={() => router.push('/library')} width={44} height={48} padding={0} borderRadius={10}
          overflow="hidden" borderColor="rgba(255,255,255,0.55)" borderWidth={1} pressStyle={{ opacity: 0.8 }}>
          <PhotoPreview uri={demoGallery[1]} />
        </Button>
        <Button onPress={() => router.push('/capture-preview')} width={66} height={66} padding={0} borderRadius={34}
          backgroundColor="#f8f7f5" borderColor="#ffffff" borderWidth={4}
          accessibilityLabel="Chụp ảnh mẫu" pressStyle={{ scale: 0.94, opacity: 0.88 }}>
          <YStack flex={1} borderRadius={32} backgroundColor="#faf9f8" />
        </Button>
        <IconButton icon={<RotateCcw size={19} color={colors.white} />}
          onPress={() => setCameraFacing(!cameraFacing)} />
      </XStack>
    </YStack>
  );
}
