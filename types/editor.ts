export type CameraMode = 'Ảnh' | 'Video';
export type FilterCategory = 'Nổi bật' | 'Tự nhiên' | 'Chân dung' | 'Phim' | 'Mood' | 'AI';

export interface FilterPreset {
  id: string;
  name: string;
  category: FilterCategory;
  thumbnailIndex: number;
}

export type AdjustmentKey = 'brightness' | 'contrast' | 'highlights' | 'shadows' | 'saturation' | 'warmth' | 'sharpness';
export type AdjustmentState = Record<AdjustmentKey, number>;

export type CameraPanel = 'filters' | 'options' | 'settings' | null;

export const defaultAdjustments: AdjustmentState = {
  brightness: 10,
  contrast: 8,
  highlights: -12,
  shadows: 6,
  saturation: 10,
  warmth: 10,
  sharpness: 5,
};
