import { VideoWithOptions } from '@/components/organisms/video-with-options';
import React from "react";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import _ from "underscore";
import Typography from '@/components/atoms/typography';
import { viewsConversion } from '@/app/conversions/conversion';


export default function PaytoView() {
  const [videos, setVideos] = useState<any[]>([]);   
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://three28-test-api.onrender.com/api';


  
const purchasePlay = (uuid: any, channelid: any) =>{
  localStorage.setItem('videoID', uuid)
  localStorage.setItem('visitingChannelID', channelid)
}

  const channelPost = useCallback(async () => {
  try {
    let channelid = localStorage.getItem("visitingChannelID");
    const response = await fetch(
      `${FARI_API}/users/paid/profile/post/${channelid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.channelUploads.length > 0) {
      setVideos(data.channelUploads)
    } 
    return data.channelUploads;
  } catch (error) {
    console.log(error)
  }
  }, []) 

    async function getChannelID(){
  let paramaters = new URLSearchParams(window.location.search);
  let channel = paramaters.get("profile");
  localStorage.setItem("handle", channel);
  let channelHandle = localStorage.getItem('handle')
  
    try {
    const response = await fetch(`${FARI_API}/users/channel/handle/${channelHandle}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
      localStorage.setItem('visitingChannelID', data.channel[0].channelid)
    return data.channel;
  } catch (error) {
    console.log(error)
  }
}

  useEffect(() => {
    getChannelID().then(channelPost);
  }, []);


return (
    <>
    <section>
      <div className='flex flex-row gap-4 justify-center flex-wrap [&>*]:max-w-xs pt-16'>
     {videos && videos.length > 0
        ? videos.map((uploads) => {
         return(
        <div key={uploads.id} onClick={() =>  purchasePlay(uploads.uuid, uploads.channelid)} className="w-80 max-w-md">
           <VideoWithOptions
            payable={uploads.rental_price}
            pop
            avatar={uploads.profile_avatar ? uploads.profile_avatar : 'https://drotje36jteo8.cloudfront.net/noAvi.png'}
            poster={uploads.videothumbnail + '?format=webp'}
            author={_.unescape(uploads.channelname)}
            view={`${viewsConversion(uploads.videoviewcount)}`}
            title={_.unescape(uploads.videotitle)}
            handle={uploads.channel_handle} 
            key={uploads.id}
            uuid={uploads.uuid}
          />

        </div>

           
         )
          
        }) : <Typography variant='h4' className="text-gray-400"> No uploads yet. </Typography>} 
        </div>
    </section>
    </>
    
    
  );



  
}
