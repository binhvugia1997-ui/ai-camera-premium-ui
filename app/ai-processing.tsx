import React from 'react';
import { useRouter } from 'expo-router';
import { Button, Sparkles, YStack } from '@blinkdotnew/mobile-ui';
import { Label } from '@/components/common/Label';
import { FilterIntensitySlider } from '@/components/filters/FilterIntensitySlider';
import { colors } from '@/constants/theme';
import { useCameraDemo } from '@/context/CameraDemoContext';

export default function AIProcessingScreen() {
  const router = useRouter();
  const { intensity, setIntensity } = useCameraDemo();
  return (
    <YStack flex={1} backgroundColor={colors.black} alignItems="center" justifyContent="center" paddingHorizontal={32}>
      <YStack width={78} height={78} borderRadius={40} alignItems="center" justifyContent="center"
        borderWidth={1} borderColor="#956de4" backgroundColor="#241f2d">
        <Sparkles size={30} color="#d998dc" />
      </YStack>
      <YStack marginTop={22} alignItems="center" gap={8}>
        <Label size={19} weight="700">Đang tạo ảnh AI...</Label>
        <Label size={12} color={colors.muted}>Bản xem trước giao diện</Label>
      </YStack>
      <YStack width="76%" marginTop={24}><FilterIntensitySlider value={intensity} onChange={setIntensity} label="" /></YStack>
      <Button marginTop={35} height={46} paddingHorizontal={22} borderRadius={24} backgroundColor="#2b292b"
        onPress={() => router.replace('/result')}>
        <Label size={13}>Xem ảnh mẫu</Label>
      </Button>
    </YStack>
  );
}
