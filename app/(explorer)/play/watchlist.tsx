import React from "react";
import axios from "axios";
import _ from "underscore";
import { useState, useEffect, useCallback} from "react";
import Typography from '@/components/atoms/typography';
import Video from '@/components/molecules/video';
import Link from 'next/link';

export default function Watchlist() {
   const [watchlist, setWatchlist] = useState<any[]>([]);
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://three28-test-api.onrender.com/api';

   const videoPlay = (uuid: any, channelid: any) =>{
      localStorage.setItem('videoID', uuid);
      localStorage.setItem('visitingChannelID', channelid);
}

   const getWatchList = useCallback(async () => {
        var userid = localStorage.getItem("userID");
      const myToken = localStorage.getItem("fariToken");
    
  try {
    const response = await fetch(`${FARI_API}/explorer/watchlist/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
    if (data.myWatchList.length > 0) {
      setWatchlist(data.myWatchList)
    }
    return data.myWatchList;
  } catch (error) {
    console.log(error)
  }
  }, [])
   

     useEffect(() => {
    getWatchList();
  }, [getWatchList]);


  return (
    <>
       {watchlist && watchlist.length > 0
        ? watchlist.map((uploads) => {
           return(
         <div className='flex [&>*]:basis-1/2 mt-5 shadow-md rounded-2xl p-1 pb-4 gap-2 w-[25rem] h-[8rem]' key={uploads.id} onClick={() => videoPlay(uploads.uuid, uploads.channelid)}>
          <Video search src='' poster={uploads.videothumbnail + '?format=webp'} title={uploads.videotitle} uuid={uploads.uuid} />
          <div>
            <Link href={'/channel'} ><Typography variant='h6' className="text-[1rem]">{_.unescape(uploads.channelname)}</Typography></Link>
            <Typography variant='h5' className="text-[20px] text-ellipsis overflow-hidden">{_.unescape(uploads.videotitle)}</Typography>
          </div>
        </div>
           )
        }) : <Typography variant='h5' className="text-gray-400"> No watchlist yet. </Typography>}
    </>
  );
}
