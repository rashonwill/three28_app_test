import React from "react";
import axios from "axios";
import _ from "underscore";
import { useState, useEffect, useCallback } from "react";
import Typography from '@/components/atoms/typography';
import Button from '@/components/atoms/button';
import { PenLine, Camera } from 'lucide-react';
import { InputEdit } from '@/components/atoms/input-edit';
import * as Separator from '@radix-ui/react-separator';


export default function Feed(){
 const [newpost, setPost] = useState('');
  const [postcomment, setPostComment] = useState('');
  const [progress, setProgress] = useState({started: false, rate: 0});
  const [message, setMessage] = useState('');
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';

    const updatePost = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPost(event.target.value)
  }

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
    if (data.profile.length === 0) {
      window.location.href = "/login";
    }
    return data.profile;
  } catch (error) {
    console.log(error);
  }
}

  async function newComment() {
  let comRemark = postcomment;
  var profile = await getUserProfile();
  var username = localStorage.getItem("userUsername");
  var userid = localStorage.getItem("userID");
  var postId = localStorage.getItem("postID");
  const myToken = localStorage.getItem("fariToken");

  const userRemark = {
    commentorid: userid,
    commentorname: username,
    user_comment: comRemark,
    postid: postId,
  };
	 
  try {
    const response = await fetch(`${FARI_API}/community/comment/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
      body: JSON.stringify(userRemark),
    });
    const data = await response.json();
    // updateCommentCount();
    // getComments();
    // setNewComment('')
    return data.comment;
  } catch (error) {
    console.log(error)
  }
};

return (
      <>
            <div className='flex justify-center mt-20 p-4 gap-1.5 -translate-y-1/2 max-lg:hidden '>
                <div className=" w-9/12 h-full rounded-3xl flex flex-col justify-center p-4 dark:bg-[#0D0D0D]">
			
                  <div className="h-full w-9/12">
                  <InputEdit placeholder='New Post' btn='Post' onClick={newComment} onChange={updatePost} value={newpost} />
                  </div>
		    
		    <Separator.Root className='w-9/12 h-px my-6 bg-black/40 dark:bg-white/40' />
		    
            <div className="flex justify-end gap-1.5 cursor-pointer w-9/12">
            <Typography variant="h5">Photo</Typography><Camera />
            </div>
		    
            </div>
            </div>
        <Typography variant='h3' className='max-lg:text-center text-[#171717] text-center max-lg:mt-44 mt-4rem dark:text-[#fdfbf9]'>
        FEEDS!
      </Typography>
      
      </>
    
)

  
}
