'use client';
import React from "react";
import { useState } from "react";
import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import Typography from '@/components/atoms/typography';
import { Mail, User2 } from 'lucide-react';
import Link from 'next/link';
import _ from "underscore";


export default function Reset(){
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
    // const FARI_API = 'https://www.fariapi.com/api';	
  const FARI_API = 'https://three28-test-api.onrender.com/api';


  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

 async function passwordResetRequest(event: any) {
   event.preventDefault();
  let request = _.escape(email);
  try {
    const response = await fetch(`${FARI_API}/mailer/forgotpassword/${request}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.error) {
        setMessage(data.message)
    } else if (data.success) {
        setMessage(data.message)
      localStorage.setItem("tempToken", data.token);
    }
    return data;
  } catch (error) {
    console.log(error)
  }
};


  return(
    <>
    <Typography variant='h2' className='max-lg:text-center max-lg:mt-44'>
        Reset password.
      </Typography>

      <form className='flex flex-col mt-10 gap-y-9'>
      <Input type="email" placeholder="email" icon={Mail} required onChange={updateEmail} />
        <div id="message" className="text-rose-800 text-2xl text-center">{message}</div>
        <Button accent className='w-full h-16 bg-[#686868]' onClick={passwordResetRequest}>Submit</Button>
      <div className="w-full text-center">
        <Link className=' text-[#323232] hover:text-secondary ' href={'/login'}>
        <Typography variant='h4'>
         Back to login
        </Typography>
        </Link>
      </div>

      </form>
    </>
  )
}
