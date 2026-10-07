import React from 'react';
import { useRouter } from 'expo-router';
import { Button, useWindowDimensions, XStack, YStack } from '@blinkdotnew/mobile-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/common/AppHeader';
import { GradientButton } from '@/components/common/GradientButton';
import { Label } from '@/components/common/Label';
import { PhotoPreview } from '@/components/common/PhotoPreview';
import { colors } from '@/constants/theme';
import { useCameraDemo } from '@/context/CameraDemoContext';

const aiStyles = ['Tự động', 'Chân dung', 'Phong cảnh', 'Buổi tối', 'Đồ ăn'];

export default function AIScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { activeCategory, setActiveCategory } = useCameraDemo();
  return (
    <YStack flex={1} backgroundColor={colors.black} paddingTop={Math.max(insets.top, 10)} paddingBottom={Math.max(insets.bottom, 10)}>
      <AppHeader title="Bộ lọc AI thông minh" onBack={() => router.back()} />
      <YStack paddingHorizontal={13} paddingTop={6}>
        <YStack height={Math.min(height * 0.43, 390)} borderRadius={18} overflow="hidden">
          <PhotoPreview />
          <YStack position="absolute" top={12} left={12} backgroundColor={colors.glass} paddingHorizontal={10} paddingVertical={5} borderRadius={14}>
            <Label size={11}>AI STUDIO</Label>
          </YStack>
        </YStack>
      </YStack>
      <YStack paddingTop={18} paddingHorizontal={18} gap={12}>
        <Label size={18} weight="700">Bộ lọc AI thông minh</Label>
        <Label size={12} color={colors.muted}>Chọn phong cách để AI tinh chỉnh ảnh của bạn</Label>
        <XStack justifyContent="space-between" gap={7}>
          {aiStyles.map((style) => <Button key={style} onPress={() => setActiveCategory(style)} paddingHorizontal={9} height={35}
            borderRadius={18} backgroundColor={activeCategory === style ? '#48414b' : '#252324'} borderWidth={1}
            borderColor={activeCategory === style ? '#b784d8' : colors.line} pressStyle={{ opacity: 0.8 }}>
            <Label size={10}>{style}</Label>
          </Button>)}
        </XStack>
      </YStack>
      <YStack flex={1} justifyContent="flex-end" paddingHorizontal={18} paddingBottom={12} gap={12}>
        <GradientButton label="Áp dụng AI" onPress={() => router.push('/ai-processing')} />
        <Label size={10} color="#787477">Ảnh mẫu · Bản xem trước giao diện</Label>
      </YStack>
    </YStack>
  );
}
