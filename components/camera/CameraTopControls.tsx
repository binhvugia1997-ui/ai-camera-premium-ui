import React from 'react';
import { Button, ChevronDown, Flashlight, Settings, XStack } from '@blinkdotnew/mobile-ui';
import { IconButton } from '@/components/common/IconButton';
import { Label } from '@/components/common/Label';
import { colors } from '@/constants/theme';
import { useCameraDemo } from '@/context/CameraDemoContext';

export function CameraTopControls({ onOptions, onSettings }: { onOptions: () => void; onSettings: () => void }) {
  const { flashOn, setFlashOn, ratio } = useCameraDemo();
  return (
    <XStack paddingHorizontal={20} height={50} alignItems="center" justifyContent="space-between">
      <IconButton icon={<Flashlight size={18} color={flashOn ? '#f4d77b' : colors.white} />}
        onPress={() => setFlashOn(!flashOn)} active={flashOn} />
      <IconButton icon={<ChevronDown size={18} color={colors.white} />} onPress={onOptions} />
      <Button onPress={onOptions} chromeless paddingHorizontal={12} height={38} borderRadius={20} backgroundColor={colors.glass}>
        <Label size={12} weight="600">{ratio}</Label>
      </Button>
      <IconButton icon={<Settings size={17} color={colors.white} />} onPress={onSettings} />
    </XStack>
  );
}
