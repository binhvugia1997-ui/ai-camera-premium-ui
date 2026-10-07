import React from 'react';
import { useRouter } from 'expo-router';
import { Button, MoreHorizontal, ScrollView, XStack, YStack, useWindowDimensions } from '@blinkdotnew/mobile-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
import { IconButton } from '@/components/common/IconButton';
import { Label } from '@/components/common/Label';
import { PhotoPreview } from '@/components/common/PhotoPreview';
import { demoGallery } from '@/data/demoMedia';
import { colors } from '@/constants/theme';
import { useCameraDemo } from '@/context/CameraDemoContext';

const galleryTabs = ['Tất cả', 'Ảnh gốc', 'Ảnh AI', 'Yêu thích'];
const rowGroups = [demoGallery.slice(0, 3), demoGallery.slice(3, 6), demoGallery.slice(6, 8)];

export default function LibraryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { galleryTab, setGalleryTab } = useCameraDemo();
  return (
    <YStack flex={1} backgroundColor={colors.black} paddingTop={Math.max(insets.top, 10)}>
      <XStack height={50} paddingHorizontal={18} alignItems="center" justifyContent="space-between">
        <Label size={19} weight="700">Thư viện</Label>
        <IconButton icon={<MoreHorizontal size={20} color={colors.white} />} onPress={() => {}} />
      </XStack>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 9, alignItems: 'center', height: 50 }}>
        {galleryTabs.map((tab) => <Button key={tab} onPress={() => setGalleryTab(tab)} height={33} paddingHorizontal={15}
          borderRadius={18} backgroundColor={galleryTab === tab ? '#eee9eb' : '#242223'}>
          <Label size={12} color={galleryTab === tab ? '#181617' : '#b5b0b1'} weight={galleryTab === tab ? '600' : '400'}>{tab}</Label>
        </Button>)}
      </ScrollView>
      <ScrollView flex={1} contentContainerStyle={{ padding: 10, gap: 8 }}>
        {rowGroups.map((group, rowIndex) => <XStack key={rowIndex} gap={8}>
          {group.map((uri, index) => <Button key={uri} onPress={() => router.push(index === 2 && rowIndex === 0 ? '/result' : '/editor')}
            flex={1} height={width * 0.43} padding={0} borderRadius={12} overflow="hidden">
            <PhotoPreview uri={uri} />
            {rowIndex === 0 && <YStack position="absolute" bottom={7} left={7} paddingHorizontal={7} paddingVertical={4} backgroundColor={colors.glass} borderRadius={10}>
              <Label size={9}>{index === 2 ? 'AI' : index === 0 ? 'Hôm nay' : 'Ảnh gốc'}</Label>
            </YStack>}
          </Button>)}
        </XStack>)}
      </ScrollView>
      <BottomNavigation active="Thư viện" />
    </YStack>
  );
}
