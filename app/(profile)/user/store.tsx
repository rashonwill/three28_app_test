'use client';
import { ShoppingCart, MoreHorizontal } from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import _ from "underscore";
import Typography from '@/components/atoms/typography';
import Button from '@/components/atoms/button';
import MerchUploadModal from '@/components/molecules/merch-upload-modal';
import * as Popover from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';
import MerchEditModal from '@/components/molecules/merch-edit-modal';

export default function Store(){
const [products, setProducts] = useState([]);
const FARI_API = 'https://fari-prod.herokuapp.com/api';
// const FARI_API = 'https://www.fariapi.com/api';
  const productInfo = (
    e: any,
    productid: any,
  ) => {
    localStorage.setItem('productID', productid);
  };  

const getMyProducts = useCallback(async () => {
  let vendor_name = localStorage.getItem('channelName');
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(`${FARI_API}/store/myshop/${vendor_name}`,{
      method: 'GET',  
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${myToken}`
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
    getMyProducts();
  }, [getMyProducts]); 

  return (
    <>
      <div className="container flex items-center justify-end mb-12 select-none bg-background">
          <div className=''>
            <MerchUploadModal products={products} setProducts={setProducts}>
            <Button accent> Add Product</Button>
            </MerchUploadModal>
            
          </div>
    </div>

      <div className="flex flex-start flex-wrap justify-center align-center mt-[3rem]">
        {products && products.length > 0 ? (
         products.map((product) => {
        return (
           <>
            <div className="card w-[28rem] h-[28rem] m-4 p-4 relative text-center dark:shadow-[#171717] shadow-lg" onClick={(e) => productInfo(e, product.id )}>
    <Popover.Root>
        <Popover.Trigger
          className={cn('absolute right-4 top-1')}
        >
          <MoreHorizontal className='text-[#171717] dark:text-[#FDFBF9]' size={32} />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className='px-8 py-2 text-white cursor-pointer rounded-3xl bg-black/70 '>
            <MerchEditModal products={products} setProducts={setProducts}>
          <div className="options">
            <ul>
           <li><Typography variant="h4">Edit</Typography></li>
            </ul>
          </div>
           </MerchEditModal>   
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
  
  <div className="product-images flex m-4">
  <img loading="lazy" id="lg-photo" src={product.prod_img1 + '?format=webp'} alt="product-image" className="w-32 h-32" />
    <div className="small-product-images flex m-4">
    <img loading="lazy" id="sm-photo" src={product.prod_img2 + '?format=webp'} alt="product-image" className="w-16 h-16 m-2"/>  
    <img loading="lazy" id="sm-photo" src={product.prod_img3 + '?format=webp'} alt="product-image" className="w-16 h-16 m-2" /> 
    <img loading="lazy" id="sm-photo" src={product.prod_img4 + '?format=webp'} alt="product-image" className="w-16 h-16 m-2" /> 
    </div>
  </div>
  <div className="product-info">
  <Typography variant="h4" className="m-4">{product.prod_name}</Typography>
    <Typography variant="h5">In Stock: <span id="stock">{product.prod_quantity}</span></Typography>
    <Typography variant="h5">Category: {product.prod_category}</Typography>
    <Typography variant="h5">Price: ${product.prod_price}</Typography>
  </div>
</div>
           
           </>  
           
         )})
           
          ) : (
         <Typography variant='h4' className='text-gray-400'>
              {' '}
              No merchandise yet.{' '}
            </Typography>)}

      </div>
    

    </>
  )

  
}
