import React from 'react';
import { useRouter, usePathname } from 'expo-router';
import { Button, Camera, Images, Sparkles, XStack, YStack } from '@blinkdotnew/mobile-ui';
import { Label } from '@/components/common/Label';
import { colors } from '@/constants/theme';

const tabs = [
  { name: 'Camera', icon: Camera, path: '/capture' },
  { name: 'Thư viện', icon: Images, path: '/library' },
  { name: 'AI của tôi', icon: Sparkles, path: '/result' },
];

export function BottomNavigation({ active }: { active: string }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <XStack height={64} alignItems="center" justifyContent="space-around" backgroundColor={colors.black}
      borderTopWidth={1} borderColor="rgba(255,255,255,0.07)">
      {tabs.map(({ name, icon: Icon, path }) => (
        <Button key={name} chromeless onPress={() => router.replace(path as never)} paddingHorizontal={16} height={52}
          accessibilityRole="tab" accessibilityState={{ selected: active === name || pathname === path }}
          pressStyle={{ opacity: 0.7 }}>
          <YStack alignItems="center" gap={4}>
            <Icon size={19} color={active === name ? colors.white : '#777477'} />
            <Label size={10} color={active === name ? colors.white : '#777477'}>{name}</Label>
          </YStack>
        </Button>
      ))}
    </XStack>
  );
}
