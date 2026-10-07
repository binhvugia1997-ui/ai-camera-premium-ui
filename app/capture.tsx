import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Button, Sparkles, XStack, YStack } from '@blinkdotnew/mobile-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraTopControls } from '@/components/camera/CameraTopControls';
import { CameraModeSelector } from '@/components/camera/CameraModeSelector';
import { CameraBottomControls } from '@/components/camera/CameraBottomControls';
import { CameraOptionsSheet } from '@/components/camera/CameraOptionsSheet';
import { FilterSheet } from '@/components/filters/FilterSheet';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { PhotoPreview } from '@/components/common/PhotoPreview';
import { Label } from '@/components/common/Label';
import { colors, layout } from '@/constants/theme';
import { demoPortrait } from '@/data/demoMedia';
import { useCameraDemo } from '@/context/CameraDemoContext';

type Panel = 'filters' | 'options' | 'settings' | null;

export default function CaptureScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [panel, setPanel] = useState<Panel>(null);
  const { gridOn, cameraFacing, selectedFilter } = useCameraDemo();
  const filterIndex = Math.max(0, ['Original', 'Trong trẻo', 'Ấm áp', 'Lạnh', 'Hàn Quốc', 'Nhật Bản', 'Vintage', 'Film', 'Cinematic', 'Dreamy', 'Sunset', 'Đen trắng'].indexOf(selectedFilter));

  return (
    <YStack flex={1} backgroundColor={colors.black}>
      <YStack flex={1} marginHorizontal={layout.pageGutter} marginTop={5} marginBottom={10}
        borderRadius={20} overflow="hidden" backgroundColor="#151416">
        <PhotoPreview uri={cameraFacing ? demoPortrait : demoPortrait} filterIndex={filterIndex} />
        <YStack position="absolute" top={0} left={0} right={0} backgroundColor="rgba(10,11,11,0.18)"
          paddingTop={Math.max(4, insets.top > 15 ? 2 : 10)}>
          <CameraTopControls onOptions={() => setPanel('options')} onSettings={() => setPanel('settings')} />
        </YStack>
        {gridOn && <YStack position="absolute" top="24%" bottom="24%" left="8%" right="8%"
          borderLeftWidth={1} borderRightWidth={1} borderColor="rgba(255,255,255,0.42)" justifyContent="space-around">
          <YStack height={1} backgroundColor="rgba(255,255,255,0.42)" />
          <YStack height={1} backgroundColor="rgba(255,255,255,0.42)" />
        </YStack>}
        <YStack position="absolute" left={0} right={0} bottom={0}>
          <CameraBottomControls onFilters={() => setPanel('filters')} />
          <XStack justifyContent="center" alignItems="center" gap={26} height={34} backgroundColor="rgba(10,11,11,0.42)">
            <CameraModeSelector onAI={() => router.push('/ai')} />
          </XStack>
        </YStack>
      </YStack>
      <BottomNavigation active="Camera" />
      {panel === 'filters' && <FilterSheet onClose={() => setPanel(null)} />}
      {(panel === 'options' || panel === 'settings') && <CameraOptionsSheet onClose={() => setPanel(null)} />}
      {panel === 'settings' && <YStack pointerEvents="none" position="absolute" top={insets.top + 52} left={0}><Label size={1} color={colors.black}> </Label></YStack>}
    </YStack>
  );
}
