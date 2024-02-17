import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import _ from "underscore";
import Link from 'next/link';
import Avatar from '@/components/atoms/avatar';
import Typography from '@/components/atoms/typography';
import { viewsConversion } from '@/app/conversions/conversion';


export default function Info() {

const [nowplaying, setNowPlaying] = useState<any[]>([]);
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://three28-test-api.onrender.com/api';
	
const channelNav = (channelid: any) =>{
  localStorage.setItem('visitingChannelID', channelid);
}

const playVideo = async () => {
 let paramaters = new URLSearchParams(window.location.search);
    let video_id = paramaters.get('video');
    if (video_id) {
      localStorage.setItem('videoID', video_id);
    }	
    try{
	const id = localStorage.getItem("videoID");
  	const response = await axios.get(`${FARI_API}/explorer/play/${id}`)
    .then(({ data }) => {
        if (data) {
          setNowPlaying(data.video);
        }
    })
      }catch(error){
      console.log(error)
    }

};

useEffect(() => {
   localStorage.removeItem('comments');
   localStorage.removeItem('dislikeID');
   localStorage.removeItem('likeID');
    playVideo();
  }, []);
  
  return (
    <>
  {nowplaying && nowplaying.length > 0 ? nowplaying.map((video) => {
       return(
         <section className='py-12' key={video.id}>
        <div className='flex items-center gap-6' onClick={() => channelNav(video.channelid)}>
        <Link href={'/channel'} ><Avatar src={video.profile_avatar ? video.profile_avatar : 'https://drotje36jteo8.cloudfront.net/noAvi.png'}/></Link>
        <Link href={'/channel'} ><Typography variant='h4'>{_.unescape(video.channelname)}</Typography></Link>
      </div>
      <Typography variant='h4' className='my-2.5 text-[2rem]'>
        {_.unescape(video.videotitle)}
      </Typography>
	<Typography variant='h6' className='my-2.5 text-[1rem]'>
        {`${viewsConversion(video.videoviewcount)}`} Views
      </Typography>	 
      <Typography variant='h5' className="text-[1.5rem]">
        {_.unescape(video.videodescription)}
      </Typography>
    </section>
       )
      
      }) : null}
    
    </>

  );
}
