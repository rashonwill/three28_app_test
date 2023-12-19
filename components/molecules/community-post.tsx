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
import Avatar from '../atoms/avatar';


export default function Post({
  src,
  title,
  handle,
  user,
  avatar,
}: {
  src?: string;
  title?: string;
  handle: string; 
  user: string;
  avatar: string;
}) {
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
