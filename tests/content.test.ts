import assert from 'node:assert/strict';
import test from 'node:test';
import { ENTRIES } from '../src/data/entries';
import { WEDDING } from '../src/data/wedding';
import { SCHEDULE_ITEMS, VENUE_PHOTOS } from '../src/packages/day/data';
import { GALLERY_GROUPS } from '../src/packages/gallery/data';
import { STORY_STEPS } from '../src/packages/story/data';
import { WEEKEND_SECTIONS } from '../src/packages/weekend/data';

test('wedding metadata and chapter order stay frozen', () => {
  assert.deepEqual(WEDDING, {
    couple: '耿信哲 & 何爽', date: '2026.10.03', month: 'OCT', day: '03',
    yearAndWeekday: '2026 · SATURDAY', venue: '铂爵宫皇家婚礼会馆',
    title: '耿信哲 & 何爽 婚礼请柬',
  });
  assert.deepEqual(ENTRIES.map(item => item.title), ['来路偕行', '菲林拾光', '良辰入席', '赴约之外']);
});

test('story, gallery and venue item counts match the Web baseline', () => {
  assert.equal(STORY_STEPS.length, 6);
  assert.equal(STORY_STEPS[1].date, '2017.xx');
  assert.equal(GALLERY_GROUPS.travel.photos.length, 3);
  assert.equal(GALLERY_GROUPS.wedding.photos.length, 3);
  assert.equal(SCHEDULE_ITEMS.length, 4);
  assert.equal(VENUE_PHOTOS.length, 3);
});

test('weekend keeps the three empty source groups without invented places', () => {
  assert.deepEqual(WEEKEND_SECTIONS.map(section => section.label), ['一瞥', '拾趣', '寻味']);
  assert.equal(WEEKEND_SECTIONS.every(section => section.places.length === 0), true);
});
