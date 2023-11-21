'use client';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import ProgressBar from 'react-bootstrap/ProgressBar';
import './video-upload.scss';
import { useRef, useState, useCallback } from 'react';
import Uploader from './uploader';
import UploadModal from './upload-modal';
import UploadModal2 from './upload-modal-2';
import Button from '@/components/atoms/button';
import $ from 'jquery';
import _ from 'underscore';
import axios from "axios";
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Typography from '@/components/atoms/typography';
import Tooltip from '@/components/atoms/tooltip';
import { cn } from '@/lib/utils';

export default function VideoUpload({

children,
  
}: {
children: React.ReactNode;
  
}){

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([]);
  const [price, setPrice] = useState('0.00');
  const [videoclass, setClass] = useState('free');
  const [category, setCategory] = useState('');
  const [thumb, setThumb] = useState('');
  const [video, setVideo] = useState('');
  const newUpload = useRef(null);
  const [registered, setRegistered] = useState(false);

  const [progress, setProgress] = useState({started: false, rate: 0});
  const [message, setMessage] = useState('');

  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';

  
async function getUserProfile() {
  const myToken = localStorage.getItem("fariToken"); 
  try {
    const response = await fetch(`${FARI_API}/users/myprofile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
    return data.profile;
  } catch (error) {
    console.log(error)
  }
}


  const upload = async () => {
  const myToken = localStorage.getItem("fariToken"); 
  let videoTitle = title;
  let videoDescription = description;
  let videoTags = JSON.stringify(tags);
  const rental_price = price;
  const content_category = category;
  const content_class = videoclass;
  let poster = thumb;
  let vid = video;

  try {
    var profile = await getUserProfile();
    var channelname = profile[0].channelname;
    var channelid = profile[0].channelid;
    var vendor_email = profile[0].email;
    var stripe_acct = profile[0].stripe_acctid;

    const formData = new FormData(newUpload.current!);
    formData.append("title", videoTitle);
    formData.append("description", videoDescription);
    formData.append("tags", videoTags);
    formData.append("rental_price", rental_price);
    formData.append("channelid", channelid);
    formData.append("channelname", channelname);
    formData.append("vendor_email", vendor_email);
    formData.append("stripe_acctid", stripe_acct);
    formData.append('content_category', category);
    formData.append('content_class', videoclass);
    formData.append('thumbnail', poster);
    formData.append('video', vid);
    
    setMessage('Uploading...');
    setProgress((prevState: any) => {
      return {...prevState, started: true}
    })
    const response = await axios.post(`${FARI_API}/uploads/new-upload`, formData, {
      onUploadProgress: (progressEvent: any) => {setProgress((prevState: any) => {
        let percent = Math.round(progressEvent.progress*100)
             if(percent === 100) {
              setMessage('')
              setMessage('Wrapping things up... one moment')
             }                    
        return {...prevState, rate: Math.round(progressEvent.progress*100) }
      })},
      headers: {
        Authorization: `Bearer ${myToken}`,
      }
      
    }).then(({ data }) => {
      setMessage('')
      setMessage('Upload complete!')
      localStorage.removeItem('uploads')
        channelPost();
        return data;
      }); 
  }catch(error){
    setMessage('');
    setMessage('Oops! Upload failed, please try again.')
    console.log(error)
  }
  
    
  }

const channelPost = useCallback(async () => {
  const myToken = localStorage.getItem("fariToken");
  try {
    var channelid = localStorage.getItem("channelID");
    const response = await fetch(
      `${FARI_API}/users/myprofile/post/${channelid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    if (data.channelUploads.length > 0) {
     localStorage.setItem('uploads', JSON.stringify(data.channelUploads))
    } 
    return data.channelUploads;
  } catch (error) {
    console.log(error);
  }
  }, [])





  return (
    <>
      <form ref={newUpload} id="newUpload" encType="multipart/form-data">
          <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 backdrop-blur' />
        <Dialog.Content className='fixed z-50 max-w-5xl m-auto overflow-hidden shadow-xl inset-10 h-max bg-background rounded-xl'>
          <ScrollArea.Root>
            <ScrollArea.Viewport className='h-[90vh] py-10 '>
              
                
            <Tabs.Root defaultValue='1' className=''>
               
          <Tabs.Content value='1' className='space-y-10 '>
             <UploadModal  title={title} setTitle={setTitle} description={description} setDescription={setDescription} tags={tags} setTags={setTags}/>
          </Tabs.Content>
           <Tabs.Content value='2'>
              <UploadModal2 videoclass={videoclass} setClass={setClass} category={category} setCategory={setCategory} price={price} setPrice={setPrice} registered={registered} setRegistered={setRegistered} /> 
              <Uploader video={video} setVideo={setVideo} thumb={thumb} setThumb={setThumb} /> 
             <div className="flex flex-col items-center justify-center gap-2 w-full h-[7rem] mt-[3rem]">
               {message && <span className="text-[1.5rem] text-[#050529] dark:text-[#fdfbf9]">{progress.rate}% complete </span>}
               {progress.started && <progress className="w-[32rem]" max="100" value={progress.rate}></progress>}
               {message && <span className="text-[1.5rem] text-[#050529] dark:text-[#fdfbf9]">{message}</span>}
             </div>
             
             <div className="flex justify-end gap-4 py-8 m-[1rem] mb-[3rem]">
             <Button accent sm className="" onClick={upload}>Upload</Button>
             <Dialog.Close asChild>
               <Button accent sm className="">Close</Button>
             </Dialog.Close>
             </div>
    
          </Tabs.Content>

         <Tabs.List className='absolute bottom-0 flex justify-center w-full gap-6 py-4 bg-background justify-self-end'>
                  {['1', '2'].map((_) => (
                    <Tabs.Trigger
                      key={_}
                      className='flex items-center gap-4 group'
                      value={_}
                    >
                      {_ === '1' && (
                        <ChevronLeft size={32} className='text-secondary' />
                      )}
                      <Typography
                        variant='h6'
                        className='group-aria-selected:underline'
                      >
                        {_}
                      </Typography>
                      {_ === '2' && (
                        <ChevronRight size={32} className='text-secondary' />
                      )}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
              </Tabs.Root>
                 
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation='vertical' />
          </ScrollArea.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
      </form>
  
    </>
  )
}

