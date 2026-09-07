import { Button, Image, ScrollView, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState, type PropsWithChildren } from 'react';
import type { DetailView } from '../data/types';
import { ENTRIES } from '../data/entries';
import { FEATURES, WEDDING } from '../data/wedding';
import { backToHome } from '../services/navigation';

export function Action({ children, onClick, className = '', label, disabled = false }: PropsWithChildren<{
  onClick: () => unknown; className?: string; label?: string; disabled?: boolean;
}>) {
  return <Button className={`action ${className}`} hoverClass='action-pressed' ariaLabel={label}
    disabled={disabled} onClick={() => { onClick(); }}>{children}</Button>;
}

export function Photo({ src, alt, className = '', mode = 'aspectFill' }: {
  src: string; alt: string; className?: string; mode?: 'aspectFill' | 'aspectFit';
}) {
  const [failed, setFailed] = useState(false);
  return <View className={`photo ${className}`}>
    {failed ? <Text className='photo-fallback'>{alt || '图片暂时无法显示'}</Text>
      : <Image className='photo-image' src={src} mode={mode} ariaLabel={alt} onError={() => setFailed(true)} />}
  </View>;
}

export function PaperLayout({ children, className = '', locked = false }: PropsWithChildren<{
  className?: string; locked?: boolean;
}>) {
  const [insets] = useState(() => {
    try {
      const info = Taro.getWindowInfo();
      const capsule = Taro.getMenuButtonBoundingClientRect();
      return {
        top: Math.max(capsule.bottom + 12, (info.statusBarHeight || 20) + 48),
        bottom: Math.max(info.screenHeight - (info.safeArea?.bottom ?? info.screenHeight), 16),
      };
    } catch { return { top: 80, bottom: 20 }; }
  });
  return <ScrollView className='paper-scroll' scrollY={!locked} enhanced showScrollbar={false}>
    <View className={`paper ${FEATURES.animations ? 'screen-enter' : ''} ${className}`}
      style={{ paddingTop: `${insets.top}px`, paddingBottom: `${insets.bottom + 24}px` }}>{children}</View>
  </ScrollView>;
}

export function Chapter({ id, children, locked = false }: PropsWithChildren<{ id: DetailView; locked?: boolean }>) {
  const entry = ENTRIES.find(item => item.id === id)!;
  return <PaperLayout className={`detail-${id}`} locked={locked}>
    <View className='detail-header'>
      <Action onClick={backToHome} label='返回目录'>← 循红线返回</Action>
      <Text className='mono'>{entry.number} / 04</Text>
    </View>
    <View className='detail-title'>
      <Text className='eyebrow'>{entry.subtitle}</Text><Text className='heading'>{entry.title}</Text>
      <Text className='muted'>{entry.note}</Text>
    </View>
    {children}
    <View className='detail-footer'><Text>{WEDDING.couple} · {WEDDING.date}</Text>
      <Action onClick={backToHome}>回到目录 ↑</Action></View>
  </PaperLayout>;
}
