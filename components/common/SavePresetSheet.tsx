import React from 'react';
import { Button, Input, ScrollView, YStack } from '@blinkdotnew/mobile-ui';
import { BottomSheet } from '@/components/common/BottomSheet';
import { Label } from '@/components/common/Label';
import { PhotoPreview } from '@/components/common/PhotoPreview';
import { demoGallery } from '@/data/demoMedia';
import { useCameraDemo } from '@/context/CameraDemoContext';
import { colors } from '@/constants/theme';

export function SavePresetSheet({ onClose }: { onClose: () => void }) {
  const { filterName, setFilterName, selectedCover, setSelectedCover } = useCameraDemo();
  return (
    <BottomSheet title="Lưu bộ lọc của bạn" onClose={onClose} maxHeight="70%">
      <YStack gap={13}>
        <YStack height={92} borderRadius={13} overflow="hidden" alignSelf="center" width={78}>
          <PhotoPreview uri={demoGallery[selectedCover]} />
        </YStack>
        <Label size={11} color={colors.muted}>Tên bộ lọc</Label>
        <Input value={filterName} onChangeText={setFilterName} color={colors.white} backgroundColor="#2c2a2b"
          borderColor={colors.line} borderRadius={12} height={45} />
        <Label size={11} color={colors.muted}>Chọn ảnh đại diện</Label>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 9 }}>
          {demoGallery.slice(0, 5).map((uri, index) => (
            <Button key={uri} onPress={() => setSelectedCover(index)} padding={0} width={48} height={54}
              borderRadius={9} overflow="hidden" borderWidth={index === selectedCover ? 2 : 1}
              borderColor={index === selectedCover ? colors.pink : colors.line}>
              <PhotoPreview uri={uri} />
            </Button>
          ))}
        </ScrollView>
        <Button height={47} borderRadius={24} backgroundColor="#eee9eb" onPress={onClose}>
          <Label size={13} color="#171516" weight="700">Lưu preset</Label>
        </Button>
      </YStack>
    </BottomSheet>
  );
}
