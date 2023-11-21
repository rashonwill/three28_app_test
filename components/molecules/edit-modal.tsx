'use client';
import { InputEdit } from '@/components/atoms/input-edit';
import Input from '@/components/atoms/input';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import UploadModal2 from '@/app/(profile)/user/upload-modal-2';
import Typography from '../atoms/typography';
import Button from '../atoms/button';
import { useRef, useState, useEffect, useCallback } from 'react';
import _ from 'underscore';
import axios from "axios";

export default function EditModal({ children }: { children: React.ReactNode }) {
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [tags, setTags] = useState<string[]>(["fari"]);
const [message, setMessage] = useState('');	

    const updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

      const updateDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
        
  }

    const addTag = (event: any) => {
          if(event.keyCode == 13){
          setTags([...tags, event.target.value])  
           event.target.value = ""; 
      }
    };

  const removeTag = (tagEl: any) => {
    setTags(tags.filter((_, index) => index !== tagEl));
    
  }



  async function editVideo(){
  let id = localStorage.getItem("videoID");
  const myToken = localStorage.getItem("fariToken");	  
  const updatedUpload = {
    videotitle: title,
    videodescription: description,
    videotags: JSON.stringify(tags),
  };
  try {
    const response = await fetch(`https://fari-prod.herokuapp.com/api/uploads/edit-upload/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
      body: JSON.stringify(updatedUpload),
    });
    const data = await response.json();
	  setMessage('Changes saved!')
	  channelPost();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const getVideo = useCallback(async () => {
   const id = localStorage.getItem("videoID");
    try{
  	const response = await axios.get(`https://fari-prod.herokuapp.com/api/explorer/play/${id}`)
    .then(({ data }) => {
        if (data) {
          setTitle(data.video[0].videotitle)
	  setDescription(data.video[0].videodescription)
	  let videoTags = data.video[0].videotags
	  let tagList: string[] = [];

		const usingSplit = videoTags.split(',')

		usingSplit.forEach((tagEl: any) => {
			let newString = tagEl.toString().replace("[&quot;", "").replace("&quot;]", "").replaceAll("&quot;", "").trim();
			tagList.push(newString)			
		})
		setTags(tagList)
	}  
    })
	    
	  }catch(error){
      console.log(error)
    }
  }, [])

const channelPost = useCallback(async () => {
	localStorage.removeItem('uploads');
  const myToken = localStorage.getItem("fariToken");
  try {
    var channelid = localStorage.getItem("channelID");
    const response = await fetch(
      `https://fari-prod.herokuapp.com/api/users/myprofile/post/${channelid}`,
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


useEffect(() => {
     getVideo();
  }, [getVideo]);
	
	
  
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 backdrop-blur' />
        <Dialog.Content className='fixed z-50 max-w-5xl m-auto overflow-hidden shadow-xl inset-10 h-max bg-background rounded-xl'>
          <ScrollArea.Root>
            <ScrollArea.Viewport className='h-[90vh] py-10 '>
              <div className='space-y-10'>
                <InputEdit placeholder='Title' value={_.unescape(title)} onChange={updateTitle} />
                <InputEdit textarea placeholder='Description' value={_.unescape(description)} onChange={updateDescription}  />
                <div className="relative w-[62rem] mx-auto grow h-[15rem] bg-gray-200 dark:bg-[#171717] px-4 rounded-2xl pt-4">
                  <ul className="flex flex-wrap ml-3.5 relative">
			  {tags && tags.map((tag, index) => (
                      <li key={index} className="flex p-2.5 bg-zinc-500 m-1.5 rounded-full"><span className="mr-[5px] text-[22px] min-w-[2.5rem] h-[1.2rem] flex items-center justify-center ">{_.unescape(tag)}</span>
                        <X size={16} color="#ffffff" className="cursor-pointer" onClick={() => removeTag(index)} /></li>
                    ))}
                    
                  <input
                    placeholder='Press enter to add tag'
                    onKeyUp={addTag}
                    className="text-2xl outline-none bg-transparent flex"
                  />
                </ul>
                    
                </div>
		      <div className="flex flex-col items-center justify-center gap-2 w-full h-[4rem] mt-[3rem]">
               {message && <span className="text-[1.5rem] text-[#050529] dark:text-[#fdfbf9]">{message}</span>}
                 </div>
                <div className='flex justify-center gap-5 pt-20'>
		 <Dialog.Close>
                    <Button accent sm aria-label="close edit modal">Close</Button>
                  </Dialog.Close>
                  <Button accent sm onClick={editVideo} aria-label="save video edit changes">Save</Button>
                </div>
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation='vertical' />
          </ScrollArea.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
