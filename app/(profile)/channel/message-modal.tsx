import Button from '@/components/atoms/button';
import { InputEdit } from '@/components/atoms/input-edit';
import * as Dialog from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import _ from 'underscore';
import { useState, useEffect } from "react";
import axios from "axios";
import './message.scss';

export default function MessageModal({
  children,
}: {
  children: React.ReactNode;
}) {

  const [newmessage, setNewMessage] = useState('');
  const [progress, setProgress] = useState({started: false, rate: 0});
  const [message, setMessage] = useState('');
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';

    const updateMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value)
  }

  async function getChannelProfile() {
  try {
    let channelid = localStorage.getItem("visitingChannelID");
    const response = await fetch(`${FARI_API}/users/channel/${channelid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.channel;
  } catch (error) {
    console.log(error)
  }
}

  async function sendEmailNotification(){
  let email = localStorage.getItem('vendorEmail');
  try {
    const response = await fetch(`${FARI_API}/mailer/newmessage/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }catch (error) {
    console.error(error)
  }
}



  async function newMessage() {
  var channelInfo = await getChannelProfile();
  var senderID = localStorage.getItem("userID");
  var channelid = localStorage.getItem("channelID");
  var senderName = localStorage.getItem("userUsername");
  var receiverID = channelInfo[0].userid;
  var receiverName = channelInfo[0].channelname;
  var message = newmessage;

  const channelMessage = {
    senderid: senderID,
    sender_channelid: channelid,
    sendername: senderName,
    receiverid: receiverID,
    receivername: receiverName,
    note_message: message,
  };
    const myToken = localStorage.getItem("fariToken");
   setMessage('Sending message...')
   setProgress((prevState: any) => {
      return {...prevState, started: true}
    })
  try {
    const response = await axios.post(`${FARI_API}/inbox/new`, JSON.stringify(channelMessage), {
     onUploadProgress: (progressEvent: any) => {setProgress((prevState: any) => {                  
        return {...prevState, rate: Math.round(progressEvent.progress*100) }
      })},
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },

    }).then(({ data }) => {
      setNewMessage('')
      setMessage('')
      setMessage('Message sent!');
      sendEmailNotification();
        return data;
      });
  } catch (error) {
    console.log(error)
  }
}



  
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 backdrop-blur' />
        <Dialog.Content className='fixed z-50 max-w-5xl m-auto overflow-hidden shadow-xl inset-10 h-max bg-background rounded-xl'>
          <ScrollArea.Root>
            <ScrollArea.Viewport className='h-full py-10 '>
              <InputEdit placeholder='Send a message' textarea onChange={updateMessage} value={newmessage}/>
              <div className="flex flex-col items-center justify-center gap-2 w-full h-[4rem] mt-[3rem]">
{/*                {message && <span className="text-[1.5rem] text-[#050529] dark:text-[#fdfbf9]">{progress.rate}% complete </span>} */}
{/*                {progress.started && <progress className="w-[32rem]" max="100" value={progress.rate}></progress>} */}
               {message && <span className="text-[1.5rem] text-[#050529] dark:text-[#fdfbf9]">{message}</span>}
             </div>
              <div className='flex flex-wrap justify-end gap-10 px-4 mt-24'>
                  <Button accent className="" onClick={newMessage}>
                    Send
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
  );
}
