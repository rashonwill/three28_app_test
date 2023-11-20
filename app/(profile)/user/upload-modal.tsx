'use client';
import React from "react";
import { useState, useRef, useEffect } from "react";
import { InputEdit } from '@/components/atoms/input-edit';
import Input from '@/components/atoms/input';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Typography from '@/components/atoms/typography';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import UploadModal2 from './upload-modal-2';
import Tooltip from '@/components/atoms/tooltip';
import Button from '@/components/atoms/button';
import $ from 'jquery';
import _ from 'underscore';
import * as RadioGroup from '@radix-ui/react-radio-group';


export default function UploadModal({
  title, 
  description, 
  tags,
  setTitle,
  setDescription,
  setTags,
}: {
  title: string;
  description: string;
  tags: string[];
  setTitle: Function;
  setDescription: Function;
  setTags: Function;
}) {

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


 return (
<section className='space-y-10 '>
                 <InputEdit placeholder='Title' value={title} onChange={updateTitle} />
                  <InputEdit textarea placeholder='Description' value={description}  onChange={updateDescription} />
                  <div className="relative max-w-[62rem] mx-auto grow h-[15rem] bg-gray-200 dark:bg-[#171717] px-4 rounded-2xl pt-4">
                  <ul id="tags-list" className="flex flex-wrap ml-3.5 relative">
                    {tags.map((tag, index) => (
                      <li key={index} className="flex p-2.5 bg-zinc-500 m-1.5 rounded-full"><span className="mr-[5px] text-[22px] min-w-[2.5rem] h-[1.2rem] flex items-center justify-center ">{tag}</span>
                        <X size={16} color="#ffffff" className="cursor-pointer" onClick={() => removeTag(index)} /></li>
                    ))}
                    
                  <input
                    placeholder='Press enter to add tag'
                    id="tags-input"
                    onKeyUp={addTag}
                    className="text-2xl outline-none bg-transparent flex"
                  />
                    </ul>
                    
                </div>

</section>
 
              
  );
}

const data2 = [
  { icon: '/assets/images/video.svg', label: 'Video Upload' },
  { icon: '/assets/images/thumb.svg', label: 'Thumbnail Upload' },
];

const data = ['Film', 'Series', 'Podcast', 'Tech', 'Vlog', 'Music', 'Other'];


