import Avatar from '@/components/atoms/avatar';
import Button from '@/components/atoms/button';
import Typography from '@/components/atoms/typography';
import { useEffect, useRef, useState, useCallback } from 'react';
import _ from "underscore";
import Link from 'next/link';
import { viewsConversion } from '@/app/conversions/conversion';

export default function Subscription() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';

  
  const channelNav = (channelid: any) =>{
  localStorage.setItem('visitingChannelID', channelid);
}


 const getUserChannelSubscriptions = useCallback(async () => {
   var userid = localStorage.getItem("userID");
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(`${FARI_API}/explorer/mysubs/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
    setSubscriptions(data.mysubscriptions)
    return data.mysubscriptions;
  } catch (error) {
    console.log(error);
  }
  }, []) 

    

async function getChannelProfile() {
  try {
    let channelid = localStorage.getItem("visitingChannelID");
    const response = await fetch(`${FARI_API}/users/channel/${channelid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.channel;
  } catch (error) {
    console.log(error)
  }
}

  
async function unsubscribe() {
  const myToken = localStorage.getItem("fariToken");
  var channelid = localStorage.getItem('visitingChannelID');
  var userid = localStorage.getItem("userID");
  try {
    const response = await fetch(
      `${FARI_API}/users/unsubscribe/${userid}/${channelid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    getUserChannelSubscriptions();
  } catch (error) {
    console.log(error);
  }
}

    useEffect(() => {
    getUserChannelSubscriptions();
  }, [getUserChannelSubscriptions]); 


    
  return (
    <>
      <section className="flex flex-row justify-center items-center flex-wrap gap-6">
      {subscriptions && subscriptions.length > 0 ? subscriptions.map((subs) => {
      return (
        <div className='flex flex-col justify-center max-w-xs py-5 gap-4 rounded-2xl shadow-lg shadow-gray-300 dark:shadow-[#171717] shadow-lg items-center bg-[#F6F6F6] dark:bg-transparent' key={subs.id} onClick={() => channelNav(subs.channelid)} >
        <Link href={'/channel'} ><Avatar src={subs.profile_avatar + '?format=webp' ? subs.profile_avatar + '?format=webp' : 'https://drotje36jteo8.cloudfront.net/noAvi.png?format=webp'} /></Link>
        <Link href={'/channel'} ><Typography variant='h4'>{_.unescape(subs.channelname)}</Typography></Link>
        <Typography variant='h4'>{`${viewsConversion(subs.subscriber_count)}`} Subscribers</Typography>
        <Button accent onClick={unsubscribe}>Unsubscribe</Button>
      </div>
      )
      }): <Typography variant='h4' className="text-gray-400 text-center"> No subscriptions yet. </Typography> }
    </section>

    </>
  );
}
