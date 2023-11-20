import { viewsConversion } from '@/app/conversions/conversion';
import Typography from '@/components/atoms/typography';
import { VideoWithOptions } from '@/components/organisms/video-with-options';
import { useCallback, useEffect, useState } from 'react';
import _ from 'underscore';

export default function Uploads() {
  const [videos, setVideos] = useState<any[]>([]);

  const videoPlay = (
    e: any,
    uuid: any,
    channelID: any,
    thumbnailkey: any,
    videokey: any
  ) => {
    localStorage.removeItem('uploads');
    localStorage.setItem('videoID', uuid);
    localStorage.setItem('visitingChannelID', channelID);
    localStorage.setItem('thumbnailkey', thumbnailkey);
    localStorage.setItem('videokey', videokey);
  };

  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';


  const channelPost = useCallback(async () => {
    const myToken = localStorage.getItem('fariToken');
    try {
      var channelid = localStorage.getItem('channelID');
      const response = await fetch(
        `${FARI_API}/users/myprofile/post/${channelid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${myToken}`,
          },
        }
      );
      const data = await response.json();
      if (data.channelUploads.length > 0) {
        localStorage.setItem('uploads', JSON.stringify(data.channelUploads));
        let uploaded = JSON.parse(localStorage.getItem('uploads'));
        setVideos(uploaded);
      }
      return data.channelUploads;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getUploads = useCallback(async () => {
    try {
      const storedData = JSON.parse(localStorage.getItem('uploads'));
      if (!storedData) {
        channelPost();
      } else if (storedData) {
        setVideos(storedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [videos, channelPost]);

  useEffect(() => {
    getUploads();
  }, [getUploads]);

  return (
    <>
      <section>
        <div className='flex flex-row gap-4 justify-center flex-wrap [&>*]:max-w-xs pt-16'>
          {videos && videos.length > 0 ? (
            videos.map((uploads) => {
              return (
                <div
                  onClick={(e) =>
                    videoPlay(
                      e,
                      uploads.uuid,
                      uploads.channelid,
                      uploads.thumbnailkey,
                      uploads.videokey
                    )
                  }
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
                    uuid={uploads.uuid}
                    view={`${viewsConversion(uploads.videoviewcount)}`}
                    poster={uploads.videothumbnail}
                    handle={uploads.channel_handle}
                    profile
                  />
                </div>
              );
            })
          ) : (
            <Typography variant='h4' className='text-gray-400'>
              {' '}
              No uploads yet.{' '}
            </Typography>
          )}
        </div>
      </section>
    </>
  );
}
