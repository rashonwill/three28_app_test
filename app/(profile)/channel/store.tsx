'use client';
import { ViewMerch } from '@/components/organisms/merch-viewer';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import _ from "underscore";
import Typography from '@/components/atoms/typography';
import Button from '@/components/atoms/button';
import Drawer from "./drawer";
import Image from "next/image";
import { Plus, Minus } from 'lucide-react';
import MerchDetailsModal from './merch-details-modal';


export default function Store(){
  const [count, setCount] = useState(0);
  const [quantity, setQty] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [productID, setProductID] = useState<number | undefined>();
  const FARI_API = 'https://fari-prod.herokuapp.com/api';
    const productInfo = (
    e: any,
    productid: any,
  ) => {
    setProductID(productid)
    localStorage.setItem('productID', productid);
    
  };  



    const setCartQty = () => {
    setCount(count + 1)
  }


  const decreaseQty = () => {
        if (quantity > 1) {
            setQty(quantity - 1);
        }
  }

  const increaseQty = () => {
       setQty(quantity + 1)
  }




  const getChannelProducts = useCallback(async () => {
  let vendor = localStorage.getItem("visitingChannelName");
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(`${FARI_API}/store/channelshop/${vendor}`,{
      method: 'GET',  
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json(); 
    setProducts(data.myProducts);
    return data.myProducts;
  } catch (error) {
    console.log(error);
  }
  }, []) 

	


  useEffect(() => {
    getChannelProducts();
  }, [getChannelProducts]); 

  return (
    <>
      <div className='container flex items-center gap-2 mb-12 select-none bg-transparent shadow-lg justify-end p-1'>
        <ShoppingCart size={32} onClick={() => setIsOpen(true)} className="cursor-pointer"/>
        <div className="bg-gray-300 rounded-full w-8 h-8 flex justify-center items-center dark:bg-neutral-200/[.2]">
          <Typography variant="h6">{count}</Typography>
        </div>
      </div>
      
      <div className="flex flex-start flex-wrap justify-center items-center mt-[3rem] ">
      {products && products.length > 0  ? products.map((product) => {
        return product.prod_quantity <= 0 ? (
          <>
          <div className="h-96 w-[18rem] max-w-sm md:max-w-lg p-4 flex flex-col justify-center items-center shadow-lg m-4 dark:shadow-[#171717] shadow-lg ">
           <div className="flex gap-1 items-center justify-center">
           <Typography variant="h5">{product.prod_name}</Typography>
           </div>
          
         <Image 
          className='w-full h-1/2'
          src={product.prod_img1 + '?format=webp'}
          alt='merch picture'  
           
         />
           <div className="mt-4">
          <Typography variant="h5">
         Price: ${product.prod_price}
         </Typography>
           </div>
          <button disabled className="text-[red] text-[2rem]">Out of Stock</button>
         </div>
          
          </>


        ) : (
          <>
            <div className="h-96 w-[18rem] max-w-sm md:max-w-lg p-4 flex flex-col justify-center items-center shadow-lg m-4 dark:shadow-[#171717] shadow-lg" onClick={(e) => productInfo(e, product.id )}>
           <div className="flex gap-1 items-center justify-center">
           <Typography variant="h5">{product.prod_name}</Typography>
           </div>
          
         <Image 
          className='w-full h-1/2'
          src={product.prod_img1 + '?format=webp'}
          alt='merch picture'
           
         />
           <div className="mt-4">
          <Typography variant="h5">
         Price: ${product.prod_price}
         </Typography>
           </div>
{/*           <Button sm accent className="mt-4" aria-label="add to cart" onClick={setCartQty}> Add to Cart</Button> */}
           <MerchDetailsModal count={count} setCount={setCount} productID={productID} setProductID={setProductID}>
          <Button sm accent className="mt-4" aria-label="view details"> View Details</Button>
           </MerchDetailsModal>
         </div>
          </>
 
        )
         
      }) : <Typography variant='h4' className='text-gray-400'>No merchandise yet.</Typography>}
             
      </div>


      
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} count={count} setCount={setCount}>
      </Drawer>
    

    </>
  )

  
}
