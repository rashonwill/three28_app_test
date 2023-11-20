'use client';
import Typography from '@/components/atoms/typography';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useRef, useState, useCallback, useEffect } from 'react';
import $ from 'jquery';
import _ from 'underscore';

export default function UploadModal2({
  price, 
  setPrice, 
  videoclass, 
  setClass, 
  category, 
  setCategory,
  registered,
  setRegistered,
} : {
  price: string;
  setPrice: Function;
  videoclass: string;
  setClass: Function;
  category: string;
  setCategory: Function;
  registered?: boolean;
  setRegistered: Function;
}) {

    const updatePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value)
  }

  const updateClass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClass(event.target.value)
  }

  const updateCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value)
  }

  const FARI_API = 'https://www.fariapi.com/api';
  // const FARI_API = 'https://fari-prod.herokuapp.com/api';

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
      } else {
        setRegistered(false)
      }
      return data.vendor;
    } catch (error) {
      console.log(error)
    }
  }, [setRegistered]) 


  useEffect(() => {
    vendorVerificationCheck();
  }, [vendorVerificationCheck]);

  return (
  
 <section className='p-8'>
      <Typography variant='h5'>Category:</Typography>
      <br />
      <RadioGroup.Root 
        className='flex flex-wrap gap-8 mb-8'
        onValueChange={(v) => setCategory(v)}
        name="content_category"
        >
        {data.map((_) => (
          <div key={_} className='flex items-center cursor-pointer'>
            <RadioGroup.Item
              value={_}
              id={_}
              className='w-5 rounded-full  aria-checked:bg-[#B04141] aspect-square bg-accent'
            ></RadioGroup.Item>
            <label htmlFor={_} className='pl-5 cursor-pointer'>
              <Typography variant={'h5'}>{_}</Typography>
            </label>
          </div>
        ))}
      </RadioGroup.Root>
      <RadioGroup.Root
        onValueChange={(v) => setClass(v)}
        className='flex flex-wrap gap-8'
        name="content_class"
      >
         
        {registered ? (
        <>
          <div key='free' className='flex items-center cursor-pointer'>
            <RadioGroup.Item
              value='free'
              id='free'
              className='w-5 rounded-full  aria-checked:bg-[#B04141] aspect-square bg-accent'
            ></RadioGroup.Item>
            <label htmlFor='free' className='pl-5 cursor-pointer'>
              <Typography variant={'h5'}>Free</Typography>
            </label>
            </div>
            <div key='paid' className='flex items-center cursor-pointer'>
            <RadioGroup.Item
              value='paid'
              id='paid'
              className='w-5 rounded-full  aria-checked:bg-[#B04141] aspect-square bg-accent'
            ></RadioGroup.Item>
            <label htmlFor='paid' className='pl-5 cursor-pointer'>
              <Typography variant={'h5'}>Paid</Typography>
            </label>
          </div>
        {videoclass === 'paid' && (
          <input
            defaultValue={'0.00'}
            type='number'
            value={price}
            className='text-2xl bg-[#B04141] w-32 rounded-full outline-none text-center'
            onChange={updatePrice}
            name="ticketprice"
            id="rental-price"
          />
        )}
        </>
      ) : (
        <>
          <div key='free' className='flex items-center cursor-pointer'>
            <RadioGroup.Item
              value='free'
              id='free'
              className='w-5 rounded-full  aria-checked:bg-[#B04141] aspect-square bg-accent'
            ></RadioGroup.Item>
            <label htmlFor='free' className='pl-5 cursor-pointer'>
              <Typography variant={'h5'}>Free</Typography>
            </label>
            </div>
            <div key='paid' className='flex items-center cursor-pointer'>
            <RadioGroup.Item
              value='paid'
              id='paid'
              className='w-5 rounded-full  aria-checked:bg-[#B04141] aspect-square bg-accent'
              disabled
            ></RadioGroup.Item>
            <label htmlFor='paid' className='pl-5 cursor-pointer'>
              <Typography variant={'h5'}>Paid</Typography>
            </label>
          </div>
        {videoclass === 'paid' && (
          <input
            defaultValue={'0.00'}
            type='number'
            value={price}
            className='text-2xl bg-[#B04141] w-32 rounded-full outline-none text-center'
            onChange={updatePrice}
            name="ticketprice"
            id="rental-price"
          />
        )}
        </>
      
      )}

      </RadioGroup.Root>
      <Typography variant='h5' className='text-[#B04141] my-10'>
        For rentals : Please ensure that you have completed vendor registration
        under the Account settings.
      </Typography>
    </section>
    
  );
}



const data = ['Film', 'Series', 'Podcast', 'Tech', 'Vlog', 'Music', 'Other'];
