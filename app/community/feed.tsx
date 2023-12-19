import React from "react";
import axios from "axios";
import _ from "underscore";
import { useState, useEffect, useCallback } from "react";
import Typography from '@/components/atoms/typography';
import Button from '@/components/atoms/button';
import { PencilLine } from 'lucide-react';

export default function Feed(){

return (
      <>
            <div className="w-full h-[10rem]">
            <Button accent className='flex items-center gap-2'>New Post <PencilLine /></Button>
            </div>
        <Typography variant='h3' className='max-lg:text-center text-[#171717] text-center max-lg:mt-44 mt-4rem dark:text-[#fdfbf9]'>
        FEEDS!
      </Typography>
      
      </>
    
)

  
}
