import React from 'react';
import Typography from '@/components/atoms/typography';
import Link from 'next/link';

export default function OrderComplete() {


  // const goBack = () => {
  //  window.location.href = "/";
  // }	


  return(
    <>
      <div className="flex flex-col justify-center items-center m-[1rem] mt-[5rem]">
        <Typography variant="h3">Thank you for your purchase! Your video has been added to your watchlist!</Typography>
        <Typography variant="h4">The video will be available for 72 hours after first playback.</Typography>
      <div>
	<Link  href={`/`} aria-label="Go back home" >
	<Typography variant="h6">Back to Explorer</Typography>
	</Link>
     </div>	
      </div>
    
    </>
  )
  
}

