import { VideoWithOptions } from '@/components/organisms/video-with-options';
import React from "react";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import _ from "underscore";
import Typography from '@/components/atoms/typography';
import { viewsConversion } from '@/app/conversions/conversion';



export default function History() {
  const [history, setHistory] = useState<any[]>([]);
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';

  
  const videoPlay = (uuid: any, channelid: any) =>{
  localStorage.setItem('videoID', uuid)
  localStorage.setItem('visitingChannelID', channelid)
}  



 const getHistory = useCallback(async () => {
  var userid = localStorage.getItem("userID");
  const myToken = localStorage.getItem("fariToken"); 
  try {
    const response = await fetch(`${FARI_API}/explorer/gethistory/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
    let results = data.history;
    const historyData = [
      ...new Map(results.map((result: any) => [result["video_uuid"], result])).values(),
    ];
    const history = historyData.sort((a: any, b: any) => {
      return +new Date(b.historydt) - +new Date(a.historydt);
    });
    setHistory(history)
    return history;
  } catch (error) {
    console.log(error);
  }
  }, []) 



  useEffect(() => {

    getHistory();
  }, [getHistory]);


  
  return (
    <>
    <div className='flex flex-row gap-3 flex-wrap [&>*]:max-w-xs pt-16'>
      {history && history.length > 0
        ? history.map((uploads) => {
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
          
        }) : <Typography variant='h4' className="text-gray-400"> No watch history yet. </Typography>}

        </div>
    </>
  );
}
