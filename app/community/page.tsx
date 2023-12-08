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

import Home from './home';
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
          <Home />
        </Tabs.Content>
        <Tabs.Content value='Feed' className='w-full'>
          <Feeds />
        </Tabs.Content>
        <Tabs.Content value='Community' className='w-full'>
          <>
            <div className="space-y-1" role="group"><a className="cursor-pointer rounded-base group flex items-center rounded-base w-full transition duration-200 bg-background-pressed text-content-on-background-pressed focus:outline-none focus-visible:ring ring-inset ring-offset-0 px-3 py-2" aria-current="page" href="/collection/wT8kcOVGVXsr">
            <div class="items-center justify-center w-5 h-5 rounded-base me-2 -ms-1 hover:bg-background-hovered">
              <div role="navigation" id="headlessui-disclosure-button-:r14:" aria-expanded="true" data-headlessui-state="open" aria-controls="headlessui-disclosure-panel-:rp:"></div></div><span className="truncate flex-grow font-medium">Community</span></a>
            <div id="headlessui-disclosure-panel-:rp:" data-headlessui-state="open">
                <div className="space-y-1" role="group"><a class="cursor-pointer rounded-base group flex items-center rounded-base w-full transition duration-200 bg-background text-content-on-background-subdued hover:bg-background-hovered hover:text-content-on-background-hovered focus:outline-none focus-visible:ring ring-inset ring-offset-0 px-3 py-2" href="/news"><div className="me-3 -ms-1">
                  <div className="relative text-content-on-background"><div className="flex items-center justify-center shrink-0 shrink-0 h-[1.25em] w-[1.25em]"><img alt="News" className="text-content-subdued group-hover:text-content-hovered object-scale-down shrink-0 rounded-base-sm shrink-0 h-[1.25em] w-[1.25em]" width="1.25em" height="1.25em" aria-hidden="true" src="https://tribe-s3-production.imgix.net/E7ix4dTZcDvhGgSTWjfb5?fit=max&amp;w=200&amp;auto=compress,format"></div></div></div>
                  <span className="flex-grow truncate">News</span></a><a className="cursor-pointer rounded-base group flex items-center rounded-base w-full transition duration-200 bg-background text-content-on-background-subdued hover:bg-background-hovered hover:text-content-on-background-hovered focus:outline-none focus-visible:ring ring-inset ring-offset-0 px-3 py-2" href="/discussion"><div className="me-3 -ms-1"><div className="relative text-content-on-background">
                    <div className="flex items-center justify-center shrink-0 shrink-0 h-[1.25em] w-[1.25em]"><img alt="Discussion" className="text-content-subdued group-hover:text-content-hovered object-scale-down shrink-0 rounded-base-sm shrink-0 h-[1.25em] w-[1.25em]" width="1.25em" height="1.25em" aria-hidden="true" src="https://tribe-s3-production.imgix.net/wWVKUE303mBMZUHAfc1tM?fit=max&amp;w=200&amp;auto=compress,format"></div></div></div>
                    <span className="flex-grow truncate">Discussion</span></a><a className="cursor-pointer rounded-base group flex items-center rounded-base w-full transition duration-200 bg-background text-content-on-background-subdued hover:bg-background-hovered hover:text-content-on-background-hovered focus:outline-none focus-visible:ring ring-inset ring-offset-0 px-3 py-2" href="/events"><div className="me-3 -ms-1"><div className="relative text-content-on-background">
                      <div className="flex items-center justify-center shrink-0 shrink-0 h-[1.25em] w-[1.25em]"><img alt="Events" className="text-content-subdued group-hover:text-content-hovered object-scale-down shrink-0 rounded-base-sm shrink-0 h-[1.25em] w-[1.25em]" width="1.25em" height="1.25em" aria-hidden="true" src="https://tribe-s3-production.imgix.net/l8KH9f5PLWodChxJFXANN?fit=max&amp;w=200&amp;auto=compress,format"></div></div></div><span className="flex-grow truncate">Events</span></a></div></div></div>
        </Tabs.Content>
          </>
          
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
