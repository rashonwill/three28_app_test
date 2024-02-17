import { viewsConversion } from '@/app/conversions/conversion';
import Typography from '@/components/atoms/typography';
import { VideoWithOptions } from '@/components/organisms/video-with-options';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import _ from 'underscore';

export default function Favorites() {
  const { push } = useRouter();
  const [favorites, setFavorites] = useState<any[]>([]);
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://three28-test-api.onrender.com/api';

  const videoPlay = (e: any, uuid: any, channelid: any) => {
    e.preventDefault();
    localStorage.removeItem('favorites');
    localStorage.setItem('videoID', uuid);
    localStorage.setItem('visitingChannelID', channelid);
  };

  const getMyFavs = useCallback(async () => {
    var userid = localStorage.getItem('userID');
    const myToken = localStorage.getItem('fariToken');
    try {
      const response = await fetch(
        `${FARI_API}/explorer/myfavs/${userid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${myToken}`,
          },
        }
      );
      const data = await response.json();
      if (data.myFavVids.length > 0) {
        localStorage.setItem('favorites', JSON.stringify(data.myFavVids));
        let favs = JSON.parse(localStorage.getItem('favorites'));
        setFavorites(data.myFavVids);
      }
      return data.myFavVids;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getFavs = useCallback(async () => {
    try {
      const storedData = JSON.parse(localStorage.getItem('favorites'));
      if (!storedData) {
        getMyFavs();
      } else if (storedData) {
        setFavorites(storedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [favorites, getMyFavs]);

  useEffect(() => {
    getFavs();
  }, [getFavs]);

  return (
    <>
      <div className='flex flex-row gap-3 flex-wrap [&>*]:max-w-xs pt-16'>
        {favorites && favorites.length > 0 ? (
          favorites.map((uploads) => {
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
                  uuid={uploads.uuid}
                  view={`${viewsConversion(uploads.videoviewcount)}`}
                  poster={uploads.videothumbnail}
                  handle={uploads.channel_handle}
                  favorite
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              </div>
            );
          })
        ) : (
          <Typography variant='h4' className='text-gray-400'>
            {' '}
            No favorites yet.{' '}
          </Typography>
        )}
      </div>
    </>
  );
}
