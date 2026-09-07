import { Text, View } from '@tarojs/components';
import { Action, Chapter, Photo } from '../../../../components';
import { FEATURES } from '../../../../data/wedding';
import { useInvitationShare } from '../../../../hooks/use-invitation-share';
import { validCoordinates } from '../../../../services/core';
import { showPlace } from '../../../../services/location';
import { WEEKEND_SECTIONS } from '../../data';

export default function Weekend() {
  useInvitationShare();
  return <Chapter id='weekend'>
    <View className='weekend-hero'><Photo src='/packages/weekend/assets/weekend-hero.jpg' alt='石家庄周边推荐照片待补充' />
      <Text className='caption mono'>WEEKEND NOTES</Text></View>
    {WEEKEND_SECTIONS.map((section, index) => <View className='weekend-section' key={section.id}>
      <View className='weekend-heading'><Text className='section-number mono'>{String(index + 1).padStart(2, '0')}</Text><Text className='subheading'>{section.label}</Text></View>
      {section.places.map(place => <View key={place.id} className='weekend-place-card'>
        <Text className='subheading'>{place.name}</Text><View className='place-tags'>{place.tags.map(tag => <Text className='place-tag' key={tag}>{tag}</Text>)}</View>
        <Text className='body-copy'>{place.address}</Text><Text className='body-copy'>从婚礼场地出发，预计车程 {place.driveTime}</Text>
        {(place.address.trim() || (FEATURES.locationNavigation && validCoordinates(place.coordinates))) && <Action onClick={() => showPlace(place)}>
          {FEATURES.locationNavigation && validCoordinates(place.coordinates) ? '地图导航 ↗' : '查看并复制地址 ↗'}
        </Action>}
      </View>)}
    </View>)}
  </Chapter>;
}
