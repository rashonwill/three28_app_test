'use client';
import Typography from '@/components/atoms/typography';
import { VideoWithOptions } from '@/components/organisms/video-with-options';
import * as Tabs from '@radix-ui/react-tabs';
import Uploads from './uploads';
import PaytoView from './paytoview';
import About from './about';
import Store from './store';
import Scheduler from './scheduler';
import { useRef, useState, useEffect, useCallback } from 'react';
import Head from 'next/head';

export default function Page() {
const [registered, setRegistered] = useState(false);


  const getChannelProfile = useCallback(async () => {
  try {
    let channelid = localStorage.getItem("visitingChannelID");
    const response = await fetch(`https://fari-prod.herokuapp.com/api/users/channel/${channelid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if(data.channel[0].registration_complete === true){
      setRegistered(true)
    }
    
    return data.channel;
  } catch (error) {
    console.log(error)
  }
  }, []);
  
  useEffect(() => {
  getChannelProfile();	
  }, [getChannelProfile]);
  
  return (
    <>
      <Head>
        <title>Fari | Channel</title>
      </Head>
    <Tabs.Root defaultValue='Uploads' className='container pt-[5rem] pb-[2.5rem]'>
      
      <Tabs.List className='flex -translate-y-28 justify-evenly'>
        {registered ? (
         <>
          {data.map((_) => (
          <Tabs.Trigger key={_} value={_} className='aria-selected:underline'>
            <Typography variant='h5'>{_}</Typography>
          </Tabs.Trigger>
        ))}
           
        </>
       ) : (
      <>
        {data2.map((_) => (
          <Tabs.Trigger key={_} value={_} className='aria-selected:underline'>
            <Typography variant='h5'>{_}</Typography>
          </Tabs.Trigger>
        ))}
       
       </>
    )
      }

      </Tabs.List>
      <Tabs.Content value='Uploads'>
     <Uploads />
      </Tabs.Content>
      <Tabs.Content value='Pay to View'>
      <PaytoView />
      </Tabs.Content>
      <Tabs.Content value='About'>
      <Typography variant='h3'>Bio</Typography>
         <About  />
      </Tabs.Content>
            <Tabs.Content value='Shop'>
         <Store  />
      </Tabs.Content>
      <Tabs.Content value='Connect'>
         <Scheduler  />
      </Tabs.Content>
    </Tabs.Root>
         </>
  );
}

const data = ['Uploads', 'Pay to View', 'About', 'Shop', 'Connect'];

const data2 = ['Uploads', 'Pay to View', 'About'];
