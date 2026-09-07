import Taro from '@tarojs/taro';
import type { DetailView } from '../data/types';
import { createNavigationGuard, homeAction, ROUTES } from './core';

const guarded = createNavigationGuard(() => {
  void Taro.showToast({ title: '暂时无法打开，请重试', icon: 'none' });
});

export const openInvitation = () => guarded(() => Taro.redirectTo({ url: ROUTES.home }));
export const openChapter = (chapter: DetailView) => guarded(() => Taro.navigateTo({ url: ROUTES[chapter] }));
export const backToCover = () => guarded(() => Taro.reLaunch({ url: ROUTES.cover }));
export const backToHome = () => guarded(async () => {
  const routes = Taro.getCurrentPages().map(page => page.route).filter((route): route is string => !!route);
  const action = homeAction(routes);
  if (action.type === 'launch') return Taro.reLaunch({ url: action.url });
  if (action.delta > 0) return Taro.navigateBack({ delta: action.delta });
});
