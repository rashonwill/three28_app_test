'use client';
import { cn } from '@/lib/utils';
import Alert from '@mui/material/Alert';
import * as Popover from '@radix-ui/react-popover';
import { MoreHorizontal, Pencil, Play, Trash2, Check } from 'lucide-react';
import Link from 'next/link';
import { HtmlHTMLAttributes, useCallback, useState, useEffect, useRef } from 'react';
import _ from 'underscore';
import Typography from '../atoms/typography';
import EditModal from './edit-modal';
import Image from 'next/image'
import { ThumbsUp, MessageCircle } from 'lucide-react';
import * as Separator from '@radix-ui/react-separator';
import Avatar from '../atoms/avatar';
import Button from '../atoms/button';

export function PostCard({
  src,
  title,
  handle,
  user,
  avatar,
  originator,
  textPost, 
}: {
  src?: string;
  title?: string;
  handle: string; 
  user: string;
  avatar: string;
  originator?: boolean;	
  textPost?: boolean;
}) {

 const [expand, setExpand] = useState(false);
 const [editMode, setEditMode] = useState(false);
 const [showMore, setShowMore] = useState(false);
 const messageRef = useRef<HTMLParagraphElement>(null);
 // const [textpost, setTextPost] = useState(false);	
	
  useEffect(() => {
    // #note checking the overflow for line-clamp
    if (
      messageRef.current?.clientHeight! <
      messageRef.current?.scrollHeight! - 1
    )
      setShowMore(true);
  }, []);

	
return (
    <>

	    {textPost ? (
	    <>
	    
	    <div className="flex flex-col justify-center mt-1 h-[50rem] w-3/5 shadow-xl dark:bg-[#0D0D0D]">
	<Link href={`/channel?profile=${handle}`} aria-label="visit channel" >
        <div className='flex items-center p-2 '>
          <Avatar src={avatar} className='origin-left scale-75' />
          <Typography variant='h5'>{user}</Typography>
        </div>
	</Link>
      
      <div className="w-full h-full p-2">
	      <div className="">
	      	      <p
            ref={messageRef}
            className={cn('text-2xl', { 'line-clamp-2': !expand })}
          >
            {title}
          </p>
	</div>

	{showMore && (
        <button
          onClick={() => setExpand((p) => !p)}
          className='self-end whitespace-nowrap pb-2'
	  aria-label="view full message"
        >
          View {expand ? 'Less' : 'More'}
        </button>
      )}


        <div className="">
        <Image
          className='w-full h-[31rem]'
          src={src}
          alt='post image'
          />
        </div>
	      
	      <Separator.Root className='w-full h-px my-6 bg-black/40 dark:bg-white/40' />
	      <div className="relative flex transition-all sm:px-5 text-[#545454] ">
		      
		<div className="flex gap-1.5 justify-start">
			
		<div className="h-[3rem] p-2 dark:text-[#fdfbf9] rounded-2xl sm:bg-neutral-200/[.2]">
	      <Typography variant="h6">0 Likes</Typography>
	      </div>
	      <div className="h-[3rem] p-2 dark:text-[#fdfbf9] rounded-2xl sm:bg-neutral-200/[.2]">
	      <Typography variant="h6">0 Comments</Typography>
	      </div>
			
		</div>      

	      

	<div className="flex gap-1.5 justify-end absolute right-0">
      <Button accent className="flex justify-center items-center gap-1.5 rounded-full p-4 dark:bg-[#0D0D0D]">Like <ThumbsUp /></Button>
      <Button accent className="flex justify-center items-center gap-1.5 rounded-full p-4 dark:bg-[#0D0D0D]">Comment <MessageCircle /></Button>
      </div>
		      
	</div>  
	      
      </div>
      
      </div>
       </>

	    ) : (
	    <>
	    	    <div className="flex flex-col justify-center mt-1 h-[50rem] w-3/5 shadow-xl dark:bg-[#0D0D0D]">
	<Link href={`/channel?profile=${handle}`} aria-label="visit channel" >
        <div className='flex items-center p-2 '>
          <Avatar src={avatar} className='origin-left scale-75' />
          <Typography variant='h5'>{user}</Typography>
        </div>
	</Link>
      
      <div className="w-full h-full p-2">
	      <div className="">
	      	      <p
            ref={messageRef}
            className={cn('text-2xl', { 'line-clamp-2': !expand })}
          >
            {title}
          </p>
	</div>

	{showMore && (
        <button
          onClick={() => setExpand((p) => !p)}
          className='self-end whitespace-nowrap pb-2'
	  aria-label="view full message"
        >
          View {expand ? 'Less' : 'More'}
        </button>
      )}

{/* 
        <div className="">
        <Image
          className='w-full h-[31rem]'
          src={src}
          alt='post image'
          />
        </div> */}
	      
	      <Separator.Root className='w-full h-px my-6 bg-black/40 dark:bg-white/40' />
	      <div className="relative flex transition-all sm:px-5 text-[#545454] ">
		      
		<div className="flex gap-1.5 justify-start">
			
		<div className="h-[3rem] p-2 dark:text-[#fdfbf9] rounded-2xl sm:bg-neutral-200/[.2]">
	      <Typography variant="h6">0 Likes</Typography>
	      </div>
	      <div className="h-[3rem] p-2 dark:text-[#fdfbf9] rounded-2xl sm:bg-neutral-200/[.2]">
	      <Typography variant="h6">0 Comments</Typography>
	      </div>
			
		</div>      

	      

	<div className="flex gap-1.5 justify-end absolute right-0">
      <Button accent className="flex justify-center items-center gap-1.5 rounded-full p-4 dark:bg-[#0D0D0D]">Like <ThumbsUp /></Button>
      <Button accent className="flex justify-center items-center gap-1.5 rounded-full p-4 dark:bg-[#0D0D0D]">Comment <MessageCircle /></Button>
      </div>
		      
	</div>  
	      
      </div>
      
      </div>
	    
	    </>
	    )}
        
	        
    
    </>
  );
}
