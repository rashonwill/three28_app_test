import { VideoWithOptions } from '@/components/organisms/video-with-options';
import React from "react";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import _ from "underscore";
import Typography from '@/components/atoms/typography';
import { viewsConversion } from '@/app/conversions/conversion';

export default function Subscriptions() {
const [subscriptions, setSubscriptions] = useState<any[]>([]);
const [isPaid, setIsPaid] = useState(false);
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';
  
const purchasePlay = (uuid: any, channelid: any) =>{
  localStorage.setItem('videoID', uuid)
  localStorage.setItem('visitingChannelID', channelid)
}



const videoPlay = (uuid: any, channelid: any) => {
  localStorage.setItem('videoID', uuid)
  localStorage.setItem('visitingChannelID', channelid)
}



const getMySubUploads = useCallback(async () => {
 const userid = localStorage.getItem("userID");
     const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(
      `${FARI_API}/explorer/subscription-uploads/${userid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    if (data.subscriptionUploads.length > 0) {
      setSubscriptions(data.subscriptionUploads)
    } 
    return data.subscriptionUploads;
  } catch (error) {
    console.log(error)
  }
  }, [])

    useEffect(() => {
    getMySubUploads();
  }, [getMySubUploads]);

  
  return (
    <>
      <div className='flex flex-row gap-3 flex-wrap [&>*]:max-w-xs pt-16'>
     
      {subscriptions && subscriptions.length > 0
        ? subscriptions.map((uploads) => {
         return(
           <>
          {uploads.content_class == 'paid' ? (
        <div key={uploads.id} onClick={() =>  purchasePlay(uploads.uuid, uploads.channelid)} className="w-80 max-w-md">
           <VideoWithOptions
            payable={uploads.rental_price}
            pop
            avatar={uploads.profile_avatar + '?format=webp' ? uploads.profile_avatar + '?format=webp' : 'https://drotje36jteo8.cloudfront.net/noAvi.png'}
            poster={uploads.videothumbnail + '?format=webp'}
            author={_.unescape(uploads.channelname)}
            view={`${viewsConversion(uploads.videoviewcount)}`}
            uuid={uploads.uuid}
            title={_.unescape(uploads.videotitle)}
            handle={uploads.channel_handle} 
            key={uploads.id}
          />

        </div>
           ) : (

        <div onClick={() => videoPlay(uploads.uuid, uploads.channelid)} key={uploads.id} className="w-80 max-w-md">
          <VideoWithOptions
          author={_.unescape(uploads.channelname)}
          pop
          avatar={uploads.profile_avatar ? uploads.profile_avatar : 'https://drotje36jteo8.cloudfront.net/noAvi.png'} 
          title={_.unescape(uploads.videotitle)}
          view={`${viewsConversion(uploads.videoviewcount)}`}
          uuid={uploads.uuid}  
          poster={uploads.videothumbnail}
          handle={uploads.channel_handle}  
          watcher
          
        />

      </div>
           )}
           
           </>



           
         )
          
        }) : <Typography variant='h4' className="text-gray-400"> No subscriptions yet. </Typography>}
        </div>
    </>
  );
}
