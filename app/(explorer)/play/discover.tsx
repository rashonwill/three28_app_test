import React from "react";
import axios from "axios";
import _ from "underscore";
import { useState, useEffect, useCallback } from "react";
import Typography from '@/components/atoms/typography';
import Video from '@/components/molecules/video';
import Link from 'next/link';
import { cache } from 'react'

export const revalidate = 300;

export default function Discover() {
   const [recommended, setRecommended] = useState<any[]>([]);
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';

   const videoPlay = (uuid: any, channelid: any) =>{
      localStorage.setItem('videoID', uuid);
      localStorage.setItem('visitingChannelID', channelid);
   }

const getRecommended = cache(async () => {
   try{
  	const response = await axios.get(`${FARI_API}/explorer/recommended`)
    .then(({ data }) => {
        if (data) {
          setRecommended(data.uploads);
        }
    })
      }catch(error){
      console.log(error)
    }
  })

     useEffect(() => {
    getRecommended();
  }, []);


  return (
    <>
       {recommended && recommended.length > 0
        ? recommended.map((uploads) => {
           return(
         <div className='flex [&>*]:basis-1/2 mt-5 shadow-md rounded-2xl p-1 pb-4 gap-2 w-[25rem] h-[8rem]' key={uploads.id} onClick={() => videoPlay(uploads.uuid, uploads.channelid)}>
          <Video search src='' poster={uploads.videothumbnail + '?format=webp'} title={uploads.videotitle} uuid={uploads.uuid} />
          <div>
            <Link href={'/channel'} ><Typography variant='h6' className="text-[1rem]">{_.unescape(uploads.channelname)}</Typography></Link>
            <Typography variant='h5' className="text-[20px] text-ellipsis overflow-hidden">{_.unescape(uploads.videotitle)}</Typography>
          </div>
        </div>
           )
        }) : null}
    </>
  );
}
