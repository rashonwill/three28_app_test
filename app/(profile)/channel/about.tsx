import React from "react";
import axios from "axios";
import _ from "underscore";
import { useState, useEffect, useCallback } from "react";
import { VideoWithOptions } from '@/components/organisms/video-with-options';
import Typography from '@/components/atoms/typography';

export default function About() {
  const [bio, setBio] = useState('');
  // const FARI_API = 'https://www.fariapi.com/api';	
  const FARI_API = 'https://fari-prod.herokuapp.com/api';
  
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
    setBio(data.channel[0].bio)
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

return(
  <>
  <Typography variant='h4'>{_.unescape(bio) ? _.unescape(bio) : '...'}</Typography>
  </>
)
  
}
