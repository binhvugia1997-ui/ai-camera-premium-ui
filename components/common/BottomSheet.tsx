import React from 'react';
import { Button, X, XStack, YStack } from '@blinkdotnew/mobile-ui';
import { Label } from '@/components/common/Label';
import { colors, layout } from '@/constants/theme';

export function BottomSheet({ title, children, onClose, maxHeight = '76%' }: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  maxHeight?: number | `${number}%`;
}) {
  return (
    <YStack position="absolute" top={0} left={0} right={0} bottom={0}
      backgroundColor="rgba(0,0,0,0.38)" justifyContent="flex-end" onPress={onClose}>
      <YStack backgroundColor="#201f20" borderTopLeftRadius={layout.sheetRadius} borderTopRightRadius={layout.sheetRadius}
        paddingTop={10} paddingHorizontal={19} paddingBottom={18} maxHeight={maxHeight}
        onPress={(event: any) => event.stopPropagation()}>
        <YStack alignSelf="center" width={38} height={4} borderRadius={4} backgroundColor="#716d6f" marginBottom={14} />
        <XStack justifyContent="space-between" alignItems="center" marginBottom={17}>
          <Label size={17} weight="700">{title}</Label>
          <Button chromeless onPress={onClose} width={32} height={32} padding={0}><X size={19} color={colors.muted} /></Button>
        </XStack>
        {children}
      </YStack>
    </YStack>
  );
}
