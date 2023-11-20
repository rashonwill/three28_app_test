'use client';
import Button from '@/components/atoms/button';
import Typography from '@/components/atoms/typography';
import { MapPin, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import EditProfile from './edit-profile';
import UploadModal from './upload-modal';
import VideoModal from './video-upload';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import React from "react";
import { useState, useEffect, useCallback } from "react";
import _ from 'underscore';
import { viewsConversion } from '@/app/conversions/conversion';
import './profile.scss';
import Head from 'next/head';

export default function Profile() {
  const path = usePathname();
  const user = path.includes('user');
  const [account, setAccount] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [registered, setRegistered] = useState(false);
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';

  async function checkToken() {
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(`${FARI_API}/account/token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
    if (data.name === "TokenExpiredError") {
      localStorage.clear();
      window.location.href = "/login";
    }else{
      userChannel();
    }
    return data.user;
  } catch (error) {
    console.log(error);
  }
}

const checkLogin = useCallback(async () => {
     const myToken = localStorage.getItem("fariToken");
  if (!myToken || myToken === null) {
    window.location.href = "/login";
  } else {
    checkToken();
  }
  }, []) 

  async function userChannel() {
  const myToken = localStorage.getItem("fariToken"); 
  const channelid = localStorage.getItem("channelID");
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
      setAccount(data.profile)
    } else if (data.profile.length === 0) {
      window.location.href = "login";
    }

    return data.profile;
  } catch (error) {
    console.log(error)
  }
}

const vendorVerificationCheck = useCallback(async () => {
  let id = localStorage.getItem("vendorID");
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(`${FARI_API}/users/vendor-verified/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
    if (data.vendor[0].registration_complete === true) {
      setRegistered(true)
    } 
    return data.vendor;
  } catch (error) {
    console.log(error)
  }
}, []) 



  useEffect(() => {
    localStorage.removeItem('messages');
    checkLogin();
    vendorVerificationCheck();
  }, [checkLogin, vendorVerificationCheck]);


  
  return (
    <>
                  <Head>
        <title>Fari | Profile </title>
          <link rel="canonical" href="https://letsfari.com/" />
      </Head>
      <section
      className={cn(
        'container flex items-center justify-between  -translate-y-11',
        {
          '-translate-y-1/4': user,
        }
      )}
    >
      {account && account.length > 0 ? account.map((creator: any) => { 
      return (
        <>
      <div className='flex items-center gap-10 '>
       <div className="w-[175px] h-[235px] rounded-2xl"> 
        <img
          src={creator.profile_avatar ? creator.profile_avatar : 'https://drotje36jteo8.cloudfront.net/noAvi.png'}
          alt='user avatar'
          className='-translate-y-1/4 rounded-2xl h-full'
          width={168}
          height={200}
        />
         </div>
        <div>
        {registered ? (
          <>
            <Typography variant='h4'> {_.unescape(creator.username)} <i className="fa-solid fa-registered"></i> </Typography>
          </>
          ) : (
             <>
              <Typography variant='h4'> {_.unescape(creator.username)} </Typography>
             </>
          )}
          
          <Typography variant='h6'>{`${viewsConversion(creator.subscriber_count)}`} Subscribers</Typography>
        </div>
      </div>
        </>
        )} ) : null}
      <div className='flex gap-1.5 -translate-y-1/2 max-lg:hidden'>
          <>
            <VideoModal>
              <Button accent className='flex items-center gap-2'>
                <UploadCloud />
                New Upload
              </Button>
            </VideoModal>
            <EditProfile>
              <Button accent>Edit Profile</Button>
            </EditProfile>
          </>
      </div>
    </section>
    
    </>
    
  );
}
