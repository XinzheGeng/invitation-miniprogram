import type { PhotoItem } from '../../data/types';
export const SCHEDULE_ITEMS = [
  { time: '11:00', title: '相迎', note: '循着红线而来，留下名字与祝福。' },
  { time: '11:30', title: '入席', note: '请慢慢坐好，良辰即将开启。' },
  { time: '11:58', title: '成礼', note: '在亲友的见证里，许下余生的约定。' },
  { time: '12:20', title: '共宴', note: '举杯同欢，把祝福融进这一席欢喜。' },
] as const;
export const VENUE_PHOTOS: readonly PhotoItem[] = [1, 2, 3].map(number => ({
  src: `/packages/day/assets/venue-0${number}.jpg`, alt: `场地影像第${number}张照片待补充`,
  title: `场地影像 0${number}`, note: '场地照片待补充',
}));
