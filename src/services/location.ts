import Taro from '@tarojs/taro';
import type { WeekendPlace } from '../data/types';
import { FEATURES } from '../data/wedding';
import { navigatePlace } from './core';

export const showPlace = (place: WeekendPlace) => navigatePlace(place, {
  open: item => Taro.openLocation({ ...item.coordinates!, name: item.name, address: item.address, scale: 16 }),
  copy: async address => {
    const response = await Taro.showModal({ title: '地点地址', content: address, confirmText: '复制地址' });
    if (response.confirm) await Taro.setClipboardData({ data: address });
  },
  notify: title => { void Taro.showToast({ title, icon: 'none' }); },
}, FEATURES.locationNavigation);
