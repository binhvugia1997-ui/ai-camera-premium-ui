import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import {
  YStack, XStack, ScrollView, Button, SizableText, Input, Slider,
  Flashlight, ChevronDown, Settings, Timer, Grid3x3, Sparkles, Camera, Images,
  X, SlidersHorizontal, Wand2, ArrowLeft, Heart, Share2,
  RotateCcw, Sun, Contrast, Moon, Aperture, Download, MoreHorizontal,
  ScanFace, ChevronLeft, Focus,
} from '@blinkdotnew/mobile-ui';

const C = {
  black: '#0a0b0b', surface: '#212022', raised: '#2c2a2b', muted: '#a59c99',
  white: '#f7f5f4', line: 'rgba(255,255,255,0.13)', glass: 'rgba(10,11,11,0.60)',
  purple: '#8d6bf2', pink: '#e57ab9',
};
const portrait = 'https://images.unsplash.com/photo-1774408130019-39fc90c401b6?auto=format&fit=crop&w=1200&q=90';
const portraits = [
  portrait,
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=85',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=500&q=85',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=85',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=500&q=85',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=85',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=85',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=500&q=85',
];
const filters = ['Original', 'Trong trẻo', 'Ấm áp', 'Lạnh', 'Hàn Quốc', 'Nhật Bản', 'Vintage', 'Film', 'Cinematic', 'Dreamy', 'Sunset', 'Đen trắng'];
const categories = ['Nổi bật', 'Tự nhiên', 'Chân dung', 'Phim', 'Mood', 'AI'];
const adjustmentNames = ['Độ sáng', 'Tương phản', 'Vùng sáng', 'Vùng tối', 'Độ bão hòa', 'Độ ấm', 'Độ sắc nét'];
const adjustmentIcons = [Sun, Contrast, Sun, Moon, Aperture, Sun, Focus];

type Screen = 'camera' | 'captured' | 'editor' | 'ai' | 'processing' | 'result' | 'compare' | 'gallery';
type Panel = 'filters' | 'options' | 'settings' | 'save' | null;

function Label({ children, color = C.white, size = 14, weight = '500' }: { children: React.ReactNode; color?: string; size?: number; weight?: string }) {
  return <SizableText color={color} size={size} fontWeight={weight as any}>{children}</SizableText>;
}
function IconButton({ icon, onPress, active = false }: { icon: React.ReactNode; onPress: () => void; active?: boolean }) {
  return (
    <Button onPress={onPress} width={42} height={42} minWidth={42} padding={0} borderRadius={22}
      backgroundColor={active ? 'rgba(255,255,255,0.18)' : 'rgba(10,11,11,0.58)'}
      borderColor="rgba(255,255,255,0.16)" borderWidth={1} pressStyle={{ opacity: 0.72, scale: 0.95 }}>
      {icon as React.ReactElement}
    </Button>
  );
}
function GradientButton({ label, onPress, compact = false }: { label: string; onPress: () => void; compact?: boolean }) {
  return (
    <Button onPress={onPress} height={compact ? 46 : 52} borderRadius={28} padding={0} overflow="hidden" pressStyle={{ scale: 0.98, opacity: 0.9 }}>
      <LinearGradient colors={[C.purple, C.pink]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 28 }}>
        <Label size={15} weight="700">{label}</Label>
      </LinearGradient>
    </Button>
  );
}
function Photo({ uri = portrait, radius = 0, filterIndex = 0, style }: { uri?: string; radius?: number; filterIndex?: number; style?: any }) {
  const tints = ['transparent', 'rgba(255,222,226,0.10)', 'rgba(255,177,100,0.18)', 'rgba(111,174,255,0.14)', 'rgba(245,196,215,0.12)', 'rgba(219,190,164,0.12)', 'rgba(172,124,87,0.24)', 'rgba(37,46,58,0.15)', 'rgba(239,170,133,0.12)', 'rgba(245,229,255,0.15)', 'rgba(255,154,91,0.18)', 'rgba(30,30,30,0.35)'];
  return (
    <YStack width="100%" height="100%" borderRadius={radius} overflow="hidden" backgroundColor={C.surface}>
      <Image source={{ uri }} contentFit="cover" style={[{ width: '100%', height: '100%' }, style]} contentPosition="center" />
      {filterIndex > 0 && <YStack position="absolute" top={0} left={0} right={0} bottom={0} backgroundColor={tints[filterIndex % tints.length]} />}
    </YStack>
  );
}
function FilterStrip({ selected, onSelect, compact = false }: { selected: string; onSelect: (name: string) => void; compact?: boolean }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: compact ? 10 : 12, paddingHorizontal: 2 }}>
      {filters.slice(0, compact ? 10 : 12).map((name, index) => (
        <Button key={name} chromeless padding={0} onPress={() => onSelect(name)} pressStyle={{ opacity: 0.76, scale: 0.96 }}>
          <YStack alignItems="center" gap={6} width={compact ? 58 : 66}>
            <YStack width={compact ? 56 : 64} height={compact ? 65 : 74} borderRadius={12} overflow="hidden" borderWidth={selected === name ? 2 : 1} borderColor={selected === name ? C.pink : 'rgba(255,255,255,0.12)'}>
              <Photo uri={portraits[index % portraits.length]} filterIndex={index} />
            </YStack>
            <Label size={10} color={selected === name ? '#e6a8d4' : '#cbc7c5'} weight={selected === name ? '700' : '400'}>{name}</Label>
          </YStack>
        </Button>
      ))}
    </ScrollView>
  );
}
function Intensity({ value, onChange, label = 'Cường độ' }: { value: number; onChange: (v: number) => void; label?: string }) {
  return (
    <YStack gap={10}>
      <XStack alignItems="center" justifyContent="space-between"><Label size={13}>{label}</Label><Label size={12} color={C.muted}>{Math.round(value)}</Label></XStack>
      <Slider min={0} max={100} step={1} value={[value]} onValueChange={(v) => onChange(v[0] ?? value)}>
        <Slider.Track backgroundColor="#454244" height={3} borderRadius={8}><Slider.TrackActive backgroundColor="#a478ef" /></Slider.Track>
        <Slider.Thumb index={0} circular size="$1" backgroundColor="#ffffff" borderColor="#ffffff" borderWidth={1} />
      </Slider>
    </YStack>
  );
}

export default function Home() {
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const [screen, setScreen] = useState<Screen>('camera');
  const [panel, setPanel] = useState<Panel>(null);
  const [selectedFilter, setSelectedFilter] = useState('Trong trẻo');
  const [activeCategory, setActiveCategory] = useState('Tự nhiên');
  const [cameraMode, setCameraMode] = useState('Ảnh');
  const [ratio, setRatio] = useState('4:3');
  const [intensity, setIntensity] = useState(74);
  const [comparePosition, setComparePosition] = useState(50);
  const [galleryTab, setGalleryTab] = useState('Tất cả');
  const [liked, setLiked] = useState(false);
  const [filterName, setFilterName] = useState('Nàng thơ');
  const [flashOn, setFlashOn] = useState(false);
  const [gridOn, setGridOn] = useState(false);
  const [cameraFacing, setCameraFacing] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [highQuality, setHighQuality] = useState(true);
  const [selectedCover, setSelectedCover] = useState(1);
  const [editorTab, setEditorTab] = useState('Bộ lọc');
  const [adjustments, setAdjustments] = useState([10, 8, -12, 6, 10, 10, 5]);
  const selectedFilterIndex = Math.max(0, filters.indexOf(selectedFilter));
  const goCamera = () => { setPanel(null); setScreen('camera'); };
  const safeBottom = Math.max(insets.bottom, 10);
  const ImageArea = ({ height: imageHeight, rounded = true, filterIndex = 1 }: { height: number; rounded?: boolean; filterIndex?: number }) => (
    <YStack height={imageHeight} width="100%" borderRadius={rounded ? 18 : 0} overflow="hidden" backgroundColor={C.surface}>
      <Photo filterIndex={filterIndex} />
    </YStack>
  );
  const bottomNav = (active: string) => (
    <XStack height={64} alignItems="center" justifyContent="space-around" backgroundColor={C.black} paddingBottom={safeBottom > 16 ? 0 : 2} borderTopWidth={1} borderColor="rgba(255,255,255,0.07)">
      {[
        { name: 'Camera', icon: Camera, target: 'camera' as Screen },
        { name: 'Thư viện', icon: Images, target: 'gallery' as Screen },
        { name: 'AI của tôi', icon: Sparkles, target: 'result' as Screen },
      ].map((item) => {
        const I = item.icon;
        return <Button key={item.name} chromeless onPress={() => setScreen(item.target)} paddingHorizontal={16} height={52} pressStyle={{ opacity: 0.7 }}>
          <YStack alignItems="center" gap={4}><I size={19} color={active === item.name ? C.white : '#777477'} /><Label size={10} color={active === item.name ? C.white : '#777477'}>{item.name}</Label></YStack>
        </Button>;
      })}
    </XStack>
  );
  const cameraHeader = (
    <XStack paddingHorizontal={20} height={50} alignItems="center" justifyContent="space-between">
      <IconButton icon={<Flashlight size={18} color={flashOn ? '#f4d77b' : C.white} />} onPress={() => setFlashOn(!flashOn)} active={flashOn} />
      <IconButton icon={<ChevronDown size={18} color={C.white} />} onPress={() => setPanel('options')} />
      <Button onPress={() => setPanel('options')} chromeless paddingHorizontal={12} height={38} borderRadius={20} backgroundColor={C.glass}>
        <Label size={12} weight="600">{ratio}</Label>
      </Button>
      <IconButton icon={<Settings size={17} color={C.white} />} onPress={() => setPanel('settings')} />
    </XStack>
  );
  const cameraScreen = (
    <YStack flex={1} backgroundColor={C.black}>
      <YStack flex={1} marginHorizontal={12} marginTop={5} marginBottom={10} borderRadius={20} overflow="hidden" backgroundColor="#151416">
        <Photo uri={cameraFacing ? portraits[1] : portrait} filterIndex={selectedFilterIndex} />
        <YStack position="absolute" top={0} left={0} right={0} backgroundColor="rgba(10,11,11,0.18)" paddingTop={Math.max(4, insets.top > 15 ? 2 : 10)}>
          {cameraHeader}
        </YStack>
        {gridOn && <YStack position="absolute" top="24%" bottom="24%" left="8%" right="8%" borderLeftWidth={1} borderRightWidth={1} borderColor="rgba(255,255,255,0.42)" justifyContent="space-around"><YStack height={1} backgroundColor="rgba(255,255,255,0.42)" /><YStack height={1} backgroundColor="rgba(255,255,255,0.42)" /></YStack>}
        <YStack position="absolute" left={0} right={0} bottom={0} paddingBottom={10} paddingTop={26} backgroundColor="rgba(10,11,11,0.42)">
          <XStack justifyContent="center" marginBottom={10}>
            <Button onPress={() => setPanel('filters')} height={34} paddingHorizontal={17} borderRadius={20} backgroundColor="rgba(18,17,18,0.78)" borderColor="rgba(255,255,255,0.16)" borderWidth={1} pressStyle={{ opacity: 0.75 }}>
              <XStack alignItems="center" gap={7}><Sparkles size={14} color="#e6a8d4" /><Label size={12}>Bộ lọc · {selectedFilter}</Label></XStack>
            </Button>
          </XStack>
          <XStack justifyContent="center" alignItems="center" gap={26} height={34}>
            {['Ảnh', 'Video', 'AI'].map((mode) => <Button key={mode} chromeless onPress={() => mode === 'AI' ? setScreen('ai') : setCameraMode(mode)} height={32} paddingHorizontal={5} pressStyle={{ opacity: 0.72 }}><Label size={13} color={cameraMode === mode ? C.white : '#b1adae'} weight={cameraMode === mode ? '700' : '400'}>{mode}</Label></Button>)}
          </XStack>
          <XStack height={72} paddingHorizontal={18} alignItems="center" justifyContent="space-between">
            <Button onPress={() => setScreen('gallery')} width={44} height={48} padding={0} borderRadius={10} overflow="hidden" borderColor="rgba(255,255,255,0.55)" borderWidth={1} pressStyle={{ opacity: 0.8 }}><Photo uri={portraits[1]} /></Button>
            <Button onPress={() => setScreen('captured')} width={66} height={66} padding={0} borderRadius={34} backgroundColor="#f8f7f5" borderColor="#ffffff" borderWidth={4} pressStyle={{ scale: 0.94, opacity: 0.88 }}><YStack flex={1} borderRadius={32} backgroundColor="#faf9f8" /></Button>
            <IconButton icon={<RotateCcw size={19} color={C.white} />} onPress={() => setCameraFacing(!cameraFacing)} />
          </XStack>
        </YStack>
      </YStack>
    </YStack>
  );
  const capturedScreen = (
    <YStack flex={1} backgroundColor={C.black} paddingTop={Math.max(insets.top, 12)} paddingBottom={safeBottom} paddingHorizontal={14}>
      <XStack height={48} alignItems="center" justifyContent="space-between"><IconButton icon={<X size={20} color={C.white} />} onPress={goCamera} /><Label size={15} weight="600">Ảnh vừa chụp</Label><Button chromeless onPress={() => setScreen('compare')}><Label size={13} color="#dab3de">So sánh</Label></Button></XStack>
      <YStack flex={1} justifyContent="center" paddingVertical={10}><ImageArea height={Math.min(height * 0.68, width * 1.25)} /></YStack>
      <XStack gap={12} paddingBottom={10}><Button flex={1} height={50} borderRadius={25} backgroundColor="#292729" borderColor={C.line} borderWidth={1} onPress={goCamera}><Label size={14}>Chụp lại</Label></Button><Button flex={1} height={50} borderRadius={25} backgroundColor="#f5f2f2" onPress={() => setScreen('editor')}><Label size={14} color="#171516" weight="700">Dùng ảnh</Label></Button></XStack>
    </YStack>
  );
  const editorScreen = (
    <YStack flex={1} backgroundColor={C.black} paddingTop={Math.max(insets.top, 10)}>
      <XStack height={46} alignItems="center" justifyContent="space-between" paddingHorizontal={16}><IconButton icon={<ArrowLeft size={19} color={C.white} />} onPress={goCamera} /><Label size={15} weight="600">Chỉnh sửa</Label><Button chromeless onPress={() => setPanel('save')}><Label size={13} color="#d9a8dc">Lưu preset</Label></Button></XStack>
      <YStack paddingHorizontal={12}>
        <YStack height={Math.min(height * 0.40, 330)} borderRadius={18} overflow="hidden"><Photo filterIndex={selectedFilterIndex} /><Button position="absolute" top={12} left={12} paddingHorizontal={10} height={28} borderRadius={16} backgroundColor={C.glass} onPress={() => setScreen('compare')}><Label size={11}>Gốc  /  Đã chỉnh</Label></Button><Button position="absolute" bottom={12} right={12} width={38} height={38} padding={0} borderRadius={20} backgroundColor={C.glass} onPress={() => setScreen('compare')}><MoreHorizontal size={19} color={C.white} /></Button></YStack>
      </YStack>
      <XStack marginTop={16} paddingHorizontal={14} justifyContent="space-around" height={42} borderBottomWidth={1} borderColor="rgba(255,255,255,0.08)">
        {[
          { label: 'Bộ lọc', icon: Sparkles }, { label: 'Điều chỉnh', icon: SlidersHorizontal }, { label: 'Làm đẹp', icon: ScanFace }, { label: 'AI', icon: Wand2 },
        ].map((tab) => { const I = tab.icon; const active = editorTab === tab.label; return <Button key={tab.label} chromeless onPress={() => { setEditorTab(tab.label); if (tab.label === 'AI') setScreen('ai'); }} paddingHorizontal={6} height={38}><YStack alignItems="center" gap={4}><I size={16} color={active ? '#e2a8df' : '#858083'} /><Label size={10} color={active ? C.white : '#858083'}>{tab.label}</Label></YStack></Button>; })}
      </XStack>
      {editorTab === 'Điều chỉnh' ? (
        <ScrollView flex={1} contentContainerStyle={{ paddingHorizontal: 21, paddingTop: 12, paddingBottom: 12, gap: 2 }}>
          {adjustmentNames.map((name, i) => { const I = adjustmentIcons[i]; const val = adjustments[i]; return <XStack key={name} alignItems="center" height={39} gap={10}><I size={15} color="#c9c3c3" /><Label size={11} color="#dedbdc" >{name}</Label><YStack flex={1} marginHorizontal={3}><Slider min={-50} max={50} step={1} value={[val]} onValueChange={(next) => setAdjustments((current) => current.map((value, index) => index === i ? next[0] ?? value : value))}><Slider.Track backgroundColor="#444143" height={3}><Slider.TrackActive backgroundColor="#a478ef" /></Slider.Track><Slider.Thumb index={0} circular size="$1" backgroundColor="#fff" /></Slider></YStack><Label size={11} color="#aaa5a6" >{val > 0 ? `+${val}` : val}</Label></XStack>; })}
          <Button marginTop={9} height={36} borderRadius={20} backgroundColor="#2b292a" onPress={() => { setAdjustments([0, 0, 0, 0, 0, 0, 0]); setIntensity(50); }}><Label size={12}>Đặt lại</Label></Button>
        </ScrollView>
      ) : (
        <YStack flex={1} paddingTop={14} gap={16}>
          <FilterStrip selected={selectedFilter} onSelect={setSelectedFilter} compact />
          <YStack paddingHorizontal={20}><Intensity value={intensity} onChange={setIntensity} /></YStack>
        </YStack>
      )}
      <XStack paddingHorizontal={16} paddingTop={9} paddingBottom={safeBottom} gap={10}><Button flex={1} height={46} borderRadius={24} backgroundColor="#282627" onPress={goCamera}><Label>Hủy</Label></Button><Button flex={1} height={46} borderRadius={24} backgroundColor="#f7f5f4" onPress={() => setScreen('result')}><Label color="#171516" weight="700">Áp dụng</Label></Button></XStack>
    </YStack>
  );
  const aiScreen = (
    <YStack flex={1} backgroundColor={C.black} paddingTop={Math.max(insets.top, 10)} paddingBottom={safeBottom}>
      <XStack height={48} alignItems="center" paddingHorizontal={16} justifyContent="space-between"><IconButton icon={<ArrowLeft size={19} color={C.white} />} onPress={goCamera} /><Label size={15} weight="600">Bộ lọc AI thông minh</Label><YStack width={42} /></XStack>
      <YStack paddingHorizontal={13} paddingTop={6}><YStack height={height * 0.43} maxHeight={390} borderRadius={18} overflow="hidden"><Photo /><YStack position="absolute" top={12} left={12} backgroundColor={C.glass} paddingHorizontal={10} paddingVertical={5} borderRadius={14}><Label size={11}>AI STUDIO</Label></YStack></YStack></YStack>
      <YStack paddingTop={18} paddingHorizontal={18} gap={12}><Label size={18} weight="700">Bộ lọc AI thông minh</Label><Label size={12} color={C.muted}>Chọn phong cách để AI tinh chỉnh ảnh của bạn</Label>
        <XStack justifyContent="space-between" gap={7}>{['Tự động', 'Chân dung', 'Phong cảnh', 'Buổi tối', 'Đồ ăn'].map((item, index) => <Button key={item} onPress={() => setActiveCategory(item)} paddingHorizontal={index === 2 ? 9 : 11} height={35} borderRadius={18} backgroundColor={activeCategory === item ? '#48414b' : '#252324'} borderWidth={1} borderColor={activeCategory === item ? '#b784d8' : C.line} pressStyle={{ opacity: 0.8 }}><Label size={10}>{item}</Label></Button>)}</XStack>
      </YStack>
      <YStack flex={1} justifyContent="flex-end" paddingHorizontal={18} paddingBottom={12} gap={12}><GradientButton label="Áp dụng AI" onPress={() => setScreen('processing')} /><Label size={10} color="#787477" >Ảnh mẫu · Bản xem trước giao diện</Label></YStack>
    </YStack>
  );
  const processingScreen = (
    <YStack flex={1} backgroundColor={C.black} alignItems="center" justifyContent="center" paddingHorizontal={32}>
      <YStack width={78} height={78} borderRadius={40} alignItems="center" justifyContent="center" borderWidth={1} borderColor="#956de4" backgroundColor="#241f2d"><Sparkles size={30} color="#d998dc" /></YStack>
      <YStack marginTop={22} alignItems="center" gap={8}><Label size={19} weight="700">Đang tạo ảnh AI...</Label><Label size={12} color={C.muted}>Bản xem trước giao diện</Label></YStack>
      <YStack width="76%" marginTop={24}><Intensity value={intensity} onChange={setIntensity} label="" /></YStack>
      <Button marginTop={35} height={46} paddingHorizontal={22} borderRadius={24} backgroundColor="#2b292b" onPress={() => setScreen('result')}><Label size={13}>Xem ảnh mẫu</Label></Button>
    </YStack>
  );
  const resultScreen = (
    <YStack flex={1} backgroundColor={C.black} paddingTop={Math.max(insets.top, 10)} paddingBottom={safeBottom} paddingHorizontal={14}>
      <XStack height={46} alignItems="center" justifyContent="space-between"><IconButton icon={<ArrowLeft size={19} color={C.white} />} onPress={goCamera} /><Label size={15} weight="600">Ảnh của bạn</Label><Button chromeless onPress={() => setScreen('compare')}><Label size={12} color="#d5a1da">So sánh</Label></Button></XStack>
      <YStack flex={1} justifyContent="center" paddingVertical={10}><YStack height={Math.min(height * 0.65, width * 1.22)} borderRadius={18} overflow="hidden"><Photo filterIndex={selectedFilterIndex} /><YStack position="absolute" left={12} top={12} paddingHorizontal={9} paddingVertical={5} borderRadius={12} backgroundColor={C.glass}><Label size={10}>AI · {selectedFilter}</Label></YStack></YStack></YStack>
      <XStack gap={9} paddingBottom={12}><Button flex={1} height={46} borderRadius={24} backgroundColor="#292729" onPress={() => setScreen('editor')}><Label size={12}>Chỉnh sửa tiếp</Label></Button><Button width={48} height={46} padding={0} borderRadius={24} backgroundColor="#292729" onPress={() => setLiked(!liked)}><Heart size={18} color={liked ? '#ef7caf' : C.white} fill={liked ? '#ef7caf' : 'transparent'} /></Button><Button width={48} height={46} padding={0} borderRadius={24} backgroundColor="#292729" onPress={() => setScreen('gallery')}><Share2 size={18} color={C.white} /></Button><Button width={48} height={46} padding={0} borderRadius={24} backgroundColor="#f5f2f2" onPress={() => setScreen('gallery')}><Download size={18} color="#171516" /></Button></XStack>
    </YStack>
  );
  const compareScreen = (
    <YStack flex={1} backgroundColor={C.black} paddingTop={Math.max(insets.top, 10)} paddingBottom={safeBottom}>
      <XStack height={48} alignItems="center" justifyContent="space-between" paddingHorizontal={16}><IconButton icon={<ChevronLeft size={21} color={C.white} />} onPress={() => setScreen('editor')} /><Label size={15} weight="600">So sánh trước / sau</Label><YStack width={42} /></XStack>
      <YStack flex={1} justifyContent="center" paddingHorizontal={12}>
        <YStack height={Math.min(height * 0.72, width * 1.34)} borderRadius={18} overflow="hidden" onMoveShouldSetResponder={() => true} onResponderMove={(e: any) => { const x = e.nativeEvent.locationX; setComparePosition(Math.max(8, Math.min(92, x / (width - 24) * 100))); }}>
          <Photo />
          <YStack position="absolute" top={0} bottom={0} left={0} width={`${comparePosition}%`} overflow="hidden" borderRightWidth={1} borderColor="#ffffff"><YStack width={width - 24} height="100%"><Photo filterIndex={selectedFilterIndex} /></YStack></YStack>
          <XStack position="absolute" top={12} left={12} paddingHorizontal={10} height={27} alignItems="center" borderRadius={15} backgroundColor={C.glass}><Label size={10}>Gốc</Label></XStack>
          <XStack position="absolute" top={12} right={12} paddingHorizontal={10} height={27} alignItems="center" borderRadius={15} backgroundColor={C.glass}><Label size={10}>Đã chỉnh</Label></XStack>
          <YStack position="absolute" top={0} bottom={0} left={`${comparePosition}%`} width={1} backgroundColor="rgba(255,255,255,0.85)" justifyContent="center" alignItems="center"><YStack width={32} height={32} borderRadius={17} borderWidth={1} borderColor="#fff" backgroundColor="rgba(20,19,20,0.75)" alignItems="center" justifyContent="center"><Label size={12}>↔</Label></YStack></YStack>
        </YStack>
      </YStack>
      <XStack justifyContent="center" paddingBottom={12}><Button height={44} paddingHorizontal={25} borderRadius={24} backgroundColor="#292729" onPress={() => setScreen('editor')}><Label size={13}>Chỉnh sửa</Label></Button></XStack>
    </YStack>
  );
  const galleryScreen = (
    <YStack flex={1} backgroundColor={C.black} paddingTop={Math.max(insets.top, 10)}>
      <XStack height={50} paddingHorizontal={18} alignItems="center" justifyContent="space-between"><Label size={19} weight="700">Thư viện</Label><IconButton icon={<MoreHorizontal size={20} color={C.white} />} onPress={() => setPanel('settings')} /></XStack>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 9, alignItems: 'center', height: 50 }}>
        {['Tất cả', 'Ảnh gốc', 'Ảnh AI', 'Yêu thích'].map((tab) => <Button key={tab} onPress={() => setGalleryTab(tab)} height={33} paddingHorizontal={15} borderRadius={18} backgroundColor={galleryTab === tab ? '#eee9eb' : '#242223'}><Label size={12} color={galleryTab === tab ? '#181617' : '#b5b0b1'} weight={galleryTab === tab ? '600' : '400'}>{tab}</Label></Button>)}
      </ScrollView>
      <ScrollView flex={1} contentContainerStyle={{ padding: 10, gap: 8 }}>
        <XStack gap={8}>{portraits.slice(0, 3).map((uri, i) => <Button key={uri} onPress={() => setScreen(i === 2 ? 'result' : 'editor')} flex={1} height={width * 0.43} padding={0} borderRadius={12} overflow="hidden"><Photo uri={uri} /><YStack position="absolute" bottom={7} left={7} paddingHorizontal={7} paddingVertical={4} backgroundColor={C.glass} borderRadius={10}><Label size={9}>{i === 2 ? 'AI' : i === 0 ? 'Hôm nay' : 'Ảnh gốc'}</Label></YStack></Button>)}</XStack>
        <XStack gap={8}>{portraits.slice(3, 6).map((uri, i) => <Button key={uri} onPress={() => setScreen('editor')} flex={1} height={width * 0.43} padding={0} borderRadius={12} overflow="hidden"><Photo uri={uri} /><YStack position="absolute" bottom={7} left={7} paddingHorizontal={7} paddingVertical={4} backgroundColor={C.glass} borderRadius={10}><Label size={9}>{i === 1 ? 'Yêu thích' : 'Ảnh gốc'}</Label></YStack></Button>)}</XStack>
        <XStack gap={8}>{portraits.slice(6).map((uri, i) => <Button key={uri} onPress={() => setScreen('editor')} flex={1} height={width * 0.43} padding={0} borderRadius={12} overflow="hidden"><Photo uri={uri} /></Button>)}</XStack>
      </ScrollView>
      {bottomNav('Thư viện')}
    </YStack>
  );
  const sheet = panel ? (
    <YStack position="absolute" top={0} left={0} right={0} bottom={0} backgroundColor="rgba(0,0,0,0.38)" justifyContent="flex-end" onPress={() => setPanel(null)}>
      <YStack backgroundColor="#201f20" borderTopLeftRadius={24} borderTopRightRadius={24} paddingTop={10} paddingHorizontal={19} paddingBottom={Math.max(safeBottom, 14)} maxHeight={height * 0.76} onPress={(e: any) => e.stopPropagation()}>
        <YStack alignSelf="center" width={38} height={4} borderRadius={4} backgroundColor="#716d6f" marginBottom={14} />
        <XStack justifyContent="space-between" alignItems="center" marginBottom={17}><Label size={17} weight="700">{panel === 'filters' ? 'Bộ lọc' : panel === 'options' ? 'Tùy chọn máy ảnh' : panel === 'save' ? 'Lưu bộ lọc của bạn' : 'Cài đặt'}</Label><Button chromeless onPress={() => setPanel(null)} width={32} height={32} padding={0}><X size={19} color={C.muted} /></Button></XStack>
        {panel === 'filters' && <YStack gap={15}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 18, paddingBottom: 3 }}>{categories.map((item) => <Button key={item} chromeless onPress={() => setActiveCategory(item)} height={30} paddingHorizontal={2}><YStack alignItems="center" gap={6}><Label size={12} color={activeCategory === item ? C.white : '#999496'}>{item}</Label><YStack height={2} width={activeCategory === item ? 24 : 0} backgroundColor="#df8cca" borderRadius={2} /></YStack></Button>)}</ScrollView>
          <FilterStrip selected={selectedFilter} onSelect={setSelectedFilter} />
          <Intensity value={intensity} onChange={setIntensity} />
          <XStack justifyContent="space-between" gap={12}><Button flex={1} height={43} borderRadius={22} backgroundColor="#302e30" onPress={() => setPanel(null)}><Label size={13}>Hủy</Label></Button><Button flex={1} height={43} borderRadius={22} backgroundColor="#f4f1f1" onPress={() => setPanel(null)}><Label size={13} color="#171516" weight="700">Áp dụng</Label></Button></XStack>
        </YStack>}
        {panel === 'options' && <YStack gap={17}>
          <YStack gap={10}><Label size={12} color={C.muted}>Tỷ lệ</Label><XStack gap={8}>{['3:4', '1:1', '9:16', 'Full'].map((item) => <Button key={item} flex={1} height={37} borderRadius={13} backgroundColor={ratio === item ? '#48434a' : '#2c2a2b'} borderWidth={1} borderColor={ratio === item ? '#d79acb' : C.line} onPress={() => setRatio(item)}><Label size={12}>{item}</Label></Button>)}</XStack></YStack>
          <XStack justifyContent="space-between">{[{label:'Flash', icon:Flashlight, value:flashOn, toggle:()=>setFlashOn(!flashOn)}, {label:timerSeconds === 0 ? 'Hẹn giờ' : `${timerSeconds}s`, icon:Timer, value:timerSeconds > 0, toggle:()=>setTimerSeconds((current) => current === 0 ? 3 : current === 3 ? 10 : 0)}, {label:'Lưới', icon:Grid3x3, value:gridOn, toggle:()=>setGridOn(!gridOn)}, {label:'Làm đẹp AI', icon:Sparkles, value:false, toggle:()=>setScreen('ai')}].map((it) => { const I = it.icon; return <Button key={it.label} chromeless onPress={it.toggle} width={68} height={70}><YStack alignItems="center" gap={8}><YStack width={42} height={42} borderRadius={15} backgroundColor={it.value ? '#49424c' : '#302e30'} alignItems="center" justifyContent="center"><I size={18} color={it.value ? '#e7b1df' : C.white} /></YStack><Label size={10} color="#d4d0d1">{it.label}</Label></YStack></Button>; })}</XStack>
          <XStack onPress={() => setHighQuality((value) => !value)} justifyContent="space-between" alignItems="center" backgroundColor="#2b292a" paddingHorizontal={13} height={48} borderRadius={14}><XStack alignItems="center" gap={9}><Aperture size={17} color={C.white} /><Label size={12}>Chất lượng ảnh</Label></XStack><XStack alignItems="center" gap={6}><Label size={12} color={C.muted}>{highQuality ? 'Cao' : 'Tiêu chuẩn'}</Label><ChevronDown size={14} color={C.muted} /></XStack></XStack>
          <Button height={43} borderRadius={22} backgroundColor="#f4f1f1" onPress={() => setPanel(null)}><Label size={13} color="#171516" weight="700">Xong</Label></Button>
        </YStack>}
        {panel === 'settings' && <YStack gap={11}>{['Lưu ảnh chất lượng cao', 'Đường lưới', 'Âm thanh chụp'].map((item, i) => <XStack key={item} height={46} alignItems="center" justifyContent="space-between" borderBottomWidth={1} borderColor="rgba(255,255,255,0.07)"><Label size={13}>{item}</Label><Button width={42} height={25} padding={2} borderRadius={14} backgroundColor={i === 1 && gridOn ? '#a37bd3' : '#484547'} onPress={() => i === 1 && setGridOn(!gridOn)}><YStack alignSelf={i === 1 && gridOn ? 'flex-end' : 'flex-start'} width={21} height={21} borderRadius={11} backgroundColor="#fff" /></Button></XStack>)}<Button height={43} borderRadius={22} backgroundColor="#f4f1f1" onPress={() => setPanel(null)}><Label size={13} color="#171516" weight="700">Đóng</Label></Button></YStack>}
        {panel === 'save' && <YStack gap={13}>
          <YStack height={92} borderRadius={13} overflow="hidden" alignSelf="center" width={78}><Photo uri={portraits[1]} /></YStack>
          <Label size={11} color={C.muted}>Tên bộ lọc</Label><Input value={filterName} onChangeText={setFilterName} color={C.white} backgroundColor="#2c2a2b" borderColor={C.line} borderRadius={12} height={45} />
          <Label size={11} color={C.muted}>Chọn ảnh đại diện</Label><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 9 }}>{portraits.slice(0, 5).map((uri, i) => <Button key={uri} onPress={() => setSelectedCover(i)} padding={0} width={48} height={54} borderRadius={9} overflow="hidden" borderWidth={i === selectedCover ? 2 : 1} borderColor={i === selectedCover ? C.pink : C.line}><Photo uri={uri} /></Button>)}</ScrollView>
          <Button height={47} borderRadius={24} backgroundColor="#eee9eb" onPress={() => setPanel(null)}><Label size={13} color="#171516" weight="700">Lưu preset</Label></Button>
        </YStack>}
      </YStack>
    </YStack>
  ) : null;
  const content = screen === 'camera' ? cameraScreen : screen === 'captured' ? capturedScreen : screen === 'editor' ? editorScreen : screen === 'ai' ? aiScreen : screen === 'processing' ? processingScreen : screen === 'result' ? resultScreen : screen === 'compare' ? compareScreen : galleryScreen;
  return (
    <YStack flex={1} backgroundColor={C.black} alignItems="center">
      <YStack flex={1} width="100%" maxWidth={480} backgroundColor={C.black} overflow="hidden">
        {content}
        {sheet}
      </YStack>
    </YStack>
  );
}
