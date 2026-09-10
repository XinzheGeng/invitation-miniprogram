import type { WeekendCategory, WeekendPlace } from '../../data/types';
export const WEEKEND_SECTIONS: ReadonlyArray<{ id: WeekendCategory; label: string; places: readonly WeekendPlace[] }> = [
  { id: 'sightseeing', label: '一瞥', places: [
    { id: 'longxing-temple', name: '隆兴寺', address: '正定县中山东路109号', tags: ['摩尼殿壁画', '千手观音像'], driveTime: '' },
    { id: 'xibaipo', name: '西柏坡', address: '平山县西柏坡景区', tags: ['解读革命战略', '中共中央旧址'], driveTime: '' },
  ] },
  { id: 'shopping', label: '拾趣', places: [
    { id: 'mixc', name: '万象城', address: '石家庄市桥西区中山西路108号', tags: [], driveTime: '' },
    { id: 'brown-sugar-livehouse', name: '红糖LIVEHOUSE', address: '石家庄市新华区湾里庙步行街M08星光艺术空间', tags: [], driveTime: '' },
  ] },
  { id: 'food', label: '寻味', places: [
    { id: 'haojia-ribs', name: '真定郝家排骨', address: '正定县元曲博物馆南门西120米', tags: [], driveTime: '' },
    { id: 'sushuncheng', name: '苏顺成绿豆饼', address: '石家庄市长安区中山东路428号', tags: [], driveTime: '' },
  ] },
];
