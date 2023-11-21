 'use client';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Typography from '@/components/atoms/typography';
import Button from '@/components/atoms/button';
import { useRef, useState, useEffect, useCallback } from 'react';
import _ from 'underscore';
import axios from "axios";
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import $ from 'jquery';
import Input from '@/components/atoms/input';

export default function MerchModal({ 
   children, 
   count, 
   setCount, 
   productID, 
   setProductID, 
 }: { 
   children: React.ReactNode; 
   count: number; 
   setCount: Function; 
   productID: number; 
   setProductID: Function; 
 }) {
  const [quantity, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [status, setStatus] = useState('Add to Cart');
  const [product, setProduct] = useState([]);
  const [sizes, setSizes] = useState<string[]>();
  const [colors, setColors] = useState<string[]>();	
  const [premiereImg, setImage] = useState('');
  const [img2, setImage2] = useState('');
  const [img3, setImage3] = useState('');
  const [img4, setImage4] = useState('');
  const [name, setName] = useState('');	
  const [description, setDescription] = useState('');	
  const FARI_API = 'https://fari-prod.herokuapp.com/api';	
	
	
  const setCartQty = () => {
    setCount(count + 1)
    setStatus('Added to Cart!')	  
    }


  const decreaseQty = () => {
        if (quantity > 1) {
           setQty(quantity - 1);
           calculateSubTotal();
	   
        }
	 	
  }

  const increaseQty = () => {
   if (quantity == 1 || quantity > 1) {
	setQty(quantity + 1)
        calculateSubTotal();	          
       }	     
  }

 const calculateSubTotal = useCallback(async () => {
	let total = price * quantity;
        setSubtotal(total) 
  }, [quantity, price])

   const photo1 = () => {
         let newDisplayImage = $('#photo1').attr('srcset');
	 $('#photo1').css('border', '3px solid black')
	 $('#photo2').css('border', 'none')
	 $('#photo3').css('border', 'none')
	 $('#photo4').css('border', 'none')
	$('#viewingImg').attr('srcset', '');
	$('#viewingImg').attr('srcset', newDisplayImage);
    }

    const photo2 = () => {
         let newDisplayImage = $('#photo2').attr('srcset');
	 $('#photo1').css('border', 'none')
	 $('#photo2').css('border', '3px solid black')
	 $('#photo3').css('border', 'none')
	 $('#photo4').css('border', 'none')
	$('#viewingImg').attr('srcset', '');
	$('#viewingImg').attr('srcset', newDisplayImage);
   }

const photo3 = () => {
let newDisplayImage = $('#photo3').attr('srcset');
	 $('#photo1').css('border', 'none')
	 $('#photo2').css('border', 'none')
	 $('#photo3').css('border', '3px solid black')
	 $('#photo4').css('border', 'none')
	$('#viewingImg').attr('srcset', '');
	$('#viewingImg').attr('srcset', newDisplayImage);
  };
	
	
const photo4 = () => {

let newDisplayImage = $('#photo4').attr('srcset');
	 $('#photo1').css('border', 'none')
	 $('#photo2').css('border', 'none')
	 $('#photo3').css('border', 'none')
	 $('#photo4').css('border', '3px solid black')
	$('#viewingImg').attr('srcset', '');
	$('#viewingImg').attr('srcset', newDisplayImage);
  };


	

const setCartItem = async() => {
let chosenColor = $('#color :selected').text();
let chosenSize = $('#size :selected').text();	
let viewQTY = JSON.parse(localStorage.getItem('purchasingQty'))	
let viewTotal = JSON.parse(localStorage.getItem('cartTotal'))

let newItem = {
productid: localStorage.getItem('productID'),
name: name + ' | ' + (chosenColor) + ' | ' + (chosenSize),
description: description,		
vendorid: localStorage.getItem('sellerID'),
vendor: localStorage.getItem('visitingChannelName'),	
quantity: quantity ? quantity : 1,
color: chosenColor ? chosenColor : 'One Color',
size:  chosenSize ? chosenSize : 'One Size',
image: premiereImg,
price: price,
total: subtotal ? subtotal : price,
customer_name: localStorage.getItem('userUsername'),	
}

let myItems = JSON.parse(localStorage.getItem('MyCartItems'))		
if(!myItems){
myItems = [newItem]
localStorage.setItem('MyCartItems', JSON.stringify(myItems))	
}else if(myItems){
myItems = [...myItems, newItem]
localStorage.setItem('MyCartItems', JSON.stringify(myItems))
}


};
	

	

const getProduct = useCallback(async () => {
  const myToken = localStorage.getItem("fariToken");
  const id = localStorage.getItem('productID')	
  try {
    const response = await fetch(`${FARI_API}/store/product-details/${id}`,{
      method: 'GET',  
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json();
    setName(data.product[0].prod_name)
    setDescription(data.product[0].prod_description)
    
    setPrice(data.product[0].prod_price);
    setSubtotal(data.product[0].prod_price);
    setProduct(data.product);
	  
    setImage(data.product[0].prod_img1);
    setImage2(data.product[0].prod_img2);
    setImage3(data.product[0].prod_img3); 
    setImage4(data.product[0].prod_img4);	  
	  
	  
    let productColors = data.product[0].prod_colors;
    let productSizes = 	data.product[0].prod_sizes;
	  
    let colorList: string[] = [];	  
    let usingSplits = productColors.split(',')
        usingSplits.forEach((colorEl: any) => {
	let newString = colorEl.toString().replace("[&quot;", "").replace("&quot;]", "").replaceAll("&quot;", "").trim();
	colorList.push(newString)			
    })	  
    setColors(colorList)

     let sizeList: string[] = [];
        let usingSplit = productSizes.split(',')
        usingSplit.forEach((sizeEl: any) => {
	let newStrings = sizeEl.toString().replace("[&quot;", "").replace("&quot;]", "").replaceAll("&quot;", "").trim();
	sizeList.push(newStrings)			
    })		  
    setSizes(sizeList)	
    	  
    return data.product;
  } catch (error) {
    console.log(error);
  }
  }, [productID])



useEffect(() => {
      getProduct().then(calculateSubTotal);	
  }, [getProduct, calculateSubTotal]);

  
  return (
	  <>
   <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 backdrop-blur' />
        <Dialog.Content className='fixed z-50 max-w-5xl m-auto overflow-hidden shadow-xl inset-10 h-max bg-background rounded-xl'>
          <ScrollArea.Root>
            <ScrollArea.Viewport className='h-[90vh] py-10 '>
              <div className='space-y-10'>
              
  <div className="content flex w-full h-full p-8">
	  
  <div className="product-info w-1/3 flex flex-col m-4 items-center text-center ">
      <Typography variant="h2" className="">{_.unescape(name)}</Typography>
      <Typography variant="h5" className="m-4">{_.unescape(description)}</Typography>
      <Typography variant="h4" className="m-4"> Price: ${price}</Typography>
    </div>
	  
    <div className="images w-2/5 h-full">
	    
      <div className="lg-image mt-[5rem]">
        <Image id="viewingImg" src={premiereImg + '?format=webp'} alt="product image" className="w-full h-full"/>
      </div>
      
     <div className="sm-images flex justify-center items-center mt-60 w-full">
      <Image id="photo1" src={premiereImg + '?format=webp'} alt="product-image" width={100} height={100} className="m-8 w-20 h-20 shadow-lg border-4 border-slate-800" onClick={() => photo1()} />
      <Image id="photo2" src={img2 + '?format=webp'} alt="product-image" width={100} height={100} className="m-8 w-20 h-20 shadow-lg" onClick={() => photo2()} />
      <Image id="photo3" src={img3 + '?format=webp'} alt="product-image" width={100} height={100} className="m-8 w-20 h-20 shadow-lg" onClick={() => photo3()} />
      <Image id="photo4" src={img4 + '?format=webp'} alt="product-image" width={100} height={100} className="m-8 w-20 h-20 shadow-lg" onClick={() => photo4()} />
   </div>
	    
    </div>
	  
    <div className="purchase-form w-1/3 flex flex-col m-4 items-center h-full">
	    
      <div className="size flex flex-col justify-center items-center">
        <Typography variant="h4">Select Size</Typography>
       <select id="size" className="bg-gray-100 w-32 p-2 dark:bg-neutral-200/[.3]">
	       <option>Select Size</option>
	       {sizes && sizes.map((size, index) => (
		 <option key={index}>{_.unescape(size)}</option>	   
	       ))}	       

    </select>
      </div>
	    
      <div className="color flex flex-col justify-center items-center m-4">
       <Typography variant="h4"> Select Color</Typography>
       <select id="color" className="bg-gray-100 w-32 p-2 dark:bg-neutral-200/[.3]">
      <option>Select Color</option>
	       	{colors && colors.map((color, index) => (
		 <option key={index}>{_.unescape(color)}</option>	   
	       ))}
      </select>
      </div>
	    
      <div className="quantity flex flex-col justify-center items-center m-4">
        <Typography variant="h4">Choose Quantity</Typography>
        <div className="flex m-4 items-center">
         <Minus onClick={decreaseQty} className="cursor-pointer" />
          <input
            value={quantity}
	    onChange={calculateSubTotal}	  
            type='number'
            className='text-2xl w-20 rounded-full outline-none text-center bg-gray-100 mx-2 dark:bg-neutral-200/[.3]'
          /> 
        
	<Plus onClick={increaseQty} className="cursor-pointer" />
        </div>
      </div>
	    
      <div className="checkout flex flex-col justify-center items-center mt-8">
        <Typography variant="h3" id="subtotal">Subtotal: ${subtotal}</Typography>
        <Button accent className="h-[40px] text-[30px]" onClick={() => {setCartQty(); setCartItem();}}> {status} </Button>
      </div>
	    
    </div>
   
		   

   </div>
  <div className='flex justify-center gap-5'>
     <Dialog.Close>
      <Button accent sm aria-label="close modal">Close</Button>
     </Dialog.Close>
  </div>


		      
            </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation='vertical' />
          </ScrollArea.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
	  
	  
	  
	  </>
    
  );
}
