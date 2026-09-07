import { Text, View } from '@tarojs/components';
import { Chapter, Photo } from '../../../../components';
import { useInvitationShare } from '../../../../hooks/use-invitation-share';
import { STORY_STEPS } from '../../data';

export default function Story() {
  useInvitationShare();
  return <Chapter id='story'><View className='story-list'><View className='story-line' />
    {STORY_STEPS.map((step, index) => <View className='story-item' key={step.id}>
      <View className='story-knot' /><Text className='story-date mono'>{step.date}</Text>
      <View className='story-copy'><Text className='subheading'>{step.title}</Text><Text className='body-copy'>{step.body}</Text></View>
      {index === 1 && <Photo className='story-photo' src='/packages/story/assets/story-trip.jpg' alt='南京旅行照片待补充' />}
    </View>)}</View></Chapter>;
}
