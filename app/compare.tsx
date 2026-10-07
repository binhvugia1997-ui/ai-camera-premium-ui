import React from 'react';
import { useRouter } from 'expo-router';
import { Button, useWindowDimensions, XStack, YStack } from '@blinkdotnew/mobile-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/common/AppHeader';
import { BeforeAfterView } from '@/components/editor/BeforeAfterView';
import { Label } from '@/components/common/Label';
import { colors } from '@/constants/theme';
import { useCameraDemo } from '@/context/CameraDemoContext';

export default function CompareScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const { comparePosition, setComparePosition, selectedFilter } = useCameraDemo();
  const filterIndex = Math.max(0, ['Original', 'Trong trẻo', 'Ấm áp', 'Lạnh', 'Hàn Quốc', 'Nhật Bản', 'Vintage', 'Film', 'Cinematic', 'Dreamy', 'Sunset', 'Đen trắng'].indexOf(selectedFilter));
  return (
    <YStack flex={1} backgroundColor={colors.black} paddingTop={Math.max(insets.top, 10)} paddingBottom={Math.max(insets.bottom, 10)}>
      <AppHeader title="So sánh trước / sau" onBack={() => router.back()} />
      <YStack flex={1} justifyContent="center" paddingHorizontal={12}>
        <BeforeAfterView position={comparePosition} onPositionChange={setComparePosition}
          width={width - 24} height={Math.min(height * 0.72, width * 1.34)} filterIndex={filterIndex} />
      </YStack>
      <XStack justifyContent="center" paddingBottom={12}>
        <Button height={44} paddingHorizontal={25} borderRadius={24} backgroundColor="#292729" onPress={() => router.back()}>
          <Label size={13}>Chỉnh sửa</Label>
        </Button>
      </XStack>
    </YStack>
  );
}
