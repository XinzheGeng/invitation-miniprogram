import { ScrollView, Text, View } from '@tarojs/components';
import { useState } from 'react';
import { Action, Chapter, Photo } from '../../../../components';
import { useInvitationShare } from '../../../../hooks/use-invitation-share';
import { STORY_STEPS } from '../../data';

export default function Story() {
  useInvitationShare();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = STORY_STEPS.find(step => step.id === selectedId);
  const close = () => setSelectedId(null);
  return <>
    <Chapter id='story' locked={selected !== undefined}><View className='story-list'><View className='story-line' />
    {STORY_STEPS.map(step => <View className='story-item' key={step.id}>
      <View className='story-knot' /><Text className='story-date mono'>{step.date}</Text>
      <View className='story-content'><Action className='story-thumbnail' label={`查看${step.title}照片`} onClick={() => setSelectedId(step.id)}>
        <Photo src={step.photo} alt={step.photoAlt} />
      </Action><View className='story-copy'><Text className='subheading'>{step.title}</Text><Text className='body-copy'>{step.body}</Text></View></View>
    </View>)}</View></Chapter>
    {selected && <View className='modal-layer' catchMove>
      <View className='modal-backdrop' onClick={close} />
      <View className='story-dialog'>
        <View className='story-dialog-header'><View><Text className='eyebrow'>OUR STORY · {selected.date}</Text><Text className='subheading'>{selected.title}</Text></View>
          <Action className='modal-close' label={`关闭${selected.title}照片`} onClick={close}>×</Action></View>
        <ScrollView scrollY className='story-dialog-scroll' enhanced><View className='story-dialog-body'>
          <Photo className='story-dialog-photo' src={selected.photo} alt={selected.photoAlt} mode='aspectFit' />
          <Text className='body-copy'>{selected.body}</Text>
        </View></ScrollView>
      </View>
    </View>}
  </>;
}
