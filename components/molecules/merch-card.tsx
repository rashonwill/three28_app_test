import Typography from '../atoms/typography';
import Button from '../atoms/button';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { Info } from 'lucide-react';
import { useRef, useState, useEffect, useCallback , HtmlHTMLAttributes } from 'react';



interface CompType {
    price: string;
    title: string;
    poster: string;
    count: number;
    setCount: Function;
    outofStock?: boolean;	
}

export default function MerchCard({
  poster,
  title,
  price,
  count,
  setCount, 
  outofStock, 
  ...props 
  }: HtmlHTMLAttributes<HTMLDivElement> & CompType)  {
  
  const setCartQty = () => {
    setCount(count + 1)
  }

  return(
    <>

      {outofStock ? (
      
      <>
        <section className=''> 
         <div className="h-96 max-w-sm md:max-w-lg p-4 flex flex-col justify-center items-center shadow-lg m-4 dark:shadow-[#171717] shadow-lg ">
           <div className="flex gap-1 items-center justify-center">
           <Typography variant="h5">{title}</Typography><Info />
           </div>
          
         <Image 
          className='w-full h-1/2'
          src={poster}
          alt='merch picture'  
          loading='lazy'   
           
         />
           <div className="mt-4">
          <Typography variant="h5">
         Price: ${price}
         </Typography>
           </div>
          <button disabled className="text-[red] text-[2rem]">Out of Stock</button>
         </div>
          
       
       </section>
      
      </>
    
      ) : (
      
      <>
        <section className=''> 
         <div className="h-96 max-w-sm md:max-w-lg p-4 flex flex-col justify-center items-center shadow-lg m-4 dark:shadow-[#171717] shadow-lg ">
           <div className="flex gap-1 items-center justify-center">
           <Typography variant="h5">{title}</Typography>
           </div>
          
         <Image 
          className='w-full h-1/2'
          src={poster}
          alt='merch picture'  
           
         />
           <div className="mt-4">
          <Typography variant="h5">
         Price: ${price}
         </Typography>
           </div>
          <Button sm accent className="mt-4" aria-label="add to cart" onClick={setCartQty}> Add to Cart</Button>
          <Button sm accent className="mt-4" aria-label="view details"> View Details</Button>
         </div>
          
       
       </section>
      </>
    
    
    )}

    
    </>
  )
}
