'use client';
import { cn } from '@/lib/utils';
import * as Tabs from '@radix-ui/react-tabs';
import {
  CircleDollarSign,
  GalleryVerticalEnd,
  Home,
  Library,
  Search,
  User2,
  Compass,
  Users,
} from 'lucide-react';
import { HtmlHTMLAttributes, forwardRef, useState } from 'react';
import Input from '../atoms/input';
import SearchResult from './search-result';
import useProfileStore from '@/lib/store/profile-store';
import { VideoWithOptions } from './video-with-options';
import Subscription from '@/app/(profile)/user/subscription';
import Icon from '../atoms/icon';
import PaytoView from '@/app/(explorer)/paytoview';
import Home2 from '@/app/(explorer)/home';
import Profile from '@/app/(profile)/user/page';
import Browse from '@/app/(explorer)/browse';
import Community from '@/app/community/home';

interface MobileNavProps extends HtmlHTMLAttributes<HTMLDivElement> {
  Main: React.ReactNode;
}

const MobileNav = forwardRef<HTMLDivElement, MobileNavProps>(
  ({ className, Main, ...props }, ref) => {
    const { setCurrentMobileTab } = useProfileStore();
    const [searchterm, setSearchTerm] = useState("");

    const updateCriteria = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value)
    }

    const findMe = (event: any) => {
     if(event.keyCode == 13){
      localStorage.setItem('searchTerm', searchterm);
    }
  }

    return (
      <div ref={ref} {...props} className={cn('pb-32', {}, className)}>
        <Tabs.Root
          onValueChange={(v) => setCurrentMobileTab(v)}
          defaultValue='Home'
          className='flex flex-col lg:hidden'
        >
          <Tabs.List className='flex items-start sm:gap-3 fixed inset-x-0 bottom-0 w-full z-50 justify-evenly px-1 bg-[#D8D8D8] dark:bg-black dark:border-t border-white/10'>
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
            {Main}
{/*             <Browse /> */}
          </Tabs.Content>
          <Tabs.Content value='Discover' className='w-full px-8 flex flex-col gap-3 mt-[8rem]'>
           <Home2 />
          </Tabs.Content>
          <Tabs.Content value='Pay to View' className='w-full px-8 flex flex-col gap-3 mt-[4rem]'>
           <PaytoView />
          </Tabs.Content>
          <Tabs.Content value='Search' className='w-full px-8 mt-[7rem]'>
            <Input 
              type="text" sm 
              placeholder='search' 
              icon={Search} 
              value={searchterm} 
              onChange={updateCriteria} 
              onKeyDown={findMe} 
              />
            <SearchResult />
          </Tabs.Content>
          <Tabs.Content value='Community' className='w-full px-8 flex flex-col gap-3 mt-[4rem]'>
           <Community />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    );
  }
);

MobileNav.displayName = 'MobileNav';
export { MobileNav };

const tabsMobile = [
  { title: 'Home', icon: Home },
  { title: 'Discover', icon: Compass },
  { title: 'Pay to View', icon: CircleDollarSign },
  { title: 'Search', icon: Search },
  { title: 'Community', icon: Users },
  
];
