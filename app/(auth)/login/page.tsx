'use client';
import React from "react";
import { useState } from "react";
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import Typography from '@/components/atoms/typography';
import { EyeOff, User2 } from 'lucide-react';
import Link from 'next/link';
import _ from "underscore";
import Head from 'next/head';
import { appsignal } from "appsignal.js";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // const FARI_API = 'https://www.fariapi.com/api';	
  const FARI_API = 'https://fari-prod.herokuapp.com/api';
  
    const updateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }
  const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const login = async () =>{
    localStorage.clear();
    localStorage.setItem('theme', 'light');
   try {
      const response = await fetch(
        `${FARI_API}/account/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          mode: "cors",
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await response.json();
      if(data.error){
        setMessage(data.message);
      }if(data.success){
      localStorage.setItem("fariToken", data.token);
      setMessage(data.message);  
       getUserProfile();  
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);  
      }
      
    } catch (error) {
     appsignal.sendError(error)
     console.log(error)
      setTimeout(() => {
        setMessage('')
        setUsername('')
        setPassword('')
      }, 3000);
    }
    
  }

    const loginRequest = (event: any) => {
    event.preventDefault();
    login();
  };

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
    if (data.profile.length > 0) {
      localStorage.setItem("userID", data.profile[0].userid);
      localStorage.setItem("userUsername", data.profile[0].username);
      localStorage.setItem("userEmail", data.profile[0].email);
      localStorage.setItem("vendorID", data.profile[0].vendorid);
      localStorage.setItem("channelID", data.profile[0].channelid);
      localStorage.setItem("channelName", data.profile[0].channelname);
      localStorage.setItem("userStripeAcct", data.profile[0].stripe_acctid);
      localStorage.setItem("userAvi", data.profile[0].profile_avatar);
      localStorage.setItem("userPoster", data.profile[0].profile_poster);
    } else if (data.profile.length === 0) {
      window.location.href = "login";
      console.log('not logged in')
    }

    return data.profile;
  } catch (error) {
    console.log(error)
  }
}
  
  return (
    <>
      <Head>
        <title>Fari | Login</title>
      </Head>
      <Typography variant='h2' className='max-lg:text-center text-[#323232] max-lg:mt-44'>
        Hello, welcome back!{' '}
      </Typography>
      <form className='flex flex-col gap-y-14 mt-36'>
        <Input type="text" placeholder="username" icon={User2} value={username} onChange={updateUsername} id="username" required  />
        <Input type="password" placeholder="password" icon={EyeOff} value={password} onChange={updatePassword} id="password" required />

        
        <div id="message" className="text-rose-800 text-2xl text-center">{message}</div>
        <Button accent className='w-full h-16 bg-[#686868]' onClick={loginRequest}>Login</Button>
      </form>
      <div className='flex flex-col items-center gap-5 py-10'>
        <Typography variant='h4'><Link className='text-[#323232] hover:text-secondary ' href={'/reset'}>Forgot your password?</Link> </Typography>
        <Typography variant='h4' className='text-[#323232]'>
          Don’t have an account?{' '}
          <Link className='text-[#323232] hover:text-secondary ' href={'/register'}>
            Register Here
          </Link>
          .
        </Typography>
      </div>
    </>
  );
}
const data = [
  {
    placeholder: 'username',
    type: 'text',
    icon: User2,
  },
  {
    type: 'password',
    placeholder: 'password',
    icon: EyeOff,
  },
];
