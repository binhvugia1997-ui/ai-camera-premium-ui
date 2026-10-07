import React from 'react';
import { useRouter } from 'expo-router';
import { Button, MoreHorizontal, ScanFace, SlidersHorizontal, Sparkles, Wand2, XStack, YStack } from '@blinkdotnew/mobile-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { IconButton } from '@/components/common/IconButton';
import { Label } from '@/components/common/Label';
import { PhotoPreview } from '@/components/common/PhotoPreview';
import { FilterStrip } from '@/components/filters/FilterStrip';
import { FilterIntensitySlider } from '@/components/filters/FilterIntensitySlider';
import { AdjustmentControls } from '@/components/editor/AdjustmentControls';
import { SavePresetSheet } from '@/components/common/SavePresetSheet';
import { colors } from '@/constants/theme';
import { useCameraDemo } from '@/context/CameraDemoContext';

export default function EditorScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const [saveOpen, setSaveOpen] = useState(false);
  const { selectedFilter, setSelectedFilter, intensity, setIntensity, editorTab, setEditorTab, adjustments, setAdjustments } = useCameraDemo();
  const filterIndex = Math.max(0, ['Original', 'Trong trẻo', 'Ấm áp', 'Lạnh', 'Hàn Quốc', 'Nhật Bản', 'Vintage', 'Film', 'Cinematic', 'Dreamy', 'Sunset', 'Đen trắng'].indexOf(selectedFilter));
  const tabs = [
    { label: 'Bộ lọc', icon: Sparkles }, { label: 'Điều chỉnh', icon: SlidersHorizontal },
    { label: 'Làm đẹp', icon: ScanFace }, { label: 'AI', icon: Wand2 },
  ];
  return (
    <YStack flex={1} backgroundColor={colors.black} paddingTop={Math.max(insets.top, 10)}>
      <XStack height={46} alignItems="center" justifyContent="space-between" paddingHorizontal={16}>
        <IconButton icon={<MoreHorizontal size={19} color={colors.white} />} onPress={() => router.back()} />
        <Label size={15} weight="600">Chỉnh sửa</Label>
        <Button chromeless onPress={() => setSaveOpen(true)}><Label size={13} color="#d9a8dc">Lưu preset</Label></Button>
      </XStack>
      <YStack paddingHorizontal={12}>
        <YStack height={Math.min(height * 0.40, 330)} borderRadius={18} overflow="hidden">
          <PhotoPreview filterIndex={filterIndex} />
          <Button position="absolute" top={12} left={12} paddingHorizontal={10} height={28} borderRadius={16}
            backgroundColor={colors.glass} onPress={() => router.push('/compare')}>
            <Label size={11}>Gốc  /  Đã chỉnh</Label>
          </Button>
          <Button position="absolute" bottom={12} right={12} width={38} height={38} padding={0} borderRadius={20}
            backgroundColor={colors.glass} onPress={() => router.push('/compare')}>
            <MoreHorizontal size={19} color={colors.white} />
          </Button>
        </YStack>
      </YStack>
      <XStack marginTop={16} paddingHorizontal={14} justifyContent="space-around" height={42}
        borderBottomWidth={1} borderColor="rgba(255,255,255,0.08)">
        {tabs.map(({ label, icon: Icon }) => {
          const active = editorTab === label;
          return <Button key={label} chromeless onPress={() => { setEditorTab(label); if (label === 'AI') router.push('/ai'); }} paddingHorizontal={6} height={38}>
            <YStack alignItems="center" gap={4}><Icon size={16} color={active ? '#e2a8df' : '#858083'} />
              <Label size={10} color={active ? colors.white : '#858083'}>{label}</Label>
            </YStack>
          </Button>;
        })}
      </XStack>
      {editorTab === 'Điều chỉnh' ? (
        <AdjustmentControls values={adjustments} onChange={(key, value) => setAdjustments((current) => ({ ...current, [key]: value }))} />
      ) : (
        <YStack flex={1} paddingTop={14} gap={16}>
          <FilterStrip selected={selectedFilter} onSelect={setSelectedFilter} compact />
          <YStack paddingHorizontal={20}><FilterIntensitySlider value={intensity} onChange={setIntensity} /></YStack>
        </YStack>
      )}
      <XStack paddingHorizontal={16} paddingTop={9} paddingBottom={Math.max(insets.bottom, 10)} gap={10}>
        <Button flex={1} height={46} borderRadius={24} backgroundColor="#282627" onPress={() => router.back()}><Label>Hủy</Label></Button>
        <Button flex={1} height={46} borderRadius={24} backgroundColor="#f7f5f4" onPress={() => router.push('/result')}>
          <Label color="#171516" weight="700">Áp dụng</Label>
        </Button>
      </XStack>
      {saveOpen && <SavePresetSheet onClose={() => setSaveOpen(false)} />}
    </YStack>
  );
}
