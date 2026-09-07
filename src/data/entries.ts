import type { DetailView } from './types';

export const ENTRIES: ReadonlyArray<{
  id: DetailView; number: string; title: string; subtitle: string; note: string; image: string;
}> = [
  { id: 'story', number: '01', title: '来路偕行', subtitle: '我们的故事', note: '从相遇，到并肩走向今天', image: '/assets/nav-story.jpg' },
  { id: 'gallery', number: '02', title: '菲林拾光', subtitle: '旅途与成婚', note: '把喜欢的时刻，装订成册', image: '/assets/nav-gallery.jpg' },
  { id: 'day', number: '03', title: '良辰入席', subtitle: '婚礼当天', note: '关于时间、地点与相见', image: '/assets/nav-day.jpg' },
  { id: 'weekend', number: '04', title: '赴约之外', subtitle: '周边游玩', note: '也想把这座城，介绍给你', image: '/assets/nav-weekend.jpg' },
];
