import type { GalleryCategory, PhotoItem } from '../../data/types';
export const GALLERY_GROUPS: Record<GalleryCategory, { label: string; photos: readonly PhotoItem[] }> = {
  travel: { label: '旅途', photos: [1, 2, 3].map(number => ({ src: `/packages/gallery/assets/gallery-travel-0${number}.jpg`, alt: `旅途分类第${number}张照片待补充` })) },
  wedding: { label: '成婚', photos: [1, 2, 3].map(number => ({ src: `/packages/gallery/assets/gallery-wedding-0${number}.jpg`, alt: `成婚分类第${number}张照片待补充` })) },
};
