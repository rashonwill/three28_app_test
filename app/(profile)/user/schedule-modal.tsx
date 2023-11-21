 'use client';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Typography from '@/components/atoms/typography';
import Button from '@/components/atoms/button';
import { useRef, useState, useEffect, useCallback } from 'react';
import _ from 'underscore';
import axios from "axios";
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import $ from 'jquery';
import Input from '@/components/atoms/input';
import { format, parseISO } from 'date-fns'	


export default function ScheduleModal({ children, meetings, setMeetings, }: { children: React.ReactNode; meetings: any[]; setMeetings: Function; }) {
  const appointmentUpload = useRef(null);
    // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';
  const myToken = localStorage.getItem("fariToken");
  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState('');
 

const updateDateTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateTime(event.target.value)
  }
  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
	
async function bookMeeting(){
	  
      try {
	let selectedDate = new Date(dateTime)
	let set_date = selectedDate.toLocaleDateString();
	let set_time = selectedDate.toLocaleTimeString();
        const meetingData = {
          date: set_date,
          time: set_time,
          date_time: selectedDate,
          name: name,
          channelid: localStorage.getItem('channelID'),
	  requestorid: localStorage.getItem('userID'), 	
	  request_accepted: true,	
        };
	      
      const response = await fetch(
        `${FARI_API}/users/new-meeting`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
	    Authorization: `Bearer ${myToken}`,
          },
          body: JSON.stringify(meetingData),
        }
      );
      const data = await response.json();
	      getMeetings();
	return data.meeting
    } catch (error) {
     console.log(error)
    }	  
  }

async function getMeetings(){
let channelid = localStorage.getItem('channelID')
	  
try {
      const response = await fetch(
        `${FARI_API}/users/my-meetings/${channelid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
	    Authorization: `Bearer ${myToken}`,
          },
        }
      );
      const data = await response.json();
	setMeetings(data.meetings)
	return data.meetings
    } catch (error) {
     console.log(error)
    }	  
  }


// useEffect(() => {
//     getWatchList();
//   }, [getWatchList]);


  
  return (
	  <>
  <form ref={appointmentUpload} id="appointmentUpload" encType="multipart/form-data" className="p-4">
     <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 backdrop-blur' />
        <Dialog.Content className='fixed z-50 max-w-5xl m-auto overflow-hidden shadow-xl inset-10 h-max bg-background rounded-xl'>
          <ScrollArea.Root>
            <ScrollArea.Viewport className='h-full py-10 '>
             
                <div className="left-pane flex flex-col">
                 <div className="flex flex-wrap justify-center">
		    <input type="text" placeholder="name" name="appointmentType" className="m-4 outline-none shadow-none bg-neutral-200/[.3] w-[28rem] dark:bg-[#171717] shadow-none rounded-2xl p-6 text-2xl " value={name} onChange={updateName} />
                    <input type="datetime-local" placeholder="date-time" name="appointmentTime" className="m-4 outline-none shadow-none bg-neutral-200/[.3] w-[28rem] dark:bg-[#171717] shadow-none rounded-2xl p-6 text-2xl " value={dateTime} onChange={updateDateTime}  />
	        </div>	 
                </div>

              <div className='flex flex-wrap justify-end gap-10 px-4 mt-24'>
                  <Button accent className="" onClick={bookMeeting}>
                    Book It
                  </Button>
                <Dialog.Close asChild>
                  <Button accent className="">
                   Close
                  </Button>
                </Dialog.Close>
              </div>
		        

                   
           </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation='vertical' />
          </ScrollArea.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
      </form>
	  
	  
	  
	  </>
    
  );
}


