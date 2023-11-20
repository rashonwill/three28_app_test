 'use client';
import React from 'react';
import Typography from '@/components/atoms/typography';
import Link from 'next/link';
import { useEffect } from "react";



export default function OrderComplete() {

// const FARI_API = 'https://www.fariapi.com/api';
const FARI_API = 'https://fari-prod.herokuapp.com/api';	

async function reduceQuantity(){
const myToken = localStorage.getItem('fariToken');	
const items = JSON.parse(localStorage.getItem('MyCartItems'))
items.forEach(async function(item){
 let id = item.productid;	
 const newQty = { 
  product_quantity: item.quantity,
 }	
 
  try {
    const response = await fetch(`${FARI_API}/store/reduce/qty/${id}`,{
      method: 'PATCH',  
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${myToken}`
      },body: JSON.stringify(newQty)
    })
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Oops Something Went Wrong! Could not get that order.', error);
  }

})

}	


useEffect(() => {
	reduceQuantity();
	setTimeout(function() {
         localStorage.removeItem('MyCartItems');
	localStorage.removeItem('OrderID');
    }, 2000);
	
}, [])


	
  return(
    <>
      <div className="flex flex-col justify-center items-center m-[1rem] mt-[5rem]">
        <Typography variant="h3">Thank you for your purchase!!</Typography>
      <div>
	<Link  href={`/channel`} aria-label="Go back to channel" >
	<Typography variant="h6">Back to Channel</Typography>
	</Link>
     </div>	
      </div>
    
    </>
  )
  
}
