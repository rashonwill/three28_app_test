'use client';
import React from "react";
import { useState } from "react";
// import Button from '@/components/atoms/button';
import Input from '@/components/atoms/input';
import Typography from '@/components/atoms/typography';
import { EyeOff, MapPin, QrCode } from 'lucide-react';
import { Mail, User2 } from 'lucide-react';
import Link from 'next/link';
import _ from 'underscore';
import './registration.css';
import $ from 'jquery';
import Head from 'next/head';


export default function Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState('');
   // const FARI_API = 'https://www.fariapi.com/api';	
  const FARI_API = 'https://fari-prod.herokuapp.com/api';
  
    const updateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const updateLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value)
  }

    const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const updateConfirmed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmed(event.target.value)
  }

    const updateCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value)
  }
  
const register = async () => {
  const terms = $('input[name="termsofuse"]:checked').val();
  if (!terms) {
    setMessage('')
    setMessage("Please accept the terms and conditions.")
    return false;
  }


  const password1 = $('#password').val();
  const password2 = $('#confirmed').val();
  if (password1 != password2) {
      setMessage('')
      setMessage("Your password and confirmed password does not match")
       return false;
  }

  
    const user = {
    username: username,
    email: email,
    password: password,
    confirmpassword: confirmed,
    location: location,
    invitation_code: code,
  };
  
   try {
      const response = await fetch(
        `${FARI_API}/account/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data = await response.json();
      if(data.error){
        setMessage(data.message)
      }if(data.success){
        localStorage.setItem('userEmail', email);
        setMessage(data.message);
        setTimeout(function(){
             welcomeEmail();
            window.location.href = "/login";
       }, 1500);

      }      
    } catch (error) {
     console.log(error)
      setTimeout(() => {
        setMessage('')
      }, 3000);
    }
    
  }

    const registrationRequest = (event: any) => {
    event.preventDefault();
    register();
  };

  async function welcomeEmail() {
  const email = localStorage.getItem('userEmail')
  try {
    const response = await fetch(`${FARI_API}/mailer/welcome/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

  const checkInput = () => {
  const value = password;
  const length = new RegExp("(?=.{8,})");
  const lower = new RegExp("(?=.*[a-z])");
  const upper = new RegExp("(?=.*[A-Z])");
  const number = new RegExp("(?=.*[0-9])");
  const special = new RegExp("(?=.*[!@#$%^&*])");

  if (length.test(value)) {
    $("#character-length").addClass("pass");
  } else {
    $("#character-length").removeClass("pass");
  }
  if (upper.test(value)) {
    $("#uppercase-letter").addClass("pass");
  } else {
    $("#uppercase-letter").removeClass("pass");
  }
  if (lower.test(value)) {
    $("#lowercase-letter").addClass("pass");
  } else {
    $("#lowercase-letter").removeClass("pass");
  }
  if (number.test(value)) {
    $("#one-number").addClass("pass");
  } else {
    $("#one-number").removeClass("pass");
  }

  if (special.test(value)) {
    $("#special-character").addClass("pass");
  } else {
    $("#special-character").removeClass("pass");
  }
  }

  const showPasswordRules = () => {
  $('#criteria').addClass('active')
    
  }

  const hidePasswordRules = () => {
  $('#criteria').removeClass('active');
    
  }

  
  return (
    <>
      <Head>
        <title>Fari | Registration</title>
      </Head>
      <Typography variant='h2' className='max-lg:text-center text-[#323232] max-lg:mt-44'>
        Create an account.
      </Typography>
      <form className='flex flex-col mt-10 gap-y-9'>
        <Input type="text" placeholder="username" icon={User2} required onChange={updateUsername} onFocus={hidePasswordRules} />
        <Input type="email" placeholder="email" icon={Mail} required onChange={updateEmail} onFocus={hidePasswordRules} />
        <Input type="text" placeholder="location" icon={MapPin} onChange={updateLocation} onFocus={hidePasswordRules} />
        <Input type="password" placeholder="password" icon={EyeOff} required onChange={updatePassword} onKeyUp={checkInput} onFocus={showPasswordRules} id="password" />
        <Input type="password" placeholder="confirm password" icon={EyeOff} required onChange={updateConfirmed}  onFocus={hidePasswordRules} id="confirmed"/>
        <Input type="text" placeholder="affiliate code" icon={QrCode} onChange={updateCode}  onFocus={hidePasswordRules} id="code"/>
        <div id="messages" >
        <Typography variant='h5' className="text-rose-800 text-2xl text-center">{message}</Typography>
          <ul className="text-2xl text-left text-[#323232]" id="criteria">
              <li id="character-length">At least 8 characters</li>
              <li id="uppercase-letter">At least one uppercase character</li>
              <li id="lowercase-letter">At least one lowrcase character</li>
              <li id="one-number">At least one number</li>
              <li id="special-character">At least one special character</li>
            </ul>
        </div>
        
        <Typography
          variant='h4'
          className='flex items-center justify-center gap-3 translate-y-4 cursor-pointer select-none'
        >
          <input
            type='checkbox'
            id='checkbox'
            className='scale-125 accent-primary-dark bg-primary-light'
            value="accepted"
            name="termsofuse"
          />
          <label htmlFor='checkbox'>I agree to the <Link className=' text-[#323232] hover:text-secondary ' href={'/termsandconditions'}>terms and conditions</Link></label>
        </Typography>
        <Button accent className='w-full bg-[#686868]' onClick={registrationRequest}>Register</Button>
      </form>
      <div className='flex flex-col items-center gap-5 py-10'>
        <Typography variant='h4' className='text-[#323232]'>
          Already have an account?{' '}
          <Link className='text-[#323232] hover:text-secondary ' href={'/login'}>
            Login Here.
          </Link>
        </Typography>
      </div>
    </>
  );
}
const data = [
  {
    placeholder: 'username',
    icon: User2,
    type: 'text',
  },
  {
    type: 'email',
    placeholder: 'email',
    icon: Mail,
  },
  {
    type: 'text',
    placeholder: 'location',
    icon: MapPin,
  },
  {
    type: 'password',
    placeholder: 'password',
    icon: EyeOff,
  },
  {
    type: 'password',
    placeholder: 'password',
    icon: EyeOff,
  },
];
