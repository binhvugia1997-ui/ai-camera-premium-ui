import React from 'react';
import { Image } from 'expo-image';
import { YStack } from '@blinkdotnew/mobile-ui';
import { colors } from '@/constants/theme';
import { demoFilterTints, demoPortrait } from '@/data/demoMedia';

/** Demo-only photo surface. The tint is visual-only and does not edit source pixels. */
export function PhotoPreview({ uri = demoPortrait, filterIndex = 0 }: {
  uri?: string;
  filterIndex?: number;
}) {
  return (
    <YStack width="100%" height="100%" overflow="hidden" backgroundColor={colors.surface}>
      <Image source={{ uri }} contentFit="cover" style={{ width: '100%', height: '100%' }} contentPosition="center" />
      {filterIndex > 0 && (
        <YStack position="absolute" top={0} left={0} right={0} bottom={0}
          backgroundColor={demoFilterTints[filterIndex % demoFilterTints.length]} />
      )}
    </YStack>
  );
}
