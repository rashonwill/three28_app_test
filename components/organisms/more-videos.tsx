// import * as Tabs from '@radix-ui/react-tabs';
import { VideoWithOptions } from './video-with-options';
import Typography from '../atoms/typography';
import Home from '@/app/(explorer)/home';
import Films from '@/app/(explorer)/films';
import Series from '@/app/(explorer)/series';
import Podcast from '@/app/(explorer)/podcast';
import Music from '@/app/(explorer)/music';
import Tech from '@/app/(explorer)/tech';
import Vlogs from '@/app/(explorer)/vlogs';
import {
  Box,
  Tab,
  Tabs,
  TabContext,
  TabPanel,
} from '@mui/material';


export default function MoreVideos() {
  return (
    <>
        <Box sx={{ width: '100%' }} class="tab-menu">
      <Tabs
        textColor="secondary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Home" />
        <Tab value="two" label="Films" />
        <Tab value="three" label="Series" />
        <Tab value="four" label="Podcast" />
        <Tab value="five" label="Music" />
        <Tab value="six" label="Tech" />
        <Tab value="six" label="Vlogs" />
      </Tabs>
    </Box>
    </>


    // <Tabs.Root defaultValue='Home' className='mb-20 max-lg:hidden'>
    //   <Tabs.List className='mt-10 space-x-7'>
    //     {data.map((_) => (
    //       <Tabs.Trigger key={_} value={_} className='aria-selected:underline'>
    //         <Typography variant='h5'>{_}</Typography>
    //       </Tabs.Trigger>
    //     ))}
    //   </Tabs.List>
    //   <Tabs.Content value='Home' className='flex flex-wrap [&>*]:max-w-xs pt-6 gap-5'>
    //    <Home />
    //   </Tabs.Content>
    //   <Tabs.Content value='Films' className='flex flex-wrap [&>*]:max-w-xs pt-4 gap-5'>
    //   <Films />
    //   </Tabs.Content>
    //   <Tabs.Content value='Series' className='flex flex-wrap [&>*]:max-w-xs pt-4 gap-5'>
    //   <Series />
    //   </Tabs.Content>
    //   <Tabs.Content value='Podcast' className='flex flex-wrap [&>*]:max-w-xs pt-4 gap-5'>
    //   <Podcast />
    //   </Tabs.Content>
    //   <Tabs.Content value='Music' className='flex flex-wrap [&>*]:max-w-xs pt-4 gap-5'>
    //   <Music />
    //   </Tabs.Content>
    //   <Tabs.Content value='Tech' className='flex flex-wrap [&>*]:max-w-xs pt-4 gap-5'>
    //   <Tech />
    //   </Tabs.Content>
    //   <Tabs.Content value='Vlogs' className='flex flex-wrap [&>*]:max-w-xs pt-4 gap-5'>
    //   <Vlogs />
    //   </Tabs.Content>
    // </Tabs.Root>
  );
}

const data = ['Home', 'Films', 'Series', 'Podcast', 'Music', 'Tech', 'Vlogs'];
