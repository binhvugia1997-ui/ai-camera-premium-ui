import React from 'react';
import { Aperture, Button, ChevronDown, Flashlight, Grid3x3, Sparkles, Timer, XStack, YStack } from '@blinkdotnew/mobile-ui';
import { useRouter } from 'expo-router';
import { BottomSheet } from '@/components/common/BottomSheet';
import { Label } from '@/components/common/Label';
import { colors } from '@/constants/theme';
import { useCameraDemo } from '@/context/CameraDemoContext';

export function CameraOptionsSheet({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { ratio, setRatio, flashOn, setFlashOn, gridOn, setGridOn, timerSeconds, setTimerSeconds, highQuality, setHighQuality } = useCameraDemo();
  const controls = [
    { label: 'Flash', icon: Flashlight, value: flashOn, toggle: () => setFlashOn(!flashOn) },
    { label: timerSeconds === 0 ? 'Hẹn giờ' : `${timerSeconds}s`, icon: Timer, value: timerSeconds > 0, toggle: () => setTimerSeconds((current) => current === 0 ? 3 : current === 3 ? 10 : 0) },
    { label: 'Lưới', icon: Grid3x3, value: gridOn, toggle: () => setGridOn(!gridOn) },
    { label: 'Làm đẹp AI', icon: Sparkles, value: false, toggle: () => { onClose(); router.push('/ai'); } },
  ];
  return (
    <BottomSheet title="Tùy chọn máy ảnh" onClose={onClose} maxHeight="76%">
      <YStack gap={17}>
        <YStack gap={10}>
          <Label size={12} color={colors.muted}>Tỷ lệ</Label>
          <XStack gap={8}>{['3:4', '1:1', '9:16', 'Full'].map((item) => (
            <Button key={item} flex={1} height={37} borderRadius={13} backgroundColor={ratio === item ? '#48434a' : '#2c2a2b'}
              borderWidth={1} borderColor={ratio === item ? '#d79acb' : colors.line} onPress={() => setRatio(item)}>
              <Label size={12}>{item}</Label>
            </Button>
          ))}</XStack>
        </YStack>
        <XStack justifyContent="space-between">
          {controls.map(({ label, icon: Icon, value, toggle }) => (
            <Button key={label} chromeless onPress={toggle} width={68} height={70}>
              <YStack alignItems="center" gap={8}>
                <YStack width={42} height={42} borderRadius={15} backgroundColor={value ? '#49424c' : '#302e30'} alignItems="center" justifyContent="center">
                  <Icon size={18} color={value ? '#e7b1df' : colors.white} />
                </YStack>
                <Label size={10} color="#d4d0d1">{label}</Label>
              </YStack>
            </Button>
          ))}
        </XStack>
        <Button onPress={() => setHighQuality(!highQuality)} chromeless padding={0}>
          <XStack justifyContent="space-between" alignItems="center" backgroundColor="#2b292a" paddingHorizontal={13} height={48} borderRadius={14} width="100%">
            <XStack alignItems="center" gap={9}><Aperture size={17} color={colors.white} /><Label size={12}>Chất lượng ảnh</Label></XStack>
            <XStack alignItems="center" gap={6}><Label size={12} color={colors.muted}>{highQuality ? 'Cao' : 'Tiêu chuẩn'}</Label><ChevronDown size={14} color={colors.muted} /></XStack>
          </XStack>
        </Button>
        <Button height={43} borderRadius={22} backgroundColor="#f4f1f1" onPress={onClose}>
          <Label size={13} color="#171516" weight="700">Xong</Label>
        </Button>
      </YStack>
    </BottomSheet>
  );
}
