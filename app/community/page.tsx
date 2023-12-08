'use client';
import React from "react";
import { useState } from "react";
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import Typography from '@/components/atoms/typography';
import { CircleDollarSign, Home, LucideIcon, Search, User2, Compass, Users } from 'lucide-react';
import Link from 'next/link';
import _ from "underscore";
import Head from 'next/head'
import * as Tabs from '@radix-ui/react-tabs';
import * as Separator from '@radix-ui/react-separator';
import { InputEdit } from '@/components/atoms/input-edit';
import Icon from '@/components/atoms/icon';

import useSearch from '@/lib/store/search-store';
import SearchResult from '@/components/organisms/search-result';
import SearchedCard from '@/components/molecules/searched-card';
import Browse from '@/app/(explorer)/browse';
import PaytoView from '@/app/(explorer)/paytoview';
import Home2 from '@/app/(explorer)/home';

import Home3 from './home';
import Feeds from './feed';

export default function Community() {
  const { isSearching, setSearching } = useSearch();
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
        <title>Three28| Community</title>
    </Head> 
       <section className='lg:container max-lg:mb-20'>
      <Tabs.Root defaultValue='Home' className='flex max-lg:hidden'>
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
        </Tabs.List>
        <Tabs.Content value='Home' className='w-full'>
          <Home3 />
        </Tabs.Content>
        <Tabs.Content value='Feed' className='w-full'>
          <Feeds />
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
        <Tabs.Content value='Community' className='w-full px-1'>
          <Typography variant='h2' className='max-lg:text-center text-[#323232] max-lg:mt-44 mt-4rem'>
        Welcome to the Coummunity! We're under construction!!
      </Typography>
        </Tabs.Content>
      </Tabs.Root>
    </section>
        </>

  )
}

const tabs = [
  'Home',
  'Feed',
];
const tabsMobile = [
  { title: 'Home', icon: Home },
  { title: 'Discover', icon: Compass },
  { title: 'Pay to View', icon: CircleDollarSign },
  { title: 'Search', icon: Search },
  { title: 'Community', icon: Users },
  
];
