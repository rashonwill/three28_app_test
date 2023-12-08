import React from "react";
import axios from "axios";
import _ from "underscore";
import { useState, useEffect, useCallback } from "react";
import Typography from '@/components/atoms/typography';
import Image from 'next/image';


export default function Home(){

return (
          <>
          <div className="flex rounded-2xl overflow-hidden shadow-md w-full h-1/4 dark:bg-[#323232]">
                    
            <div className="flex w-1/2 h-full justify-center items-center">
            <Typography variant='h2' className='max-lg:text-center text-[#171717] text-center max-lg:mt-44 mt-4rem dark:text-[#fdfbf9]'>Welcome to the Three28 community!</Typography>
          </div>
            
          <Image
        src={'/assets/images/Android.png'}
        alt='welcome photo'
        className="w-1/2 h-full"
        />
          </div>
          </>


)

  
}
