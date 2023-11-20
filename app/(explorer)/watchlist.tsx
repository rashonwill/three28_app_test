import { VideoWithOptions } from '@/components/organisms/video-with-options';
import React from 'react';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import _ from 'underscore';
import Typography from '@/components/atoms/typography';
import { viewsConversion } from '@/app/conversions/conversion';
import { useRouter } from 'next/navigation';

export default function Watchlist() {
  const { push } = useRouter();
  const [watchlist, setWatchlist] = useState<any[]>([]);
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';
  

  const videoPlay = (e: any, uuid: any, channelid: any) => {
    e.preventDefault();
    localStorage.removeItem('watchlist')
    localStorage.setItem('videoID', uuid);
    localStorage.setItem('visitingChannelID', channelid);
  };


  const getMyWatchList = useCallback(async () => {
    var userid = localStorage.getItem('userID');
    const myToken = localStorage.getItem('fariToken');
    try {
      const response = await fetch(
        `${FARI_API}/explorer/watchlist/${userid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${myToken}`,
          },
        }
      );
      const data = await response.json();
      if (data.myWatchList.length > 0) {
        localStorage.setItem('watchlist', JSON.stringify(data.myWatchList));
        let laters = JSON.parse(localStorage.getItem('watchlist'));
        setWatchlist(laters);
      }
      return data.myWatchList;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getWatchlist = useCallback(async () => {
    try {
      const storedData = JSON.parse(localStorage.getItem('watchlist'));
      if (!storedData) {
        getMyWatchList();
      } else if (storedData) {
        setWatchlist(storedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [watchlist]);

  useEffect(() => {
    getWatchlist();
  }, [getWatchlist, getMyWatchList]);

  return (
    <>
      <div className='flex flex-row gap-3 flex-wrap [&>*]:max-w-xs pt-16'>
        {watchlist && watchlist.length > 0 ? (
          watchlist.map((uploads) => {
            return (
              <div
                onClick={(e) => videoPlay(e, uploads.uuid, uploads.channelid)}
                key={uploads.id}
                className='w-80 max-w-md'
              >
                <VideoWithOptions
                  author={_.unescape(uploads.channelname)}
                  pop
                  avatar={
                    uploads.profile_avatar
                      ? uploads.profile_avatar
                      : 'https://drotje36jteo8.cloudfront.net/noAvi.png'
                  }
                  title={_.unescape(uploads.videotitle)}
                  view={`${viewsConversion(uploads.videoviewcount)}`}
                  poster={uploads.videothumbnail}
                  uuid={uploads.uuid}
                  handle={uploads.channel_handle}
                />
              </div>
            );
          })
        ) : (
          <Typography variant='h4' className='text-gray-400'>
            {' '}
            No watchlist yet.{' '}
          </Typography>
        )}
      </div>
    </>
  );
}
