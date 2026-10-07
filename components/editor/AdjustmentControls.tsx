import React from 'react';
import { Aperture, Contrast, Focus, Moon, ScrollView, Slider, Sun, Button, XStack, YStack } from '@blinkdotnew/mobile-ui';
import { Label } from '@/components/common/Label';
import { colors } from '@/constants/theme';
import { defaultAdjustments, type AdjustmentKey, type AdjustmentState } from '@/types/editor';

const controls: { key: AdjustmentKey; label: string; icon: typeof Sun }[] = [
  { key: 'brightness', label: 'Độ sáng', icon: Sun },
  { key: 'contrast', label: 'Tương phản', icon: Contrast },
  { key: 'highlights', label: 'Vùng sáng', icon: Sun },
  { key: 'shadows', label: 'Vùng tối', icon: Moon },
  { key: 'saturation', label: 'Độ bão hòa', icon: Aperture },
  { key: 'warmth', label: 'Độ ấm', icon: Sun },
  { key: 'sharpness', label: 'Độ sắc nét', icon: Focus },
];

export function AdjustmentControls({ values, onChange }: {
  values: AdjustmentState;
  onChange: (key: AdjustmentKey, value: number) => void;
}) {
  return (
    <ScrollView flex={1} contentContainerStyle={{ paddingHorizontal: 21, paddingTop: 12, paddingBottom: 12, gap: 2 }}>
      {controls.map(({ key, label, icon: Icon }) => {
        const value = values[key];
        return (
          <XStack key={key} alignItems="center" height={39} gap={10}>
            <Icon size={15} color="#c9c3c3" /><Label size={11} color="#dedbdc">{label}</Label>
            <YStack flex={1} marginHorizontal={3}>
              <Slider min={-50} max={50} step={1} value={[value]} onValueChange={(v) => onChange(key, v[0] ?? value)}>
                <Slider.Track backgroundColor="#444143" height={3}>
                  <Slider.TrackActive backgroundColor="#a478ef" />
                </Slider.Track>
                <Slider.Thumb index={0} circular size="$1" backgroundColor="#fff" />
              </Slider>
            </YStack>
            <Label size={11} color="#aaa5a6">{value > 0 ? `+${value}` : value}</Label>
          </XStack>
        );
      })}
      <Button marginTop={9} height={36} borderRadius={20} backgroundColor="#2b292a"
        onPress={() => controls.forEach(({ key }) => onChange(key, defaultAdjustments[key]))}>
        <Label size={12}>Đặt lại</Label>
      </Button>
    </ScrollView>
  );
}
