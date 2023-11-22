'use client';
import Typography from '@/components/atoms/typography';
import * as Tabs from '@radix-ui/react-tabs';
import Browse from './browse';
import PaytoView from './paytoview';
import Home2 from './home';
import Subscriptions from './subscriptions';
import Watchlist from './watchlist';
import * as Separator from '@radix-ui/react-separator';
import Favorites from './favorites';
import History from './history';
import useSearch from '@/lib/store/search-store';
import SearchResult from '@/components/organisms/search-result';
import SearchedCard from '@/components/molecules/searched-card';
import { CircleDollarSign, Home, LucideIcon, Search, User2, Compass } from 'lucide-react';
import Input from '@/components/atoms/input';
import { InputEdit } from '@/components/atoms/input-edit';
import Icon from '@/components/atoms/icon';
import React from "react";
import { useState, useEffect } from "react";
import Profile from '@/app/(profile)/user/page';
import Head from 'next/head';


export default function Page() {
  const { isSearching, setSearching } = useSearch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
      const [searchterm, setSearchTerm] = useState("");

    const updateCriteria = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value)
    }

    const findMe = (event: any) => {
     if(event.keyCode == 13){
      localStorage.setItem('searchTerm', searchterm);
    }
  }

  const logOut = () => {
    localStorage.clear();
    localStorage.setItem('theme', 'light');
    window.location.href = "login";
  } 


  if (isSearching) return <SearchResult />;
  
  
  return (
    <>
    <Head>
        <title>Fari | Browse</title>
    </Head>  
    <section className='lg:container max-lg:mb-20'>
      <Tabs.Root defaultValue='Browse' className='flex max-lg:hidden'>
        <Tabs.List className='flex flex-col items-start gap-6 px-6 w-[215px]'>
          {tabs.map((_: string, idx: number) => (
            <>
              <Tabs.Trigger
                className='w-full px-6 text-left aria-selected:bg-[#969697] aria-selected:text-white rounded-2xl py-0.5'
                value={_}
                key={_}
              >
                <Typography variant='h5'>{_}</Typography>
              </Tabs.Trigger>
              {(idx === 1 || idx === 5) && (
                <Separator.Root className='w-full h-px my-6 bg-black/40 dark:bg-white/40' />
              )}
            </>
          ))}
          <button className='px-6 py-0.5 text-xl sm:text-2xl md:text-[22px]' aria-label="redirect to community"><a href="/community">Community</a></button>
          <button className='px-6 py-0.5 text-xl sm:text-2xl md:text-[22px]' aria-label="email support"><a href="mailto:support@letsfari.com">Support</a></button>
          <button className='px-6 py-0.5 text-xl sm:text-2xl md:text-[22px]' onClick={logOut} aria-label="logout">Logout</button>
        </Tabs.List>
        <Tabs.Content value='Browse' className='w-full'>
          <Browse />
        </Tabs.Content>
        <Tabs.Content value='Pay to View' className='w-full'>
          <PaytoView />
        </Tabs.Content>
        <Tabs.Content value='Subscriptions' className='w-full'>
          <Subscriptions />
        </Tabs.Content>
        <Tabs.Content value='Watchlist' className='w-full'>
          <Watchlist />
        </Tabs.Content>
        <Tabs.Content value='Favorites' className='w-full'>
          <Favorites />
        </Tabs.Content>
        <Tabs.Content value='Watch History' className='w-full'>
          <History />
        </Tabs.Content>
      </Tabs.Root>
      <Tabs.Root defaultValue='Home' className='flex flex-col lg:hidden'>
        <Tabs.List className='flex items-start sm:gap-6 fixed inset-x-0 bottom-0 w-full z-50 justify-evenly px-6 bg-[#D8D8D8] dark:bg-black dark:border-t border-white/10'>
          {tabsMobile.map((_) => (
            <Tabs.Trigger
              className='flex flex-col whitespace-nowrap items-center dark:aria-selected:bg-white/10 pt-2 aria-selected:bg-[#C0BEBE] px-5'
              value={_.title}
              key={_.title}
            >
              <Icon icon={_.icon} />
              <p className='text-xl'>{_.title}</p>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content value='Home' className='w-full px-1'>
          <Browse />
        </Tabs.Content>
        <Tabs.Content value='Discover' className='w-full px-8 flex flex-col gap-3'>
          <Home2 />
        </Tabs.Content>
        
        <Tabs.Content value='Pay to View' className='w-full px-8'>
          <PaytoView />
        </Tabs.Content>
        
        <Tabs.Content value='Search' className='w-full px-8'>
          <Input 
              type="text" sm 
              placeholder='search' 
              icon={Search} 
              value={searchterm} 
              onChange={updateCriteria} 
              onKeyDown={findMe} 
              />
          <section className='lg:container'>
            <SearchResult />
         </section>
        </Tabs.Content>
      </Tabs.Root>
    </section>
        </>
  );
}
const tabs = [
  'Browse',
  'Pay to View',
  'Subscriptions',
  'Favorites',
  'Watchlist',
  'Watch History',
];
const tabsMobile = [
  { title: 'Home', icon: Home },
  { title: 'Discover', icon: Compass },
  { title: 'Pay to View', icon: CircleDollarSign },
  { title: 'Search', icon: Search },
  
];
