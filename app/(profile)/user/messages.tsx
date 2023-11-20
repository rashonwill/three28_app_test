'use client';
import Avatar from '@/components/atoms/avatar';
import Typography from '@/components/atoms/typography';
import { MessageCard } from '@/components/molecules/message-card';
import { cn } from '@/lib/utils';
import { CheckCheck } from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import _ from "underscore";
import Link from 'next/link';

export default function Messages() {

   const [messages, setMessages] = useState<any[]>([]);
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';	
	
const channelNav = (channelid: any, noteid: any) =>{
  localStorage.removeItem('messages');
  localStorage.setItem('visitingChannelID', channelid)
  localStorage.setItem('noteID', noteid)	
}

const getMessages = useCallback(async () => {
  let id = localStorage.getItem("userID");
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(`${FARI_API}/inbox/unread/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
     if (data.notes.length > 0) {
    localStorage.setItem('messages', JSON.stringify(data.notes));
    let msg = JSON.parse(localStorage.getItem('messages'))
    setMessages(msg)
     }

    return data.notes;
  } catch (error) {
    console.log(error)
  }
  }, []) 

const getChannelMessages = useCallback(async () => {
	
       try {
        const storedData = JSON.parse(localStorage.getItem('messages'));
        if(!storedData) {
         getMessages();
        }else if(storedData){
          setMessages(storedData)
        }
      } catch (error) {
        console.log(error);
      }
  }, [messages, getMessages])	
	




  useEffect(() => {
    getChannelMessages();
  }, [getChannelMessages]); 

  return (
	  <>
      <section className='flex flex-col gap-14 justify-center'>
	{messages && messages.length > 0 ? messages.map((note) => {
         return (
	<div className='pl-7 m-10' key={note.id} onClick={() => channelNav(note.channelid, note.noteid)}>
           <MessageCard message={_.unescape(note.note_message)} name={_.unescape(note.sendername)} user={note.profile_avatar + '?format=webp' ? note.profile_avatar + '?format=webp' : 'https://drotje36jteo8.cloudfront.net/noAvi.png?format=webp'} />
	</div>
             )
        }) : <Typography variant='h4' className="text-gray-400 text-center"> No messages yet. </Typography>}
	     
	</section>

	  </>
 


		     
	 )};

