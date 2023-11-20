import React from "react";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import Typography from '../atoms/typography';
import Video from '../molecules/video';
import VideoAuthor from '../molecules/video-author';
import _ from "underscore";
import { viewsConversion } from '@/app/conversions/conversion';
import { cache } from 'react'

export const revalidate = 240


export default function Spotlight() {
const [promoted, setPromoted] = useState<any[]>([]);

const videoPlay = (uuid: any, channelid : any) =>{
  localStorage.setItem('videoID', uuid)
  localStorage.setItem('visitingChannelID', channelid)
}
  

   const getPromoted = cache(async () => {
      try{
  	const response = await axios.get(`https://fari-prod.herokuapp.com/api/explorer/spotlight`)
    .then(({ data }) => {
        if (data) {
          setPromoted(data.uploads);
        }
    })
      }catch(error){
      console.log(error)
    }
  }) 

  
  useEffect(() => {
    getPromoted();
  }, []);
  
  return (
    <>
      <section className='h-full basis-2/3'>
      <Typography variant='h4'>Video Spotlight</Typography>
      <br />
      {promoted && promoted.length > 0 ? promoted.map((upload) => { 
      
    return(
      <>
        <div className='relative rounded-2xl dark:shadow-[#171717] shadow-lg' key={upload.id} onClick={() => videoPlay(upload.uuid, upload.channelid)}>
        <Video src={upload.videofile} poster={upload.videothumbnail} spotlight title={upload.videotitle} uuid={upload.uuid} />
        <VideoAuthor
          src={upload.profile_avatar ? upload.profile_avatar : 'https://drotje36jteo8.cloudfront.net/noAvi.png'}
          className='absolute origin-bottom-left max-lg:scale-75 max-lg:bottom-3 max-lg:left-5 bottom-5 left-7'
          name={_.unescape(upload.channelname)}
          view={`${viewsConversion(upload.videoviewcount)}`}
          handle={upload.channel_handle}
        />
      </div>
      </>

          
        )
    }) : null}

    </section>
    </>

  );
}
