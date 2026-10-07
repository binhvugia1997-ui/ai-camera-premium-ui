import React from 'react';
import { Button, XStack } from '@blinkdotnew/mobile-ui';
import { Label } from '@/components/common/Label';
import { colors } from '@/constants/theme';
import { useCameraDemo } from '@/context/CameraDemoContext';

export function CameraModeSelector({ onAI }: { onAI: () => void }) {
  const { cameraMode, setCameraMode } = useCameraDemo();
  return (
    <XStack justifyContent="center" alignItems="center" gap={26} height={34}>
      {(['Ảnh', 'Video', 'AI'] as const).map((mode) => (
        <Button key={mode} chromeless onPress={() => mode === 'AI' ? onAI() : setCameraMode(mode)}
          height={32} paddingHorizontal={5} pressStyle={{ opacity: 0.72 }}>
          <Label size={13} color={cameraMode === mode ? colors.white : '#b1adae'}
            weight={cameraMode === mode ? '700' : '400'}>{mode}</Label>
        </Button>
      ))}
    </XStack>
  );
}
