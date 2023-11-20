'use client';
import Button from '@/components/atoms/button';
import Typography from '@/components/atoms/typography';
import { MapPin, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import MessageModal from './message-modal';
import React from "react";
import { useState, useEffect, useCallback } from "react";
import _ from 'underscore';
import { viewsConversion } from '@/app/conversions/conversion';

export default function Profile() {
  const path = usePathname();
  const user = path.includes('user');
  const [account, setAccount] = useState<any[]>([]);
  const [isSubbed, setIsSubbed] = useState(false);
  const FARI_API = 'https://fari-prod.herokuapp.com/api';


  async function subscribe() {
  var getChannel = await getChannelProfile();
  var userid = localStorage.getItem("userID");
  var channelid = getChannel[0].channelid;
  var channel = getChannel[0].channelname;
    
  let channelsname = localStorage.getItem('visitingChannel');
  let channelsid = localStorage.getItem("visitingChannelID");
    
  const myToken = localStorage.getItem("fariToken");

  try {
    const subscribedChannel = {
      userid: userid,
      channelID: channelid,
      channelname: channel,
    };
    
    const response = await fetch(`https://fari-prod.herokuapp.com/api/users/subscribe/${channelsid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
      body: JSON.stringify(subscribedChannel),
    });
    const data = await response.json();
    checkSubStatus();
  } catch (error) {
    console.log(error);
  }
}


//UnSubscribe

async function unsubscribe() {
  var getChannel = await getChannelProfile();
  var channelid = getChannel[0].channelid;
  var userid = localStorage.getItem("userID");
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(
      `https://fari-prod.herokuapp.com/api/users/unsubscribe/${userid}/${channelid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}

//Toggle BETWEEN SUB AND UNSUB

async function toSubOrNot() {
  var userid = localStorage.getItem("userID");
  var getChannel = await getChannelProfile();
  var channelid = getChannel[0].channelid;
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(
      `${FARI_API}/users/substatus/${userid}/${channelid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    if (data.subedChannel.length > 0) {
      unsubscribe();
      setIsSubbed(false)
    } else if (data.subedChannel.length === 0) {
      subscribe();
      setIsSubbed(true)
    }
    return data;
  } catch (error) {
    console.log(error)
  }
}

   const getChannelProfile = useCallback(async () => {
  try {
    let channelid = localStorage.getItem("visitingChannelID");
    const response = await fetch(`${FARI_API}/users/channel/${channelid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    localStorage.setItem('sellerID', data.channel[0].vendorid)
    localStorage.setItem('visitingChannelName', data.channel[0].username);
    localStorage.setItem('vendorEmail', data.channel[0].email);
    localStorage.setItem('productStripeAccount', data.channel[0].stripe_acctid); 
    setAccount(data.channel)
    return data.channel;
  } catch (error) {
    console.log(error)
  }
  }, []) 

  const checkSubStatus = useCallback(async () => {
   var userid = localStorage.getItem("userID");
  var getChannel = await getChannelProfile();
  var channelid = getChannel[0].channelid;
  const myToken = localStorage.getItem("fariToken");

  try {
    const response = await fetch(
      `${FARI_API}/users/substatus/${userid}/${channelid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    if (data.subedChannel.length > 0) {
      setIsSubbed(true)
    }
    return data;
  } catch (error) {
    console.log(error)
  }
  }, []) 

  
  



  useEffect(() => {
    getChannelProfile().then(checkSubStatus);
  }, [getChannelProfile, checkSubStatus]);

  
  return (
    <>
      <section
      className={cn(
        'container flex items-center justify-between  -translate-y-11',
        {
          '-translate-y-1/4' : user
        }
      )}
    >
      {account && account.length > 0 ? account.map((creator: any) => { 
      return (
        <>
      <div className='flex items-center gap-10 '>
        <div className="w-[175px] h-[235px] rounded-2xl">
        <img
          src={creator.profile_avatar ? creator.profile_avatar : 'https://drotje36jteo8.cloudfront.net/noAvi.png'}
          alt='user avatar'
          className='-translate-y-1/4 rounded-2xl w-full h-full'
        />
        </div>

        <div>
          <Typography variant='h4'>
            {_.unescape(creator.channelname)}
          </Typography>
          <Typography variant='h6'>{`${viewsConversion(creator.subscriber_count)}`} Subscribers</Typography>
            <Typography variant='h6' className='flex gap-1'>
              <MapPin /> {creator.location ? creator.location : 'Earth'}
            </Typography>
        </div>

      </div>
        </>
        )} ) : null}
      <div className='flex gap-1.5 -translate-y-1/2 max-lg:hidden'>
          <>
            <MessageModal>
              <Button accent>Message</Button>
            </MessageModal>
            {isSubbed ? (<Button className="bg-gradient-to-r from-primary-light to-primary-dark text-[#fdfbf9] h-[2.25rem] text-3xl px-12 rounded-2xl shadow-lg hover:shadow-xl transition-all capitalize" onClick={toSubOrNot}>Unsubscribe</Button>) : (<Button accent onClick={toSubOrNot}>Subscribe</Button>)}
          </>
      </div>
       
      
      
    </section>
    
    </>
    
  );
}
