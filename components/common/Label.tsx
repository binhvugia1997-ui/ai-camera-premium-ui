import React from 'react';
import { SizableText } from '@blinkdotnew/mobile-ui';
import { colors } from '@/constants/theme';

export function Label({ children, color = colors.white, size = 14, weight = '500' }: {
  children: React.ReactNode;
  color?: string;
  size?: number;
  weight?: string;
}) {
  return <SizableText color={color} size={size} fontWeight={weight as any}>{children}</SizableText>;
}
