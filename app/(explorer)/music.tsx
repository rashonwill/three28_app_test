import React from "react";
import axios from "axios";
import _ from "underscore";
import { useState, useEffect, useCallback } from "react";
import { VideoWithOptions } from '@/components/organisms/video-with-options';
import { viewsConversion } from '@/app/conversions/conversion';
import { cache } from 'react'

export const revalidate = 300;

export default function Music() {
  const [music, setMusic] = useState<any[]>([]);
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://three28-test-api.onrender.com/api';

  
  const videoPlay = (uuid: any, channelid: any) =>{
  localStorage.setItem('videoID', uuid)
  localStorage.setItem('visitingChannelID', channelid)
}
  


const getMusic = cache(async () => {
    try{
  	const response = await axios.get(`${FARI_API}/explorer/search/music`)
    .then(({ data }) => {
        if (data) {
          setMusic(data.videos);
        }
    })
      }catch(error){
      console.log(error)
    }
  })
  
  useEffect(() => {
    getMusic();
  }, []);

  
  return (
    <>

    {music && music.length > 0
        ? music.map((uploads) => {
         return(
        <div onClick={() => videoPlay(uploads.uuid, uploads.channelid)} key={uploads.id} className="w-80 max-w-md">
          <VideoWithOptions
          author={_.unescape(uploads.channelname)}
          pop
          avatar={uploads.profile_avatar ? uploads.profile_avatar : 'https://drotje36jteo8.cloudfront.net/noAvi.png'}
          title={_.unescape(uploads.videotitle)}
          uuid={uploads.uuid}  
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
