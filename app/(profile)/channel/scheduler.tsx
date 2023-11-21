 'use client';
import React from 'react';
import Typography from '@/components/atoms/typography';
import Link from 'next/link';
import { useEffect } from "react";
import Button from '@/components/atoms/button';
import ScheduleModal from './scheduler-modal';

export default function Scheduler() {
	


	
  return(
    <>
      <div className="flex flex-col justify-center items-center m-[1rem] mt-[5rem]">
        <ScheduleModal>
        <Button accent>Request a meeting</Button>
        </ScheduleModal>
        
      </div>
    
    </>
  )
  
}
