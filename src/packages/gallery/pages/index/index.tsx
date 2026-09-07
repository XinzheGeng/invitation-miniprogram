import { Swiper, SwiperItem, Text, View } from '@tarojs/components';
import { useReducer } from 'react';
import { Action, Chapter, Photo } from '../../../../components';
import type { GalleryCategory } from '../../../../data/types';
import { useInvitationShare } from '../../../../hooks/use-invitation-share';
import { galleryReducer, INITIAL_GALLERY } from '../../../../services/core';
import { GALLERY_GROUPS } from '../../data';

const CATEGORIES: readonly GalleryCategory[] = ['travel', 'wedding'];
export default function Gallery() {
  useInvitationShare();
  const [state, dispatch] = useReducer(galleryReducer, INITIAL_GALLERY);
  const group = GALLERY_GROUPS[state.category];
  const count = group.photos.length;
  return <Chapter id='gallery'>
    <View className='gallery-tabs'>{CATEGORIES.map(category => <Action key={category}
      className={state.category === category ? 'tab active' : 'tab'}
      label={`${GALLERY_GROUPS[category].label}${state.category === category ? '，已选中' : ''}`}
      onClick={() => dispatch({ type: 'select', category })}>{GALLERY_GROUPS[category].label}</Action>)}</View>
    <View className='gallery-main'><View className='gallery-photo-frame'>
      {count ? <Swiper key={`${state.category}-${state.revision}`} className='gallery-swiper' current={state.index}
        circular={count > 1} duration={250} onChange={event => {
          // Ignore programmatic acknowledgements; old category gestures are rejected by revision.
          if (event.detail.source === 'touch') dispatch({ type: 'swipe', index: event.detail.current, count, revision: state.revision });
        }}>
        {group.photos.map(photo => <SwiperItem key={photo.src}><Photo className='gallery-photo' {...photo} /></SwiperItem>)}
      </Swiper> : <View className='gallery-photo photo-fallback'>照片待补充</View>}
      {count > 1 && <View className='gallery-controls'>
        <Action label='查看上一张照片' onClick={() => dispatch({ type: 'shift', offset: -1, count })}>←</Action>
        <Action label='查看下一张照片' onClick={() => dispatch({ type: 'shift', offset: 1, count })}>→</Action>
      </View>}
    </View><View className='gallery-caption mono'><Text>CONTACT SHEET / {String(count ? state.index + 1 : 0).padStart(2, '0')} OF {String(count).padStart(2, '0')}</Text>
      {count > 1 && <Text>左右滑动查看 →</Text>}</View></View>
    <View className='gallery-quote'><Text className='quote-mark'>“</Text><Text>镜头里总有丰收</Text><Text className='quote-mark'>”</Text></View>
  </Chapter>;
}
