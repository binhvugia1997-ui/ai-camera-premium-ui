import React from 'react';
import { YStack, XStack } from '@blinkdotnew/mobile-ui';
import { Label } from '@/components/common/Label';
import { PhotoPreview } from '@/components/common/PhotoPreview';
import { colors } from '@/constants/theme';

export function BeforeAfterView({ position, onPositionChange, width, height, filterIndex }: {
  position: number;
  onPositionChange: (position: number) => void;
  width: number;
  height: number;
  filterIndex: number;
}) {
  return (
    <YStack height={height} borderRadius={18} overflow="hidden"
      onMoveShouldSetResponder={() => true}
      onResponderMove={(event: any) => onPositionChange(Math.max(8, Math.min(92, event.nativeEvent.locationX / width * 100)))}>
      <PhotoPreview />
      <YStack position="absolute" top={0} bottom={0} left={0} width={`${position}%`} overflow="hidden"
        borderRightWidth={1} borderColor="#ffffff">
        <YStack width={width} height="100%"><PhotoPreview filterIndex={filterIndex} /></YStack>
      </YStack>
      <XStack position="absolute" top={12} left={12} paddingHorizontal={10} height={27} alignItems="center" borderRadius={15} backgroundColor={colors.glass}>
        <Label size={10}>Gốc</Label>
      </XStack>
      <XStack position="absolute" top={12} right={12} paddingHorizontal={10} height={27} alignItems="center" borderRadius={15} backgroundColor={colors.glass}>
        <Label size={10}>Đã chỉnh</Label>
      </XStack>
      <YStack position="absolute" top={0} bottom={0} left={`${position}%`} width={1}
        backgroundColor="rgba(255,255,255,0.85)" justifyContent="center" alignItems="center">
        <YStack width={32} height={32} borderRadius={17} borderWidth={1} borderColor="#fff"
          backgroundColor="rgba(20,19,20,0.75)" alignItems="center" justifyContent="center">
          <Label size={12}>↔</Label>
        </YStack>
      </YStack>
    </YStack>
  );
}
