import { ScrollView, Text, View } from '@tarojs/components';
import { useState } from 'react';
import { Action, Chapter, Photo } from '../../../../components';
import { WEDDING } from '../../../../data/wedding';
import { useInvitationShare } from '../../../../hooks/use-invitation-share';
import { wrapIndex } from '../../../../services/core';
import { SCHEDULE_ITEMS, VENUE_ADDRESS, VENUE_PHOTOS } from '../../data';

export default function Day() {
  useInvitationShare();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const count = VENUE_PHOTOS.length;
  const photo = VENUE_PHOTOS[wrapIndex(index, count)];
  const shift = (offset: number) => setIndex(current => wrapIndex(current + offset, count));
  return <>
    <Chapter id='day' locked={open}>
      <View className='date-block'><Text className='date-primary'>{WEDDING.date.slice(5)}</Text><Text className='mono'>{WEDDING.yearAndWeekday}</Text></View>
      <View className='schedule-list'>{SCHEDULE_ITEMS.map(item => <View className='schedule-item' key={item.time}>
        <Text className='schedule-time mono'>{item.time}</Text><View className='schedule-knot' />
        <View className='schedule-copy'><Text className='subheading'>{item.title}</Text></View>
      </View>)}</View>
      <Text className='day-invitation'>诚挚邀请您的出席</Text>
      <View className='place-card'><View className='place-heading'><View className='place-heading-copy'>
        <Text className='eyebrow'>PLACE / 场地</Text><Text className='venue-name'>{WEDDING.venue}</Text><Text className='body-copy'>{VENUE_ADDRESS}</Text>
      </View><View className='venue-count'><Text>{String(count).padStart(2, '0')}</Text><Text className='mono'>VIEWS</Text></View></View>
        {count > 0 && <Action className='venue-preview' label={`查看婚礼场地照片，共${count}张`} onClick={() => { setIndex(0); setOpen(true); }}>
          <View className='venue-thumbnails'>{VENUE_PHOTOS.map(item => <Photo key={item.src} {...item} />)}</View>
          <View className='venue-action'><View><Text className='eyebrow'>VENUE ALBUM</Text><Text>查看场地影像</Text></View><Text>→</Text></View>
        </Action>}
      </View>
    </Chapter>
    {open && photo && <View className='modal-layer' catchMove>
      <View className='modal-backdrop' onClick={() => setOpen(false)} />
      <View className='venue-dialog'>
        <View className='venue-dialog-header'><View><Text className='eyebrow'>THE WEDDING PLACE · 2026</Text><Text className='subheading'>场地影像</Text></View>
          <Action className='modal-close' label='关闭场地影像' onClick={() => setOpen(false)}>×</Action></View>
        <ScrollView scrollY className='venue-dialog-scroll' enhanced>
          <View className='venue-dialog-body'><Text className='body-copy'>场地影像将在确认后更新。</Text>
            <Photo className='venue-slide' {...photo} mode='aspectFit' />
            <View className='venue-slide-caption'><Text className='mono'>{String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</Text>
              <View><Text className='subheading'>{photo.title}</Text><Text className='body-copy'>{photo.note}</Text></View></View>
          </View>
        </ScrollView>
        <View className='venue-controls'><Action disabled={count < 2} onClick={() => shift(-1)}>← 上一景</Action>
          <View className='venue-dots'>{VENUE_PHOTOS.map((item, i) => <Action key={item.src} className={`dot-button ${i === index ? 'active' : ''}`}
            label={`查看${item.title}${i === index ? '，当前照片' : ''}`} onClick={() => setIndex(i)}><View className='dot' /></Action>)}</View>
          <Action disabled={count < 2} onClick={() => shift(1)}>下一景 →</Action></View>
      </View>
    </View>}
  </>;
}
