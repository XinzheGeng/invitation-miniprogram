import { Image, Text, View } from '@tarojs/components';
import { Action, PaperLayout, Photo } from '../../components';
import { WEDDING } from '../../data/wedding';
import { useInvitationShare } from '../../hooks/use-invitation-share';
import { openInvitation } from '../../services/navigation';

export default function Cover() {
  useInvitationShare();
  return <PaperLayout className='cover-screen'>
    <View className='cover-meta mono'><Text>WEDDING INVITATION · 2026</Text><Text>致我们最重要的人</Text></View>
    <View className='cover-title-block'>
      <Text className='eyebrow'>{WEDDING.couple} · INVITATION</Text>
      <Text className='cover-title'>一根红线，{'\n'}装订两个人生</Text>
      <Text className='cover-lead muted'>从各自的小时候，走到共同的以后。</Text>
    </View>
    <View className='cover-photo'><Photo src='/assets/cover-main.jpg' alt='封面照片待补充' />
      <Text className='caption mono'>THE BEGINNING</Text></View>
    <Image className='cover-thread' src='/assets/cover-thread.png' mode='scaleToFill' />
    <View className='cover-info'>
      <View className='cover-info-date'><Text className='eyebrow'>DATE</Text><Text>{WEDDING.date}</Text></View>
      <View className='cover-info-place'><Text className='eyebrow'>PLACE</Text><Text>{WEDDING.venue}</Text></View>
    </View>
    <Action className='seal-button' onClick={openInvitation} label='打开请柬并进入导航页'>
      <Text>轻触启封</Text><Text>↗</Text>
    </Action>
    <Text className='cover-footnote muted'>红线将带你进入请柬，并陪你走过每一页</Text>
  </PaperLayout>;
}
