'use client';
import { cn } from '@/lib/utils';
import { CheckCheck, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import Avatar from '../atoms/avatar';
import * as Popover from '@radix-ui/react-popover';
import Typography from '../atoms/typography';
import Button from '../atoms/button';
import Link from 'next/link';
import _ from 'underscore';
import axios from "axios";
import Tooltip from '../atoms/tooltip';

export function MessageCard({
  className,
  user,
  name, 
  message,
  // _,
  comment,
  author,
}: {
    className?: string;
    user: string;
    name: string;
    message: string;
    comment?: boolean;
    author?: boolean;
  
}) {
  const [expand, setExpand] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const [remark, setRemark] = useState('')	
  const myToken = localStorage.getItem("fariToken");

const newRemark = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRemark(event.target.value)
  }	
		
  
  async function editComment(){
    let id = localStorage.getItem('commentID');
    const updatecomRemark = _.escape(remark);
      try {
          const updateRemark = {
            user_comment: updatecomRemark,
          };

          const response = await fetch(
            `https://fari-prod.herokuapp.com/api/explorer/comment/edit/${id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${myToken}`,
              },
              body: JSON.stringify(updateRemark),
            }
          );
          const data = await response.json();
	      getComments();
        } catch (error) {
		console.log(error)
        }
  }

const getComments = useCallback(async () => {
  const id = localStorage.getItem("videoID");
    try{
  	const response = await axios.get(`https://fari-prod.herokuapp.com/api/explorer/comments/${id}`)
    .then(({ data }) => {
	localStorage.setItem('comments', JSON.stringify(data.comments));
	
    })
      }catch(error){
      console.log(error)
    }
  }, [])

  
  async function deleteComment(){
        let id = localStorage.getItem('commentID');
      try {
        const response = await fetch(
          `https://fari-prod.herokuapp.com/api/explorer/comment/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${myToken}`,
            },
          }
        );
	getComments();
      } catch (error) {
	console.log(error)
      }
  }

function updateComments(){
  let newData;
      let commentID = localStorage.getItem('commentID')
      let allComments = JSON.parse(localStorage.getItem('comments'))
      let removingComment = allComments.findIndex(comment => comment.commentid === commentID)

       allComments.splice(removingComment, 1);
       newData = allComments
       localStorage.setItem('comments', JSON.stringify(newData))	
}	

async function markAsRead() {
  let id = localStorage.getItem("noteID");
  try {
    const response = await fetch(`https://fari-prod.herokuapp.com/api/inbox/markasread/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
	  getMessages();
    return data.messages;
  } catch (error) {
    console.log(error)
  }
}

const getMessages = useCallback(async () => {
  let id = localStorage.getItem("userID");
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(`https://fari-prod.herokuapp.com/api/inbox/unread/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
    localStorage.setItem('messages', JSON.stringify(data.notes));
    return data.notes;
  } catch (error) {
    console.log(error)
  }
  }, []) 
  
  useEffect(() => {
    // #note checking the overflow for line-clamp
    if (
      messageRef.current?.clientHeight! <
      messageRef.current?.scrollHeight! - 1
    )
      setShowMore(true);
  }, []);

  return (
    <div className='bg-[#F6F6F6] bg-transparent text-black dark:text-white dark:pr-3 relative rounded-2xl shadow-lg py-2 flex'>
      <Link href={'/channel'} aria-label="visit channel" >
      <Avatar
        className='min-w-[60px] w-[60px] -translate-x-6 -translate-y-8 shadow-md h-max'
        src={user}
      /></Link>{' '}
      <div className='grow'>
        <Link href={'/channel'} aria-label="visit channel" ><Typography variant={comment ? 'h4' : 'h6'}>{name}</Typography></Link>
        {editMode ? (
          <div className='flex gap-2'>
            <input
              type='text'
              className='w-[95%] rounded-xl shadow-sm px-2 py-1 text-2xl'
              defaultValue={message}
	      onChange={newRemark}	    
            />
            <Button onClick={() => {setEditMode(false); editComment()}} accent aria-label="save comment edit changes">
              save
            </Button>
            <Button onClick={() => setEditMode(false)} accent aria-label="cancel comment edit changes">
              cancel
            </Button>
          </div>
        ) : (
          <p
            ref={messageRef}
            className={cn('text-2xl', { 'line-clamp-2': !expand })}
          >
            {message}
          </p>
        )}
      </div>
      {showMore && (
        <button
          onClick={() => setExpand((p) => !p)}
          className='self-end ml-4 whitespace-nowrap'
	  aria-label="view full message"
        >
          View {expand ? 'Less' : 'More'}
        </button>
      )}{' '}
      {author ? (
      <>
      
      {comment && (
        <Popover.Root>
          <Popover.Trigger className={cn('absolute right-4 top-1', {})}>
            <MoreHorizontal className='text-foreground' size={32} />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className='px-8 py-2 cursor-pointer text-background rounded-3xl dark:text-white bg-black/70 '>
              <Typography
                onClick={() => setEditMode(true)}
                variant='h6'
                className='flex gap-2'
		      
              >
                <Pencil />
                Edit
              </Typography>
              <Typography variant='h6' className='flex gap-2' onClick={deleteComment}>
                <Trash2 /> Delete
              </Typography>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      )}
      </>
      
      ) : null }
      
      {!comment && <Tooltip title='Mark as Read'><CheckCheck className='min-w-[30px] w-[30px] mr-2 cursor-pointer' onClick={markAsRead}/></Tooltip> }
    </div>
  );
}
