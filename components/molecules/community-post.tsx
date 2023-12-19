import { cn } from '@/lib/utils';
import Alert from '@mui/material/Alert';
import * as Popover from '@radix-ui/react-popover';
import { MoreHorizontal, Pencil, Play, Trash2, Check } from 'lucide-react';
import Link from 'next/link';
import { HtmlHTMLAttributes, useCallback, useState } from 'react';
import _ from 'underscore';
import Typography from '../atoms/typography';
import EditModal from './edit-modal';
import Image from 'next/image'
import { ThumbsUp, MessageCircle } from 'lucide-react';
import * as Separator from '@radix-ui/react-separator';

interface CompType {
  src: string;
  poster: string;
  spotlight?: boolean;
  search?: boolean;
  title: string;
  uuid: string;
  favorite?: boolean;
  watcher?: boolean;
  profile?: boolean;
  payable?: number;
  favorites?: any[];
  setFavorites?: Function;
  watchlist?: any[];
  setWatchlist?: Function;
}

export default function Post({
  className,
  title,
  uuid,
  spotlight,
  payable,
  search,
  profile,
  favorite,
  watcher,
  src,
  poster,
  favorites,
  setFavorites,
  watchlist,
  setWatchlist,
  ...props
}: HtmlHTMLAttributes<HTMLDivElement> & CompType) {
  const [video, setVideo] = useState<any[]>([]);
  const [videoArr, setVideoArr] = useState({});
  const [listed, setListed] = useState(false);
  const myToken = localStorage.getItem('fariToken');

  
  return (
    <>
    <div className="flex flex-col justify-center mt-1 w-9/12 dark:bg-[#0D0D0D]">
	<Link href={`/channel?profile=${handle}`} aria-label="visit channel" >
        <div className='flex items-center '>
          <Avatar src={avatar} className='origin-left scale-50' />
          <Typography variant='h5'>{user}</Typography>
        </div>
	</Link>
      
      <div className="w-full h-full">
        <Typography variant="h4">{title}</Typography>
        <div className="">
        <Image
          className='w-full h-9/12'
          src={src}
          alt='post image'
          />
        </div>
      
      </div>
     <Separator.Root className='w-full h-px my-6 bg-black/40 dark:bg-white/40' />
      <div className="flex gap-1.5 p-4">
      <Button accent className="flex gap-1.5 rounded-full p-4 dark:bg-[#0D0D0D]">Like <ThumbsUp /></Button>
      <Button accent className="flex gap-1.5 rounded-full p-4 dark:bg-[#0D0D0D]">Comment <MessageCircle /></Button>
      </div>
      </div>
    </>
  );
}
