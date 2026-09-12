import { Text, View } from '@tarojs/components';
import { Chapter, Photo } from '../../../../components';
import { useInvitationShare } from '../../../../hooks/use-invitation-share';
import { WEEKEND_SECTIONS } from '../../data';

export default function Weekend() {
  useInvitationShare();
  return <Chapter id='weekend'>
    <View className='weekend-hero'><Photo src='/packages/weekend/assets/weekend-hero.jpg' alt='石家庄周边出行照片' />
      <Text className='caption mono'>WEEKEND NOTES</Text></View>
    {WEEKEND_SECTIONS.map((section, index) => <View className='weekend-section' key={section.id}>
      <View className='weekend-heading'><Text className='section-number mono'>{String(index + 1).padStart(2, '0')}</Text><Text className='subheading'>{section.label}</Text></View>
      {section.places.map((place, placeIndex) => <View key={place.id} className='weekend-place'>
        <Text className='weekend-place-number mono'>{String(placeIndex + 1).padStart(2, '0')}</Text>
        <Text className='weekend-place-name'>{place.name}</Text>
        <Text className='weekend-place-address'>{place.address}</Text>
        {place.tags.length > 0 && <Text className='weekend-place-note'>{place.tags.join('、')}</Text>}
      </View>)}
    </View>)}
  </Chapter>;
}
