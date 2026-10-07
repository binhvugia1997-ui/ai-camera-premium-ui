import type { FilterPreset } from '@/types/editor';

export const filterCategories: FilterPreset['category'][] = ['Nổi bật', 'Tự nhiên', 'Chân dung', 'Phim', 'Mood', 'AI'];

export const filterPresets: FilterPreset[] = [
  { id: 'original', name: 'Original', category: 'Nổi bật', thumbnailIndex: 0 },
  { id: 'fresh', name: 'Trong trẻo', category: 'Tự nhiên', thumbnailIndex: 1 },
  { id: 'warm', name: 'Ấm áp', category: 'Tự nhiên', thumbnailIndex: 2 },
  { id: 'cool', name: 'Lạnh', category: 'Tự nhiên', thumbnailIndex: 3 },
  { id: 'korean', name: 'Hàn Quốc', category: 'Chân dung', thumbnailIndex: 4 },
  { id: 'japanese', name: 'Nhật Bản', category: 'Chân dung', thumbnailIndex: 5 },
  { id: 'vintage', name: 'Vintage', category: 'Phim', thumbnailIndex: 6 },
  { id: 'film', name: 'Film', category: 'Phim', thumbnailIndex: 7 },
  { id: 'cinematic', name: 'Cinematic', category: 'Mood', thumbnailIndex: 8 },
  { id: 'dreamy', name: 'Dreamy', category: 'Mood', thumbnailIndex: 9 },
  { id: 'sunset', name: 'Sunset', category: 'Mood', thumbnailIndex: 10 },
  { id: 'mono', name: 'Đen trắng', category: 'Phim', thumbnailIndex: 11 },
];
