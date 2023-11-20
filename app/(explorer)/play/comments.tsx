import React from "react";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import _ from 'underscore';

import { InputEdit } from '@/components/atoms/input-edit';
import Typography from '@/components/atoms/typography';
import { MessageCard } from '@/components/molecules/message-card';
import { viewsConversion } from '@/app/conversions/conversion';

export default function Comments() {
const [newVideoComment, setNewComment] = useState('')
const [comment, setComments] = useState<any[]>([]);
const [count, setCount] = useState<number | undefined>(0);
const [user, setUser] = useState('');
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';

const updateComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value)
  }

const commentData = (channelid: any, commentid: any) =>{
  localStorage.setItem('visitingChannelID', channelid)
  localStorage.setItem('commentID', commentid)
}

const channelNav = (channelid: any) =>{
  localStorage.setItem('visitingChannelID', channelid)
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
async function updateCommentCount() {
  let uuid = localStorage.getItem("videoID");
  const myToken = localStorage.getItem("fariToken");

  try {
    const response = await fetch(
      `${FARI_API}/explorer/updatecommentcount/${uuid}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    getCommentCount();
    return data;
  } catch (error) {
	  console.log(error)
  }
}

async function reduceCommentCount() {
  let uuid = localStorage.getItem("videoID");
  const myToken = localStorage.getItem("fariToken");

  try {
    const response = await fetch(
      `${FARI_API}/explorer/reducecommentcount/${uuid}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    getCommentCount();
    return data;
  } catch (error) {
	  console.log(error)
  }
}
	
	
 async function newComment() {
  let comRemark = newVideoComment;
  var profile = await getUserProfile();
  var username = localStorage.getItem("userUsername");
  var userid = localStorage.getItem("userID");
  var postId = localStorage.getItem("videoID");
  const myToken = localStorage.getItem("fariToken");

  const userRemark = {
    commentorid: userid,
    commentorname: username,
    user_comment: comRemark,
    video_uuid: postId,
  };
	 
  try {
    const response = await fetch(`${FARI_API}/explorer/comment/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
      body: JSON.stringify(userRemark),
    });
    const data = await response.json();
    updateCommentCount();
    getComments();
    setNewComment('')
    return data.comment;
  } catch (error) {
    console.log(error)
  }
};

async function setUserID() {
    let userIn = localStorage.getItem("userID");
    if (userIn) {
      setUser(userIn);
    }
  }

  const getComments = useCallback(async () => {
  let paramaters = new URLSearchParams(window.location.search);
    let video_id = paramaters.get('video');
    if (video_id) {
      localStorage.setItem('videoID', video_id);
    }
      try{
	const id = localStorage.getItem("videoID");      
      const response = await axios.get(`${FARI_API}/explorer/comments/${id}`)
      .then(({ data }) => {
    localStorage.setItem('comments', JSON.stringify(data.comments));
    let vidComments = JSON.parse(localStorage.getItem('comments'))    
    setComments(vidComments)
    
      })
        }catch(error){
        console.log(error)
      }
    }, [])
  
  const getCommentCount = useCallback(async () => {
  const id = localStorage.getItem("videoID");
      try{
      const response = await axios.get(`${FARI_API}/analytics/commentscount/${id}`)
      .then(({ data }) => {
          if (data.total.length === 0) {
            setCount(0);
          }else if(data.total.length > 0){
          setCount(data.total[0].count);
    }
      })
        }catch(error){
        console.log(error)
      }
    }, [])	

const getVideoComments = useCallback(async () => {
       try {
        const storedData = JSON.parse(localStorage.getItem('comments'));
        if(!storedData) {
         setUserID().then(getComments).then(getCommentCount);
        }else if(storedData){
          setComments(storedData)
        }
      } catch (error) {
        console.log(error);
      }
  }, [comment, getComments, getCommentCount])





useEffect(() => {
    getVideoComments();
  }, [getVideoComments, getComments, getCommentCount]);
  
  return (
    <section className='py-12 '>
      <InputEdit btn='Send' placeholder='Add a Comment' onChange={updateComment} onClick={newComment} value={newVideoComment}/>
      <Typography variant='h4' className='py-10'>
        Comments {`${viewsConversion(count)}`}
      </Typography>
        {comment && comment.length > 0 ? comment.map((comment) => {
         return comment.commentorid == user ?  (

	    
	<div className='pl-7 m-10' key={comment.id} onClick={() => commentData(comment.channelid, comment.commentid)}>
           <MessageCard comment author message={_.unescape(comment.user_comment)} name={_.unescape(comment.commentorname)} user={comment.profile_avatar + '?format=webp' ? comment.profile_avatar + '?format=webp' : 'https://drotje36jteo8.cloudfront.net/noAvi.png?format=webp'} />
	</div> 
		 ) : (
		 
	<div className='pl-7 m-10' key={comment.id} onClick={() => channelNav(comment.channelid)}>
           <MessageCard comment message={_.unescape(comment.user_comment)} name={_.unescape(comment.commentorname)} user={comment.profile_avatar + '?format=webp' ? comment.profile_avatar + '?format=webp' : 'https://drotje36jteo8.cloudfront.net/noAvi.png?format=webp'} />
	</div> 
	)
	
		 

        }) : <Typography variant='h4' className="text-gray-400 text-center"> No comments yet. </Typography>}
        
    



    </section>
  );
}

const data = {
  user: 'rashon',
  name: 'Cole',
  message: 'First time!',
};
