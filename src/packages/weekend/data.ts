import type { WeekendCategory, WeekendPlace } from '../../data/types';
export const WEEKEND_SECTIONS: ReadonlyArray<{ id: WeekendCategory; label: string; places: readonly WeekendPlace[] }> = [
  { id: 'sightseeing', label: '一瞥', places: [] },
  { id: 'shopping', label: '拾趣', places: [] },
  { id: 'food', label: '寻味', places: [] },
];
