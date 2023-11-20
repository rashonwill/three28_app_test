'use client';
import * as Tabs from '@radix-ui/react-tabs';
import Uploads from './uploads';
import Typography from '@/components/atoms/typography';
import Analytics from './analytics';
import MessageBoard from './messages';
import Subscription from './subscription';
import Account from './account';
import Store from './store';
import Orders from './orders';
import Scheduler from './scheduler';
import { useRef, useState, useEffect, useCallback } from 'react';
import Head from 'next/head';


export default function Page() {
  const [registered, setRegistered] = useState(false);

  const vendorVerificationCheck = useCallback(async () => {
  let id = localStorage.getItem("vendorID");
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(`https://fari-prod.herokuapp.com/api/users/vendor-verified/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
    if (data.vendor[0].registration_complete === true) {
      setRegistered(true)
    } 
    return data.vendor;
  } catch (error) {
    console.log(error)
  }
}, []) 



  useEffect(() => {
    vendorVerificationCheck();
  }, [vendorVerificationCheck]);
  
  return (
    <>
    
 
      <Head>
        <title>Fari | Profile</title>
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
     )}

      </Tabs.List>
      <Tabs.Content value='Uploads'>
        <Uploads />
      </Tabs.Content>
      <Tabs.Content value='Analytics'>
        <Analytics />
      </Tabs.Content>
      <Tabs.Content value='Messages'>
        <MessageBoard />
      </Tabs.Content>
      <Tabs.Content value='Subscriptions'>
        <Subscription />
      </Tabs.Content>
      <Tabs.Content value='Account'>
        <Account />
      </Tabs.Content>
      <Tabs.Content value='Store'>
        <Store />
      </Tabs.Content>
      <Tabs.Content value='Store Orders'>
        <Orders />
      </Tabs.Content>
      <Tabs.Content value='Scheduler'>
        <Scheduler />
      </Tabs.Content>
    </Tabs.Root>
         </>
  );
}

const data = ['Uploads', 'Analytics', 'Messages', 'Subscriptions', 'Account', 'Store', 'Store Orders', 'Scheduler'];
const data2 = ['Uploads', 'Analytics', 'Messages', 'Subscriptions', 'Account'];
