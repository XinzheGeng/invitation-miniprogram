import { Image, Text, View } from '@tarojs/components';
import { Action, PaperLayout, Photo } from '../../components';
import { ENTRIES } from '../../data/entries';
import { WEDDING } from '../../data/wedding';
import { useInvitationShare } from '../../hooks/use-invitation-share';
import { backToCover, openChapter } from '../../services/navigation';

export default function Home() {
  useInvitationShare();
  return <PaperLayout className='hub-screen'>
    <View className='hub-header'><View><Text className='eyebrow'>HOME / 01</Text><Text className='hub-couple'>{WEDDING.couple}</Text></View>
      <Action onClick={backToCover}>← 回到封面</Action></View>
    <View className='hub-hero'><Photo src='/assets/hub-main.jpg' alt='导航页照片待补充' />
      <View className='hero-caption'><Text className='mono'>WE ARE GETTING MARRIED</Text><Text>{WEDDING.date}</Text></View></View>
    <View className='invitation-note'><Text className='invitation-label'>诚挚邀请你</Text><Text>来见证我们的重要一天，也来翻阅这份关于“我们”的小小档案。</Text></View>
    <View className='thread-nav'>
      <Image className='hub-thread' src='/assets/hub-thread.png' mode='scaleToFill' />
      <View className='entry-grid'>{ENTRIES.map(entry => <Action key={entry.id} className={`entry-card entry-${entry.id}`}
        label={`进入${entry.subtitle}：${entry.title}`} onClick={() => openChapter(entry.id)}>
        <Text className='entry-number mono'>{entry.number}</Text><Photo className='entry-image' src={entry.image} alt={entry.subtitle} />
        <View className='entry-copy'><Text className='entry-subtitle'>{entry.subtitle}</Text><Text className='entry-title'>{entry.title}</Text><Text className='entry-note'>{entry.note}</Text></View>
        <Text className='entry-arrow'>↗</Text></Action>)}</View>
    </View>
    <View className='hub-footer mono'><Text>沿红线任选一页</Text><Text>INVITATION · 2026</Text></View>
  </PaperLayout>;
}
