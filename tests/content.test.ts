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
  assert.equal(STORY_STEPS.every(step => Boolean(step.photo) && Boolean(step.photoAlt)), true);
  assert.match(STORY_STEPS.find(step => step.id === 'nanjing')!.body, /慢慢学会彼此的步调/);
  assert.match(STORY_STEPS.find(step => step.id === 'growth')!.body, /我望着你一步步走向钟爱的师范方向/);
  assert.match(STORY_STEPS.find(step => step.id === 'growth')!.body, /你常捧一杯咖啡来实验室，陪我跑实验、写论文/);
  assert.match(STORY_STEPS.find(step => step.id === 'beijing')!.body, /新的城市找到适合自己的工作/);
  assert.match(STORY_STEPS.find(step => step.id === 'wedding')!.body, /亲友盈满的祝福/);
  assert.equal(GALLERY_GROUPS.travel.photos.length, 3);
  assert.equal(GALLERY_GROUPS.wedding.photos.length, 3);
  assert.equal(SCHEDULE_ITEMS.length, 4);
  assert.equal(SCHEDULE_ITEMS[0].time, '10:30');
  assert.equal(SCHEDULE_ITEMS.every(item => item.title.length === 2 && !('note' in item)), true);
  assert.equal(VENUE_PHOTOS.length, 3);
});

test('weekend keeps the three empty source groups without invented places', () => {
  assert.deepEqual(WEEKEND_SECTIONS.map(section => section.label), ['一瞥', '拾趣', '寻味']);
  assert.equal(WEEKEND_SECTIONS.every(section => section.places.length === 0), true);
});
