import React from 'react';
import { Button, ScrollView, YStack } from '@blinkdotnew/mobile-ui';
import { Label } from '@/components/common/Label';
import { PhotoPreview } from '@/components/common/PhotoPreview';
import { demoGallery } from '@/data/demoMedia';
import { filterPresets } from '@/data/filters';
import { colors } from '@/constants/theme';

export function FilterStrip({ selected, onSelect, compact = false }: {
  selected: string;
  onSelect: (name: string) => void;
  compact?: boolean;
}) {
  const visible = compact ? filterPresets.slice(0, 10) : filterPresets;
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: compact ? 10 : 12, paddingHorizontal: 2 }}>
      {visible.map((filter) => (
        <Button key={filter.id} chromeless padding={0} onPress={() => onSelect(filter.name)}
          pressStyle={{ opacity: 0.76, scale: 0.96 }}>
          <YStack alignItems="center" gap={6} width={compact ? 58 : 66}>
            <YStack width={compact ? 56 : 64} height={compact ? 65 : 74} borderRadius={12} overflow="hidden"
              borderWidth={selected === filter.name ? 2 : 1}
              borderColor={selected === filter.name ? colors.pink : 'rgba(255,255,255,0.12)'}>
              <PhotoPreview uri={demoGallery[filter.thumbnailIndex % demoGallery.length]} filterIndex={filter.thumbnailIndex} />
            </YStack>
            <Label size={10} color={selected === filter.name ? '#e6a8d4' : '#cbc7c5'}
              weight={selected === filter.name ? '700' : '400'}>{filter.name}</Label>
          </YStack>
        </Button>
      ))}
    </ScrollView>
  );
}
