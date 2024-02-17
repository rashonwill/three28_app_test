'use client';
import Input from '@/components/atoms/input';
import Typography from '@/components/atoms/typography';
import { MobileNav } from '@/components/organisms/mobile-nav';
import SearchResult from '@/components/organisms/search-result';
import useSearch from '@/lib/store/search-store';
import * as Tabs from '@radix-ui/react-tabs';
import axios from 'axios';
import { EffectCallback, useEffect, useRef, useState, useCallback } from 'react';
import Comments from './comments';
import Controls from './controls';
import Info from './info';
import Sidebar from './sidebar';
import Head from 'next/head';


export default function MainPage() {
  const { isSearching, setSearching } = useSearch();
  const [nowplaying, setNowPlaying] = useState('');
  const [videoStream, setVideoStream] = useState('');
  const [videoPic, setVideoPic] = useState('');
  const videoRef = useRef(null);
  const isInitialMount = useRef(true);
  // const FARI_API = 'https://fariapi.com/api';
  const FARI_API = 'https://three28-test-api.onrender.com/api';

  const playVideo = useCallback(async () => {
    let paramaters = new URLSearchParams(window.location.search);
    let video_id = paramaters.get('video');
    if (video_id) {
      localStorage.setItem('videoID', video_id);
    }
    try {
      const id = localStorage.getItem('videoID');
      const response = await axios
        .get(`${FARI_API}/explorer/play/${id}`)
        .then(({ data }) => {
          if (data) {
            setNowPlaying(data.video[0].id);
            setVideoStream(data.video[0].videofile);
            setVideoPic(data.video[0].videothumbnail);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateViews = useCallback(async () => {
    let id = localStorage.getItem('videoID');
    const myToken = localStorage.getItem('fariToken');
    try {
      const response = await fetch(
        `${FARI_API}/explorer/update/viewcount/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }, []);

    async function playFeature() {
    try {
      const id = localStorage.getItem('videoID');
      const response = await fetch(
        `${FARI_API}/explorer/play/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      if (data.video.length === 0) {
        window.location.href = '/';
      }
      return data.video;
    } catch (error) {
      console.log(error);
    }
  }

  const watchHistory = useCallback(async () => {
    var getFeature = await playFeature();
    if (
      getFeature[0].content_class === 'free' ||
      getFeature[0].content_class === null ||
      getFeature[0].content_category === 'vlog' ||
      getFeature[0].content_category === 'other'
    ) {
      var userid = localStorage.getItem('userID');
      var channelname = getFeature[0].channelname;
      var video = getFeature[0].videofile;
      var posFile = getFeature[0].videothumbnail;
      var vidTitle = getFeature[0].videotitle;
      var channelID = getFeature[0].channelid;
      var views = getFeature[0].videoviewcount;
      var uniqueID = getFeature[0].uuid;

      const historyVideo = {
        userid: userid,
        channelname: channelname,
        videofile: video,
        videothumbnail: posFile,
        videotitle: vidTitle,
        channelid: channelID,
        videoviewcount: views,
        video_uuid: uniqueID,
      };
      const myToken = localStorage.getItem('fariToken');
      try {
        const response = await fetch(
          `${FARI_API}/explorer/add/watchhistory`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${myToken}`,
            },
            body: JSON.stringify(historyVideo),
          }
        );
        const data = await response.json();
        return data.upload;
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  async function userWatchedFlag() {
  let uuid = localStorage.getItem("videoID");
  let userid = localStorage.getItem('userID');
  const myToken = localStorage.getItem('fariToken');
  try {
    const response = await fetch(`${FARI_API}/explorer/userwatched/${uuid}/${userid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
  }
}


  useEffect(() => {
    if (isInitialMount.current) {
    localStorage.removeItem('comments');   
    playVideo();
    setTimeout(function() {
      updateViews();
      watchHistory();
      userWatchedFlag();
    }, 20000);
      isInitialMount.current = false;
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playVideo, watchHistory, updateViews]);



 

  if (isSearching) return <SearchResult />;

  return (
    <>
    <Head>
      <title>Fari | Play</title>
    </Head>  
    <section className='flex gap-4 max-sm:px-2 sm:container'>
      <div className='grow'>
        <div className='relative'>
          <video
            key={nowplaying}
            controls
            controlsList='nodownload'
            preload='auto'
            autoPlay
            playsInline
            src={videoStream}
            poster={videoPic}
            ref={videoRef}
            className='rounded-2xl object-fill w-[180rem] min-h-[21rem] max-h-[37rem] outline-none'
          ></video>
{/*           <div
            onClickCapture={(e) => {
              videoRef.current.muted = false;
              (e.target as Element).classList.add('hidden');
            }}
            className='absolute inset-0 bg-black/5 p-4'
          >
            <p className='bg-gray-300/20 text-[#bb9847] rounded-lg w-fit px-4 py-2'>
              Click to Unmute
            </p>
          </div> */}
        </div>

        <Tabs.Root defaultValue='Info'>
          <div className='flex flex-wrap justify-between my-2'>
            <Tabs.List className='space-x-10'>
              {['Info', 'Comments'].map((_) => (
                <Tabs.Trigger
                  className='aria-selected:underline'
                  value={_}
                  key={_}
                >
                  <Typography variant='h4'>{_}</Typography>
                </Tabs.Trigger>
              ))}
            </Tabs.List>{' '}
            <Controls />
          </div>
          <Tabs.Content value='Info'>
            <Info />
          </Tabs.Content>
          <Tabs.Content value='Comments'>
            <Comments />
          </Tabs.Content>

          <Tabs.Content value='Search' className='w-full px-8'>
            <Input type='text' sm placeholder='search' />
            <section className='lg:container'>
              <Typography
                variant='h4'
                className='max-w-6xl mx-auto max-lg:mt-10'
              >
                Search Results
              </Typography>
              <br />
              <SearchResult />
            </section>
          </Tabs.Content>
        </Tabs.Root>
      </div>
      <Sidebar />
    </section>
    </>
  );
}

// export default function Page() { 
//   return (
//     <>
//       <span className='max-lg:hidden'>
//         <MainPage />
//       </span>
//       <MobileNav Main={<MainPage />} />
//     </>
//   );
// }
