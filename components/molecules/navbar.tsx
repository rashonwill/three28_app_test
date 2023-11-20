'use client';
import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import useSearch from '@/lib/store/search-store';
import Avatar from '../atoms/avatar';
import Brand from '../atoms/brand';
import DarkMode from '../atoms/dark-mode';
import Input from '../atoms/input';
import Link from 'next/link';
import useProfileStore from '@/lib/store/profile-store';
import { usePathname } from 'next/navigation';
import Tooltip from '../atoms/tooltip';
import { AlignJustify, Search } from 'lucide-react';
import useSidebarStore from '@/lib/store/sidebar-store';
import Typography from '../atoms/typography';
// import Image from 'next/image';

export default function Navbar() {
  const { setSearching } = useSearch();
  const { currentMobileTab } = useProfileStore();
  const [avatar, setAvatar] = useState('https://drotje36jteo8.cloudfront.net/noAvi.png?format=webp');
  const [searchterm, setSearchTerm] = useState('');
  const [isUser, setIsUser] = useState(false);

  const updateCriteria = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const findMe = (event: any) => {
    if(event.keyCode == 13){
      localStorage.setItem('searchTerm', searchterm);
    }
  };



  const getAvi = useCallback(async () => {
    const myToken = localStorage.getItem('fariToken');
    try {
      const response = await fetch(
        `https://fari-prod.herokuapp.com/api/users/myprofile`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${myToken}`,
          },
        }
      );
      const data = await response.json();
      if (data.profile.length > 0) {
        setIsUser(true);
        setAvatar(data.profile[0].profile_avatar);
      }
      return data.profile;
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAvi();
  }, [getAvi]);

  const path = usePathname();
  if (
    (path.includes('user') && currentMobileTab === 'Home') ||
    (path.includes('channel') && currentMobileTab === 'Home')
  )
    return;

  return (
    <div className='container fixed inset-x-0 top-0 z-50 flex items-center gap-5 mb-12 select-none bg-background'>
{/*       <AlignJustify
        size={35}
        className='absolute lg:hidden left-0 top-6'
        cursor={'pointer'}
        onClick={() => useSidebarStore.getState().setOpen()}
      /> */}
      <Brand explorer />{' '}
      <div className='max-lg:hidden'>
        <Input
          onInput={(e) =>
            (e.target as HTMLInputElement).value
              ? setSearching(true)
              : setSearching(false)
          }
          placeholder='search'
          sm
          value={searchterm}
          onChange={updateCriteria}
          icon={Search}
          onKeyDown={findMe}
        />
      </div>
      <Tooltip title='Switch Theme'>
        <DarkMode aria-label="switch theme" /> <div className='w-4' />
      </Tooltip>
      {isUser ? (
        <Tooltip title='Visit Profile'>
          <div className='rounded-full shadow-md shadow-zinc-500 w-20 h-20'>
            <Link href={'/user'} aria-label="visit my profile">
              <img
                alt='profile avatar'
                className='rounded-full h-full w-full'
                src={avatar ? avatar : 'https://drotje36jteo8.cloudfront.net/noAvi.png?format=webp'}
              />
            </Link>
          </div>
        </Tooltip>
      ) : (
        <div className='w-[10rem] text-center'>
          <Link href={'/login'} aria-label="go to login screen">
            <Typography variant='h4' className='text-[2rem] text-[blue]'>
              Sign In
            </Typography>
          </Link>
        </div>
      )}
    </div>
  );
}
