import React from "react";
import axios from "axios";
import _ from "underscore";
import { useState, useEffect, useCallback } from "react";
import Typography from '@/components/atoms/typography';
import Image from 'next/image';


export default function Home(){

return (
          <>
          <div className="flex rounded-2xl overflow-hidden shadow-md w-full h-2/5 dark:bg-[#0D0D0D]">
                    
            <div className="flex w-1/2 h-full justify-center items-center">
            <Typography variant='h2' className='max-lg:text-center text-[#171717] text-center max-lg:mt-44 mt-4rem dark:text-[#fdfbf9]'>Welcome to the Three28 community!</Typography>
          </div>
            
          <Image
        src={'/assets/images/Android.png'}
        alt='welcome photo'
        className="w-1/2 h-full"
        />
          </div>
                    <Typography variant='h3' className='max-lg:text-center text-[#171717] text-left m-5 max-lg:mt-44 mt-4rem dark:text-[#fdfbf9]'>Community Rules</Typography>
                    <div className="flex w-full justify-center items-center">
                    <div className="rounded-2xl overflow-hidden shadow-md max-w-md p-4 dark:bg-[#0D0D0D]">
                    <Typography variant='h3' className='max-lg:text-center text-[#171717] text-center max-lg:mt-44 mt-4rem dark:text-[#fdfbf9]'>R.E.S.P.E.C.T!</Typography>
                     <Typography variant='h4' className='max-lg:text-center text-[#171717] text-center max-lg:mt-44 mt-4rem dark:text-[#fdfbf9]'>We prioritize respect! Be respectful of the platform and it's memmbers, no hate speech, promotion of violence, or any inapproriate content.</Typography>
                    </div>
                     <div className="rounded-2xl overflow-hidden shadow-md max-w-md p-4 dark:bg-[#0D0D0D]">
                     <Typography variant='h3' className='max-lg:text-center text-[#171717] text-center max-lg:mt-44 mt-4rem dark:text-[#fdfbf9]'>No Spam!</Typography>
                     <Typography variant='h4' className='max-lg:text-center text-[#171717] text-center max-lg:mt-44 mt-4rem dark:text-[#fdfbf9]'>It's ok to promote, but do not spam the community.</Typography>
                     </div>         
                    
                    </div>
          </>


)

  
}
