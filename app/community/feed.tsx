import React from "react";
import axios from "axios";
import _ from "underscore";
import { useState, useEffect, useCallback } from "react";
import Typography from '@/components/atoms/typography';
import Button from '@/components/atoms/button';
import { PenLine } from 'lucide-react';

export default function Feed(){

return (
      <>
            <div className='flex gap-1.5 -translate-y-1/2 max-lg:hidden'>
            <Button accent className='flex items-center gap-2'>New Post <PenLine /></Button>
            </div>
        <Typography variant='h3' className='max-lg:text-center text-[#171717] text-center max-lg:mt-44 mt-4rem dark:text-[#fdfbf9]'>
        FEEDS!
      </Typography>
      
      </>
    
)

  
}
