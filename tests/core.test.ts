import assert from 'node:assert/strict';
import test from 'node:test';
import { createNavigationGuard, galleryReducer, homeAction, INITIAL_GALLERY, navigatePlace, validCoordinates, wrapIndex } from '../src/services/core';

test('wrapIndex cycles safely and handles empty lists', () => {
  assert.equal(wrapIndex(-1, 3), 2);
  assert.equal(wrapIndex(3, 3), 0);
  assert.equal(wrapIndex(8, 0), 0);
});

test('gallery changes category at zero and rejects stale swipe', () => {
  const changed = galleryReducer({ ...INITIAL_GALLERY, index: 2 }, { type: 'select', category: 'wedding' });
  assert.deepEqual(changed, { category: 'wedding', index: 0, revision: 1 });
  assert.deepEqual(galleryReducer(changed, { type: 'swipe', index: 2, count: 3, revision: 0 }), changed);
  assert.equal(galleryReducer(changed, { type: 'shift', offset: -1, count: 3 }).index, 2);
});

test('route fallback returns to existing home or relaunches', () => {
  assert.deepEqual(homeAction(['pages/home/index', 'packages/day/pages/index/index']), { type: 'back', delta: 1 });
  assert.deepEqual(homeAction(['packages/day/pages/index/index']), { type: 'launch', url: '/pages/home/index' });
});

test('coordinates must be finite GCJ-02 values', () => {
  assert.equal(validCoordinates({ latitude: 38, longitude: 114, system: 'gcj02' }), true);
  assert.equal(validCoordinates({ latitude: 91, longitude: 114, system: 'gcj02' }), false);
});

test('location opens when enabled and falls back to copy', async () => {
  const calls: string[] = [];
  const place = { id: 'x', name: '测试地点', tags: [], address: '测试地址', driveTime: '10 分钟', coordinates: { latitude: 38, longitude: 114, system: 'gcj02' as const } };
  const port = { open: async () => { throw new Error('denied'); }, copy: async () => { calls.push('copy'); }, notify: (x: string) => calls.push(x) };
  assert.equal(await navigatePlace(place, port, true), 'copied');
  assert.deepEqual(calls, ['暂时无法打开地图，请复制地址', 'copy']);
});

test('location without an address stays unavailable', async () => {
  const calls: string[] = [];
  const place = { id: 'x', name: '待补地点', tags: [], address: ' ', driveTime: '' };
  const port = { open: async () => {}, copy: async () => {}, notify: (x: string) => calls.push(x) };
  assert.equal(await navigatePlace(place, port, false), 'unavailable');
  assert.deepEqual(calls, ['地址待补充']);
});

test('navigation guard ignores a concurrent tap and releases afterward', async () => {
  let release!: () => void;
  const pending = new Promise<void>(resolve => { release = resolve; });
  const guard = createNavigationGuard(() => {});
  const first = guard(() => pending);
  assert.equal(await guard(async () => {}), false);
  release();
  assert.equal(await first, true);
  assert.equal(await guard(async () => {}), true);
});
