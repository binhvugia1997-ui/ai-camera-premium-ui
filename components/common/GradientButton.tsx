import React from 'react';
import { Button, SizableText } from '@blinkdotnew/mobile-ui';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/theme';

export function GradientButton({ label, onPress, compact = false }: {
  label: string;
  onPress: () => void;
  compact?: boolean;
}) {
  return (
    <Button onPress={onPress} height={compact ? 46 : 52} borderRadius={28} padding={0}
      overflow="hidden" pressStyle={{ scale: 0.98, opacity: 0.9 }}>
      <LinearGradient colors={[colors.purple, colors.pink]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
        style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 28 }}>
        <SizableText color={colors.white} size={15} fontWeight="700">{label}</SizableText>
      </LinearGradient>
    </Button>
  );
}
