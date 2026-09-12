import type { PhotoItem } from '../../data/types';
export const VENUE_ADDRESS = '河北省石家庄市裕华区富强大街19号';
export const SCHEDULE_ITEMS = [
  { time: '10:30', title: '相迎' },
  { time: '11:30', title: '入席' },
  { time: '11:58', title: '成礼' },
  { time: '12:20', title: '共宴' },
] as const;
export const VENUE_PHOTOS: readonly PhotoItem[] = [1, 2, 3].map(number => ({
  src: `/packages/day/assets/venue-0${number}.jpg`, alt: `场地影像第${number}张实景照片`,
  title: `场地影像 0${number}`, note: '场地实景照片',
}));
