'use client';
import React from "react";
import ReactDOM from "react-dom"
import Avatar from '@/components/atoms/avatar';
import Typography from '@/components/atoms/typography';
import { useEffect, useRef, useState, useCallback } from 'react';
import _ from "underscore";
import $ from 'jquery';
import './account.css';

import { loadScript } from "@paypal/paypal-js";

let paypal;


export default function Account(){
  const payPal = useRef();
  const [registered, setRegistered] = useState(false);
  // const FARI_API = 'https://www.fariapi.com/api';	
  const FARI_API = 'https://three28-test-api.onrender.com/api';	

  const onBoard = () => {
     onBoarding();
  }

  const subscribe = () => {
    goSubscriptions();
  }

const logOut = () => {
    localStorage.clear();
    localStorage.setItem('theme', 'light');
    window.location.href = "login";
  }

async function onBoarding() {
  const myToken = localStorage.getItem("fariToken");
  fetch(`${FARI_API}/subscriptions/onboard-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myToken}`,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url, accountid }) => {
      localStorage.setItem("stripeAcctID", accountid);
      window.location = url;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function goSubscriptions() {
 const myToken = localStorage.getItem("fariToken");
  let vendorid = localStorage.getItem("vendorID");
  let userid = localStorage.getItem("userID");
  let customer_email = localStorage.getItem("userEmail");
  let stripeacct = localStorage.getItem("stripeAcctID");
  fetch(`${FARI_API}/subscriptions/vendor-subscription`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myToken}`,
    },
    body: JSON.stringify({
      vendor: vendorid,
      customer_email: customer_email,
      userid: userid,
      stripe_acctid: stripeacct,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location = url;
    })
    .catch((error) => {
      console.log(error);
    });
}


// //PAYPAL ACTIONS

async function vendorVerification() {
  let id = localStorage.getItem('vendorID');
  const myToken = localStorage.getItem("fariToken");
      try {
    const response = await fetch(`${FARI_API}/subscriptions/vendor-registration/${id}`,{
      method: 'PATCH',  
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${myToken}`
      }
    })
    const data = await response.json(); 
   vendorVerificationCheck();
    return data.vendor;
  } catch (error) {
    console.log(error)
  }
};


async function vendorSubscriptionFlag(){
  let id = localStorage.getItem('userID');
  const myToken = localStorage.getItem("fariToken");
  try{
  const response = await fetch(`${FARI_API}/subscriptions/vendor-subscription-update/${id}`,{
      method: 'PATCH',  
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${myToken}`
      }
    })
  const data = await response.json();
   return data.updatedSubscription;
  }catch(error){
  console.log(error)
  }

}

async function sendSubscriptionConfirmation(){
  let email = localStorage.getItem('userEmail');
  try {
    const response = await fetch(`${FARI_API}/mailer/newvendor/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }catch (error) {
    console.error(error)
  }
}


async function setStripeAcct(){
  let stripe = localStorage.getItem("stripeAcctID");
  const myToken = localStorage.getItem("fariToken");
  let id = localStorage.getItem('vendorID');
  try{
      let stripeAcct = {
    stripe_acctid: stripe,
  };
 const response = await fetch(`${FARI_API}/subscriptions/setstripe-acct/${id}`,
      {
        method: "PATCH",
        headers: {
	  "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
        body: JSON.stringify(stripeAcct),
      }
    );
    const data = await response.json();
    return data.vendor;
  }catch(error){
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
    //Paypal
 loadScript({clientId: "Ab17GOqz4pc5ztvPJeBenezE1RqR6HhDg3UFq_qVdT1pm63qHpP_K3ISvSWk_hQN3jila602VBLXuLJW", currency: "USD", vault: "true", intent: "subscription"})
 .then((paypal) => {

    paypal.Buttons({
      style: {
          shape: 'pill',
          color: 'black',
          layout: 'vertical',
          label: 'subscribe'
      },
      createSubscription:(data, actions) => {
        return actions.subscription.create({
          plan_id:'P-98T03103FW8695424MTRZM5Q'
        })
      },
      
      onApprove:(data, actions) => {
        setStripeAcct();
        vendorSubscriptionFlag(); 
        vendorVerification(); 
        sendSubscriptionConfirmation();
        return actions.subscription!.activate().then((subscriptionID) => {
          alert(data.subscriptionID)

        })

      },
 
}).render('#paypal-button-container'); // Renders the PayPal button
 })

	  vendorVerificationCheck();

  }, []);

  


  return(
    <>
	    

     {registered ? (
	       <> 
		    <div className="flex flex-col justify-center items-center m-[1rem]">    
		 <Typography variant="h3" className="text-[#050529] dark:text-[#fdfbf9]">You are registered!</Typography>     
	         <Typography variant="h5" className="text-[#B2B2B2]">Questions? Contact us: support@letsfari.com</Typography>
			    <button className='px-6 py-0.5 text-xl sm:text-2xl md:text-[22px]' onClick={logOut} aria-label="logout of Fari">Logout</button>
		</div>
	       
	       </>
	      )  : (
	       <>
	       
        <div className="flex flex-col justify-center items-center m-[1rem]">
	<div className="m-[1rem] flex flex-col justify-center items-center">
           <Typography variant="h4" className="mb-[1rem]">Step 1: Connect to us with via Stripe</Typography>
           <button className="bg-[#282828] text-[#fdfbf9] h-[3rem] w-full text-3xl px-12 rounded-full flex justify-center items-center" onClick={onBoard}><i className="fa-brands fa-stripe text-[3.5rem] mr-[5px]"></i> connect</button>
	</div>
	<div className="m-[1rem] mt-[3rem] flex flex-col justify-center items-center">
	  <Typography variant="h4" className="mb-[1rem]">Step 2: Vendor Subscription($12.99/Monthly)</Typography>
	    <div className="bg-transparent w-full" id="paypal-button-container"></div>
	</div>

	  <Typography variant="h5" className="text-[#B2B2B2]">Questions? Contact us: support@letsfari.com</Typography>
	 <button className='px-6 py-0.5 text-xl sm:text-2xl md:text-[22px]' onClick={logOut} aria-label="logout of Fari">Logout</button>
  
  </div>
		       
    
	       </>
				     
	)}

      
    </>
  )
}
