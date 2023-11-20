'use client';
import React from "react";
import useSidebarStore from '@/lib/store/sidebar-store';
import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import Typography from '../atoms/typography';
import Films from '@/app/(explorer)/films';
import Series from '@/app/(explorer)/series';
import Podcast from '@/app/(explorer)/podcast';
import Music from '@/app/(explorer)/music';
import Tech from '@/app/(explorer)/tech';


export default function Sidebar() {
  const { open, setOpen } = useSidebarStore();
  return (
    open && (
      <>
        <motion.div
          animate={{ width: 'auto', opacity: 1 }}
          initial={{ width: 0, opacity: 0 }}
          className='fixed inset-0 z-10 backdrop-blur-md'
          onClick={setOpen}
        >
          <Tabs.Root
            defaultValue='Browse'
            className='fixed inset-0 z-10 flex w-1/2 bg-background '
          >
            <Tabs.List className='flex flex-col items-start gap-6 px-6 pt-32 '>
              {tabs.map((_: string, idx: number) => (
                <>
                  <Tabs.Trigger
                    className='w-full px-6 text-left aria-selected:bg-gradient-to-r from-primary-light to-primary-dark aria-selected:text-background rounded-2xl py-0.5'
                    value={_}
                    key={_}
                  >
                    <Typography variant='h5'>{_}</Typography>
                  </Tabs.Trigger>
                </>
              ))}
            </Tabs.List>
        <Tabs.Content value='Films' className='w-full'>
          <Films />
        </Tabs.Content>
        <Tabs.Content value='Series' className='w-full'>
          <Series />
        </Tabs.Content>
        <Tabs.Content value='Podcast' className='w-full'>
          <Podcast />
        </Tabs.Content>
        <Tabs.Content value='Music' className='w-full'>
          <Music />
        </Tabs.Content>
        <Tabs.Content value='Tech' className='w-full'>
          <Tech />
        </Tabs.Content>
          </Tabs.Root>
        </motion.div>
      </>
    )
  );
}

const tabs = [
  'Films',
  'Series',
  'Podcast',
  'Music',
  'Tech',
  'Subscriptions',
  'Favorites',
  'Watchlist',
  'Watch History',
];
