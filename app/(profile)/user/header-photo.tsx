'use client';
import React from "react";
import { useState, useEffect, useCallback } from "react";
// import Image from 'next/image';

export default function HeaderPhoto() {
  const [poster, setPoster] = useState('https://fari-prod-hls-069544520198.s3.amazonaws.com/wp4053330-no-wallpapers.jpg?format=webp');

const userChannel = useCallback(async () => {
  const myToken = localStorage.getItem("fariToken"); 
  const channelid = localStorage.getItem("channelID");
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';
    
  try {
    const response = await fetch(`${FARI_API}/users/myprofile/channel/${channelid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
    if (data.profile.length > 0) {
      setPoster(data.profile[0].profile_poster)
    } else if (data.profile.length === 0) {
      window.location.href = "login";
    }

    return data.profile;
  } catch (error) {
    console.log(error)
  }
  }, []) 

  useEffect(() => {
    userChannel();
  }, [userChannel]);

  return (
    <>
      <div className="w-full h-[400px]">
       <img
          className='w-full h-full'
          src={poster ? poster : 'https://fari-prod-hls-069544520198.s3.amazonaws.com/wp4053330-no-wallpapers.jpg'}
          alt='user poster'
        />
      </div>
        
    
    </>

  )

   

  
}
