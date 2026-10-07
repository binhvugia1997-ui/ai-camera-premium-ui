import React, { createContext, useContext, useMemo, useState } from 'react';
import { defaultAdjustments, type AdjustmentState, type CameraMode } from '@/types/editor';

interface CameraDemoState {
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
  activeCategory: string;
  setActiveCategory: (value: string) => void;
  cameraMode: CameraMode;
  setCameraMode: (value: CameraMode) => void;
  ratio: string;
  setRatio: (value: string) => void;
  intensity: number;
  setIntensity: (value: number) => void;
  comparePosition: number;
  setComparePosition: (value: number) => void;
  galleryTab: string;
  setGalleryTab: (value: string) => void;
  liked: boolean;
  setLiked: (value: boolean) => void;
  filterName: string;
  setFilterName: (value: string) => void;
  flashOn: boolean;
  setFlashOn: (value: boolean) => void;
  gridOn: boolean;
  setGridOn: (value: boolean) => void;
  cameraFacing: boolean;
  setCameraFacing: (value: boolean) => void;
  timerSeconds: number;
  setTimerSeconds: (value: number | ((current: number) => number)) => void;
  highQuality: boolean;
  setHighQuality: (value: boolean) => void;
  selectedCover: number;
  setSelectedCover: (value: number) => void;
  editorTab: string;
  setEditorTab: (value: string) => void;
  adjustments: AdjustmentState;
  setAdjustments: React.Dispatch<React.SetStateAction<AdjustmentState>>;
}

const CameraDemoContext = createContext<CameraDemoState | null>(null);

export function CameraDemoProvider({ children }: { children: React.ReactNode }) {
  const [selectedFilter, setSelectedFilter] = useState('Trong trẻo');
  const [activeCategory, setActiveCategory] = useState('Tự nhiên');
  const [cameraMode, setCameraMode] = useState<CameraMode>('Ảnh');
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
  const [adjustments, setAdjustments] = useState<AdjustmentState>(defaultAdjustments);
  const value = useMemo(() => ({
    selectedFilter, setSelectedFilter, activeCategory, setActiveCategory,
    cameraMode, setCameraMode, ratio, setRatio, intensity, setIntensity,
    comparePosition, setComparePosition, galleryTab, setGalleryTab, liked, setLiked,
    filterName, setFilterName, flashOn, setFlashOn, gridOn, setGridOn,
    cameraFacing, setCameraFacing, timerSeconds, setTimerSeconds, highQuality,
    setHighQuality, selectedCover, setSelectedCover, editorTab, setEditorTab,
    adjustments, setAdjustments,
  }), [selectedFilter, activeCategory, cameraMode, ratio, intensity, comparePosition,
    galleryTab, liked, filterName, flashOn, gridOn, cameraFacing, timerSeconds,
    highQuality, selectedCover, editorTab, adjustments]);
  return <CameraDemoContext.Provider value={value}>{children}</CameraDemoContext.Provider>;
}

export function useCameraDemo() {
  const context = useContext(CameraDemoContext);
  if (!context) throw new Error('useCameraDemo must be used within CameraDemoProvider');
  return context;
}
