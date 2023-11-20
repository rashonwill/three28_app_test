import Typography from '@/components/atoms/typography';
import Video from '@/components/molecules/video';
import * as Tabs from '@radix-ui/react-tabs';
import Discover from './discover';
import Watchlist from './watchlist';
import Favorites from './favorites';

export default function Sidebar() {
  return (
    <Tabs.Root defaultValue='Discover' className='max-lg:hidden w-3/12'>
      <Tabs.List className='flex gap-5 whitespace-nowrap'>
        {['Discover', 'Watchlist', 'Favorites'].map((_) => (
          <Tabs.Trigger className='aria-selected:underline' key={_} value={_}>
            <Typography variant='h5'>{_}</Typography>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Tabs.Content value='Discover' className='space-y-5'>
       <Discover />
      </Tabs.Content>
      <Tabs.Content value='Watchlist' className='space-y-5'>
      <Watchlist />
      </Tabs.Content>
      <Tabs.Content value='Favorites' className='space-y-5'>
        <Favorites />
      </Tabs.Content>
    </Tabs.Root>
  );
}
