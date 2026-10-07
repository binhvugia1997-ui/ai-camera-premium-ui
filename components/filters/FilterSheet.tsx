import React from 'react';
import { Button, ScrollView, XStack, YStack } from '@blinkdotnew/mobile-ui';
import { BottomSheet } from '@/components/common/BottomSheet';
import { Label } from '@/components/common/Label';
import { FilterIntensitySlider } from '@/components/filters/FilterIntensitySlider';
import { FilterStrip } from '@/components/filters/FilterStrip';
import { filterCategories } from '@/data/filters';
import { colors } from '@/constants/theme';
import { useCameraDemo } from '@/context/CameraDemoContext';

export function FilterSheet({ onClose }: { onClose: () => void }) {
  const { selectedFilter, setSelectedFilter, activeCategory, setActiveCategory, intensity, setIntensity } = useCameraDemo();
  return (
    <BottomSheet title="Bộ lọc" onClose={onClose} maxHeight="76%">
      <YStack gap={15}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 18, paddingBottom: 3 }}>
          {filterCategories.map((category) => (
            <Button key={category} chromeless onPress={() => setActiveCategory(category)} height={30} paddingHorizontal={2}>
              <YStack alignItems="center" gap={6}>
                <Label size={12} color={activeCategory === category ? colors.white : '#999496'}>{category}</Label>
                <YStack height={2} width={activeCategory === category ? 24 : 0} backgroundColor="#df8cca" borderRadius={2} />
              </YStack>
            </Button>
          ))}
        </ScrollView>
        <FilterStrip selected={selectedFilter} onSelect={setSelectedFilter} />
        <FilterIntensitySlider value={intensity} onChange={setIntensity} />
        <XStack justifyContent="space-between" gap={12}>
          <Button flex={1} height={43} borderRadius={22} backgroundColor="#302e30" onPress={onClose}><Label size={13}>Hủy</Label></Button>
          <Button flex={1} height={43} borderRadius={22} backgroundColor="#f4f1f1" onPress={onClose}>
            <Label size={13} color="#171516" weight="700">Áp dụng</Label>
          </Button>
        </XStack>
      </YStack>
    </BottomSheet>
  );
}
