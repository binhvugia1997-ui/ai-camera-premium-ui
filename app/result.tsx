import React from 'react';
import { useRouter } from 'expo-router';
import { Button, Download, Heart, Share2, useWindowDimensions, XStack, YStack } from '@blinkdotnew/mobile-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/common/AppHeader';
import { Label } from '@/components/common/Label';
import { PhotoPreview } from '@/components/common/PhotoPreview';
import { colors } from '@/constants/theme';
import { useCameraDemo } from '@/context/CameraDemoContext';

export default function ResultScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const { selectedFilter, liked, setLiked } = useCameraDemo();
  const index = Math.max(0, ['Original', 'Trong trẻo', 'Ấm áp', 'Lạnh', 'Hàn Quốc', 'Nhật Bản', 'Vintage', 'Film', 'Cinematic', 'Dreamy', 'Sunset', 'Đen trắng'].indexOf(selectedFilter));
  return (
    <YStack flex={1} backgroundColor={colors.black} paddingTop={Math.max(insets.top, 10)}
      paddingBottom={Math.max(insets.bottom, 10)} paddingHorizontal={14}>
      <AppHeader title="Ảnh của bạn" onBack={() => router.back()}
        right={<Button chromeless onPress={() => router.push('/compare')}><Label size={12} color="#d5a1da">So sánh</Label></Button>} />
      <YStack flex={1} justifyContent="center" paddingVertical={10}>
        <YStack height={Math.min(height * 0.65, width * 1.22)} borderRadius={18} overflow="hidden">
          <PhotoPreview filterIndex={index} />
          <YStack position="absolute" left={12} top={12} paddingHorizontal={9} paddingVertical={5} borderRadius={12} backgroundColor={colors.glass}>
            <Label size={10}>AI · {selectedFilter}</Label>
          </YStack>
        </YStack>
      </YStack>
      <XStack gap={9} paddingBottom={12}>
        <Button flex={1} height={46} borderRadius={24} backgroundColor="#292729" onPress={() => router.push('/editor')}>
          <Label size={12}>Chỉnh sửa tiếp</Label>
        </Button>
        <Button width={48} height={46} padding={0} borderRadius={24} backgroundColor="#292729" onPress={() => setLiked(!liked)}>
          <Heart size={18} color={liked ? '#ef7caf' : colors.white} fill={liked ? '#ef7caf' : 'transparent'} />
        </Button>
        <Button width={48} height={46} padding={0} borderRadius={24} backgroundColor="#292729" onPress={() => router.push('/library')}>
          <Share2 size={18} color={colors.white} />
        </Button>
        <Button width={48} height={46} padding={0} borderRadius={24} backgroundColor="#f5f2f2" onPress={() => router.push('/library')}>
          <Download size={18} color="#171516" />
        </Button>
      </XStack>
    </YStack>
  );
}
