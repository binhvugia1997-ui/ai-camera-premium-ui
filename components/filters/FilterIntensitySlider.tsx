import React from 'react';
import { Slider, XStack, YStack } from '@blinkdotnew/mobile-ui';
import { Label } from '@/components/common/Label';
import { colors } from '@/constants/theme';

export function FilterIntensitySlider({ value, onChange, label = 'Cường độ' }: {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}) {
  return (
    <YStack gap={10}>
      <XStack alignItems="center" justifyContent="space-between">
        <Label size={13}>{label}</Label><Label size={12} color={colors.muted}>{Math.round(value)}</Label>
      </XStack>
      <Slider min={0} max={100} step={1} value={[value]} onValueChange={(next) => onChange(next[0] ?? value)}>
        <Slider.Track backgroundColor="#454244" height={3} borderRadius={8}>
          <Slider.TrackActive backgroundColor="#a478ef" />
        </Slider.Track>
        <Slider.Thumb index={0} circular size="$1" backgroundColor="#ffffff" borderColor="#ffffff" borderWidth={1} />
      </Slider>
    </YStack>
  );
}
