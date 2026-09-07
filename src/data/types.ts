export type DetailView = 'story' | 'gallery' | 'day' | 'weekend';
export type GalleryCategory = 'travel' | 'wedding';
export type WeekendCategory = 'sightseeing' | 'shopping' | 'food';
export interface PhotoItem { src: string; alt: string; title?: string; note?: string }
export interface WeekendPlace {
  id: string;
  name: string;
  tags: readonly string[];
  address: string;
  driveTime: string;
  mapUrl?: string;
  coordinates?: { latitude: number; longitude: number; system: 'gcj02' };
}
