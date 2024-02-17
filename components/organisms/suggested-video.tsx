import React from "react";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import Typography from '../atoms/typography';
import { VideoWithOptions } from './video-with-options';
import Video from '../molecules/video';
import VideoAuthor from '../molecules/video-author';
import _ from "underscore";
import { viewsConversion } from '@/app/conversions/conversion';
import { cache } from 'react'

export const revalidate = 240

export default function SuggestedVideo() {
const [suggested, setSuggested] = useState<any[]>([]);
const FARI_API = 'https://three28-test-api.onrender.com/api';

const videoPlay = (uuid: any, channelid: any) =>{
  localStorage.setItem('videoID', uuid)
  localStorage.setItem('visitingChannelID', channelid);
}
  

   const getSuggested = cache(async () => {
    try{
  	const response = await axios.get(`${FARI_API}/explorer/suggested`)
    .then(({ data }) => {
        if (data) {
          setSuggested(data.uploads);
        }
    })
      }catch(error){
      console.log(error)
    }
  }) 

  
  useEffect(() => {
    getSuggested();
  }, []);

  return (
    <>
    <section className='h-full basis-4/12'>
    <Typography variant='h4'>Suggested Videos</Typography>
    <br />
       <div className='flex flex-col gap-3 px-4' >
      {suggested && suggested.length > 0 ? suggested.map((uploads) => {
         return (
           <div onClick={() => videoPlay(uploads.uuid, uploads.channelid)} key={uploads.id} className="">
          <VideoWithOptions
          author={_.unescape(uploads.channelname)}
          src={uploads.videothumbnail}
          title={_.unescape(uploads.videotitle)}
          uuid={uploads.uuid}
          handle={uploads.channel_handle}  
          view={`${viewsConversion(uploads.videoviewcount)}`}
          poster={uploads.videothumbnail}
          avatar={uploads.profile_avatar ? uploads.profile_avatar : 'https://drotje36jteo8.cloudfront.net/noAvi.png'}
          watcher
        />
           </div>

         )

     
        }) : null}
     </div>
        
      </section>
    </>

  );
}

