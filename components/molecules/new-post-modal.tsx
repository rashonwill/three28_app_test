'use client';
import Button from '@/components/atoms/button';
import { InputEdit } from '@/components/atoms/input-edit';
import * as Dialog from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import _ from 'underscore';
import { useState, useEffect, useRef } from "react";
import axios from "axios";


export default function PostModal({
  children,
}: {
  children: React.ReactNode;
}) {

  const [newpost, setNewPost] = useState('');
  const [progress, setProgress] = useState({started: false, rate: 0});
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const premiereRef = useRef<HTMLInputElement>(null);
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';

    const updateMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost(event.target.value)
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




  async function newPost() {
  var channelInfo = await getChannelProfile();
  var post_content = newpost;
  var post_img = image;
  var channelid = localStorage.getItem("channelID");
  // var message = newmessage;
    
        const uploadData = {
          post_content: post_content,
          post_img: post_img,
          channelid: channelid,
          };
    
    const myToken = localStorage.getItem("fariToken");
   setMessage('Creating post...')
   setProgress((prevState: any) => {
      return {...prevState, started: true}
    })
  try {
    const response = await axios.post(`${FARI_API}/community/new-post`, JSON.stringify(uploadData), {
     onUploadProgress: (progressEvent: any) => {setProgress((prevState: any) => {                  
        return {...prevState, rate: Math.round(progressEvent.progress*100) }
      })},
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },

    }).then(({ data }) => {
      // setNewMessage('')
      // setMessage('')
      // setMessage('Message sent!'); 
      // sendEmailNotification();
        return data;
      });
  } catch (error) {
    console.log(error)
  }
}


    function putPoster(e: any, start: any) {
    e.preventDefault();
  
  
  
    let reader = new FileReader();
    let file = e.target.files[0]!;
    let slice_size = 1000 * 1024;
    
    let next_slice = start + slice_size + 1;
    let blob = file.slice(start, next_slice);
    let url = URL.createObjectURL(file); 
    
    
    setImage(e.target.files[0])
    reader.onloadend = function (event: any) {
      
    $("#post-image").attr("src", url);
  };
  reader.readAsDataURL(blob);
   

}


  
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 backdrop-blur' />
        <Dialog.Content className='fixed z-50 max-w-2xl m-auto overflow-hidden shadow-xl inset-10 h-max bg-background rounded-xl'>
          <ScrollArea.Root>
            <ScrollArea.Viewport className='h-full py-10 '>
              <InputEdit placeholder="What's happening?" onChange={updateMessage} value={newpost}/>

              	    <div className='relative w-80 m-4 bg-neutral-200/[.3] dark:bg-[#171717]'>
              <Image
                  onClick={() => premiereRef.current?.click()}
                  className='absolute cursor-pointer right-5 bottom-1'
                  src={`/assets/images/camera.svg`}
                  alt=''
                  width={76}
                  height={76}
                />
              <input
              type='file'
              accept=".jpeg, .png, .jpg, .gif"
              onChange={(e) =>
                // setThumb(URL.createObjectURL(e.target.files?.[0]!))
                putPoster(e, 0)
              }
              ref={premiereRef}
              className='hidden'
              name="post-image"
            />
                <img
                  className='object-cover w-full h-96'
                  src={image}
                  alt='post image'
		              id="post-image"	
                />
	     </div>

              <div className="flex flex-col items-center justify-center gap-2 w-full h-[4rem] mt-[3rem]">
{/*                {message && <span className="text-[1.5rem] text-[#050529] dark:text-[#fdfbf9]">{progress.rate}% complete </span>} */}
{/*                {progress.started && <progress className="w-[32rem]" max="100" value={progress.rate}></progress>} */}
               {message && <span className="text-[1.5rem] text-[#050529] dark:text-[#fdfbf9]">{message}</span>}
             </div>
              <div className='flex flex-wrap justify-end gap-10 px-4 mt-24'>
                  <Button accent className="" onClick={newPost}>
                    Post
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
