import Video from '../molecules/video';
import VideoAuthor from '../molecules/video-author';

export function VideoWithOptions({
  author,
  src,
  avatar,
  title,
  uuid,
  profile,
  pop,
  view,
  favorite,
  watcher,
  payable,
  poster,
  handle,
  favorites,
  setFavorites,
  watchlist,
  setWatchlist,
}: {
  pop?: boolean;
  src?: string;
  poster: string;
  favorite?: boolean;
  watcher?: boolean;
  profile?: boolean;
  payable?: number;
  title: string;
  uuid: string;
  author: string;
  view: string;
  avatar: string;
  handle: string;
  favorites?: any[];
  setFavorites?: Function;
  watchlist?: any[];
  setWatchlist?: Function;
}) {

  
  return (
    <div className='relative rounded-2xl w-full dark:shadow-[#171717] shadow-lg'>
      <Video
        favorite={favorite!}
        watcher={watcher!}
        profile={profile!}
        payable={payable}
        src={src}
        title={title}
        poster={poster}
        uuid={uuid}
      />
      <VideoAuthor
        src={avatar}
        pop={pop}
        className='absolute origin-top-left scale-75 top-3 left-5'
        name={author}
        view={view}
        handle={handle}
      />
    </div>
  );
}
