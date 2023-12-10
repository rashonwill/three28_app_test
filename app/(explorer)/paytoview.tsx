import React from "react";
import axios from "axios";
import _ from "underscore";
import { useState, useEffect, useCallback } from "react";
import { VideoWithOptions } from '@/components/organisms/video-with-options';
import $ from 'jquery';
import { viewsConversion } from '@/app/conversions/conversion';
import { cache } from 'react'

export const revalidate = 300

export default function PaytoView() {

  const [paid, setPaid] = useState<any[]>([]);
  const [videoArr, setVideoArr] = useState({});
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';

  const getPaid = cache(async () => {
    try{
  	const response = await axios.get(`${FARI_API}/explorer/paytoview`)
    .then(({ data }) => {
        if (data) {
          setPaid(data.uploads);
        }
    })
      }catch(error){
      console.log(error)
    }
  })


const purchasePlay = (uuid: any, channelid: any) =>{
  localStorage.setItem('videoID', uuid)
  localStorage.setItem('visitingChannelID', channelid)
}

  
  
  useEffect(() => {
    getPaid();
  }, []);



  
  return (
    <>
    <div className='flex flex-row gap-3 flex-wrap [&>*]:max-w-xs pt-16 max-lg:justify-center items-center'>
      {paid && paid.length > 0 ? paid.map((uploads) => {
         return(
         <div id="card" onClick={() =>  purchasePlay(uploads.uuid, uploads.channelid)} key={uploads.id} className="w-80 max-w-md">  
          <VideoWithOptions
            payable={uploads.rental_price}
            pop
            avatar={uploads.profile_avatar + '?format=webp' ? uploads.profile_avatar + '?format=webp' : 'https://drotje36jteo8.cloudfront.net/noAvi.png'}
            poster={uploads.videothumbnail + '?format=webp'}
            author={_.unescape(uploads.channelname)}
            uuid={uploads.uuid} 
            view={`${viewsConversion(uploads.videoviewcount)}`}
            title={_.unescape(uploads.videotitle)}
            handle={uploads.channel_handle}
            key={uploads.id}
          />
        </div>  
         )
    }): null } 

   </div>
    </>
  );
}
