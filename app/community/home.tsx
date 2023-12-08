import React from "react";
import axios from "axios";
import _ from "underscore";
import { useState, useEffect, useCallback } from "react";
import Typography from '@/components/atoms/typography';
import Image from 'next/image';


export default function Home(){

return (
          <>
          <div className="flex rounded-base overflow-hidden shadow-card w-full h-1/4">
                    
            <div className="flex-1">
            <Typography variant='h2' className='max-lg:text-center text-[#171717] text-center max-lg:mt-44 mt-4rem dark:text-[#fdfbf9]'>Welcome to the Three28 community!</Typography>
          </div>
            
            <Image
        src={'/assets/images/logo.svg'}
        alt='welcome photo'
        className="w-full h-full"
      />
          </div>
          </>


)

  
}
