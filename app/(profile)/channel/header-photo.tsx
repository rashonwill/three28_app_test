'use client';
import React from "react";
import { useState, useEffect, useCallback } from "react";
// import Image from 'next/image';

export default function HeaderPhoto() {
  const [poster, setPoster] = useState('https://fari-prod-hls-069544520198.s3.amazonaws.com/wp4053330-no-wallpapers.jpg?format=webp');
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://three28-test-api.onrender.com/api';

  
const getChannelProfile = useCallback(async () => {
  try {
    let channelid = localStorage.getItem("visitingChannelID");
    const response = await fetch(`${FARI_API}/users/channel/${channelid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setPoster(data.channel[0].profile_poster)
    return data.channel;
  } catch (error) {
    console.log(error)
  }
  }, []) 

    async function getChannelID(){
  let paramaters = new URLSearchParams(window.location.search);
  let channel = paramaters.get("profile");
  localStorage.setItem("handle", channel);
  let channelHandle = localStorage.getItem('handle')
  
    try {
    const response = await fetch(`${FARI_API}/users/channel/handle/${channelHandle}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
      localStorage.setItem('visitingChannelID', data.channel[0].channelid)
    return data.channel;
  } catch (error) {
    console.log(error)
  }
}

  useEffect(() => {
    getChannelID().then(getChannelProfile);
  }, [])


  return (
    <>
      <div className="w-full h-[400px]">
       <img
          className='w-full h-full'
          src={poster ? poster : 'https://fari-prod-hls-069544520198.s3.amazonaws.com/wp4053330-no-wallpapers.jpg?format=webp'}
          alt='user poster'
        />
      </div>
        
    
    </>

  )

   

  
}
