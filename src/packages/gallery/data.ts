import type { PhotoItem } from '../../data/types';

export const GALLERY_PHOTOS: readonly PhotoItem[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => ({
  src: `/packages/gallery/assets/gallery-photo-0${number}.jpg`,
  alt: `照片集第${number}张`,
}));
