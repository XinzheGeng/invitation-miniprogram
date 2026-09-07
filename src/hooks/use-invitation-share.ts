import { useShareAppMessage } from '@tarojs/taro';
import { WEDDING } from '../data/wedding';
import { ROUTES } from '../services/core';

export function useInvitationShare() {
  useShareAppMessage(() => ({ title: WEDDING.title, path: ROUTES.cover, imageUrl: '/assets/share.jpg' }));
}
