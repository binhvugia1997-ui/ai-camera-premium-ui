import React from 'react';
import { Button, XStack, YStack, ChevronLeft } from '@blinkdotnew/mobile-ui';
import { Label } from '@/components/common/Label';
import { IconButton } from '@/components/common/IconButton';
import { colors } from '@/constants/theme';

export function AppHeader({ title, onBack, right }: {
  title: string;
  onBack: () => void;
  right?: React.ReactNode;
}) {
  return (
    <XStack height={48} alignItems="center" justifyContent="space-between" paddingHorizontal={16}>
      <IconButton icon={<ChevronLeft size={21} color={colors.white} />} onPress={onBack} />
      <Label size={15} weight="600">{title}</Label>
      {right ?? <YStack width={42} />}
    </XStack>
  );
}
