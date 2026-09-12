import { Swiper, SwiperItem, Text, View } from '@tarojs/components';
import { useReducer } from 'react';
import { Action, Chapter, Photo } from '../../../../components';
import { useInvitationShare } from '../../../../hooks/use-invitation-share';
import { galleryReducer, INITIAL_GALLERY } from '../../../../services/core';
import { GALLERY_PHOTOS } from '../../data';

export default function Gallery() {
  useInvitationShare();
  const [state, dispatch] = useReducer(galleryReducer, INITIAL_GALLERY);
  const count = GALLERY_PHOTOS.length;
  return <Chapter id='gallery'>
    <View className='gallery-main'><View className='gallery-photo-frame'>
      {count ? <Swiper key={state.revision} className='gallery-swiper' current={state.index}
        circular={count > 1} duration={250} onChange={event => {
          // Ignore programmatic acknowledgements; stale gestures are rejected by revision.
          if (event.detail.source === 'touch') dispatch({ type: 'swipe', index: event.detail.current, count, revision: state.revision });
        }}>
        {GALLERY_PHOTOS.map(photo => <SwiperItem key={photo.src}><Photo className='gallery-photo' {...photo} /></SwiperItem>)}
      </Swiper> : <View className='gallery-photo photo-fallback'>暂无照片</View>}
      {count > 1 && <View className='gallery-controls'>
        <Action label='查看上一张照片' onClick={() => dispatch({ type: 'shift', offset: -1, count })}>←</Action>
        <Action label='查看下一张照片' onClick={() => dispatch({ type: 'shift', offset: 1, count })}>→</Action>
      </View>}
    </View><View className='gallery-caption mono'><Text>CONTACT SHEET / {String(count ? state.index + 1 : 0).padStart(2, '0')} OF {String(count).padStart(2, '0')}</Text>
      {count > 1 && <Text>左右滑动查看 →</Text>}</View></View>
    <View className='gallery-quote'><Text className='quote-mark'>“</Text><Text>镜头里总有丰收</Text><Text className='quote-mark'>”</Text></View>
  </Chapter>;
}
