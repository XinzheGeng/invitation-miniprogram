import type { WeekendPlace } from '../data/types';

export const ROUTES = {
  cover: '/pages/cover/index',
  home: '/pages/home/index',
  story: '/packages/story/pages/index/index',
  gallery: '/packages/gallery/pages/index/index',
  day: '/packages/day/pages/index/index',
  weekend: '/packages/weekend/pages/index/index',
} as const;

export function wrapIndex(index: number, count: number): number {
  return count > 0 ? ((index % count) + count) % count : 0;
}

export function homeAction(routes: readonly string[]) {
  const index = routes.lastIndexOf(ROUTES.home.slice(1));
  return index >= 0
    ? { type: 'back' as const, delta: routes.length - 1 - index }
    : { type: 'launch' as const, url: ROUTES.home };
}

export function validCoordinates(coordinates: WeekendPlace['coordinates']): boolean {
  return !!coordinates && coordinates.system === 'gcj02'
    && Number.isFinite(coordinates.latitude) && Math.abs(coordinates.latitude) <= 90
    && Number.isFinite(coordinates.longitude) && Math.abs(coordinates.longitude) <= 180;
}

export function createNavigationGuard(onError: () => void) {
  let busy = false;
  return async (action: () => Promise<unknown>) => {
    if (busy) return false;
    busy = true;
    try { await action(); return true; }
    catch { onError(); return false; }
    finally { busy = false; }
  };
}

export type LocationPort = {
  open: (place: WeekendPlace) => Promise<unknown>;
  copy: (address: string) => Promise<unknown>;
  notify: (message: string) => void;
};

export async function navigatePlace(place: WeekendPlace, port: LocationPort, enabled: boolean) {
  if (enabled && validCoordinates(place.coordinates)) {
    try { await port.open(place); return 'opened'; }
    catch { port.notify('暂时无法打开地图，请复制地址'); }
  }
  if (!place.address.trim()) { port.notify('地址待补充'); return 'unavailable'; }
  try { await port.copy(place.address); return 'copied'; }
  catch { port.notify('复制失败，请重试'); return 'failed'; }
}

export type GalleryState = { category: 'travel' | 'wedding'; index: number; revision: number };
export type GalleryAction =
  | { type: 'select'; category: GalleryState['category'] }
  | { type: 'shift'; offset: number; count: number }
  | { type: 'swipe'; index: number; count: number; revision: number };
export const INITIAL_GALLERY: GalleryState = { category: 'travel', index: 0, revision: 0 };

export function galleryReducer(state: GalleryState, action: GalleryAction): GalleryState {
  if (action.type === 'select') return { category: action.category, index: 0, revision: state.revision + 1 };
  if (action.type === 'swipe' && state.revision !== action.revision) return state;
  const next = action.type === 'shift' ? state.index + action.offset : action.index;
  return { ...state, index: wrapIndex(next, action.count) };
}
