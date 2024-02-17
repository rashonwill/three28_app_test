import React from "react";
import axios from "axios";
import { viewsConversion } from '@/app/conversions/conversion';
import { useState, useEffect, useCallback } from "react";
import _ from "underscore";
import { VideoWithOptions } from '@/components/organisms/video-with-options';
import { cache } from 'react'

export const revalidate = 300

export default function Home() {
  const [discover, setDiscover] = useState<any[]>([]);
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://three28-test-api.onrender.com/api';

  
  const videoPlay = (uuid: any, channelid: any) =>{
  localStorage.setItem('videoID', uuid)
  localStorage.setItem('visitingChannelID', channelid)
}
  
  
  
 const getDiscover = cache(async () => {
    try{
  	const response = await axios.get(`${FARI_API}/explorer/discover`)
    .then(({ data }) => {
        if (data) {
          setDiscover(data.uploads);
        }
    })
      }catch(error){
      console.log(error)
    }

  })

  
useEffect(() => {
  getDiscover();
  }, []);


  return (
    <>
      
     
      {discover && discover.length > 0
        ? discover.map((uploads) => {
         return(
        <div onClick={() => videoPlay(uploads.uuid, uploads.channelid)} key={uploads.id} className="w-80 max-w-md">
          <VideoWithOptions
          author={_.unescape(uploads.channelname)}
          pop
          uuid={uploads.uuid}
          avatar={uploads.profile_avatar ? uploads.profile_avatar : 'https://drotje36jteo8.cloudfront.net/noAvi.png'}
          title={_.unescape(uploads.videotitle)}
          view={`${viewsConversion(uploads.videoviewcount)}`}
          poster={uploads.videothumbnail}
          handle={uploads.channel_handle}
          watcher  
          
        />

           </div>
         )
          
        }) : null}


    </>
  );
}
