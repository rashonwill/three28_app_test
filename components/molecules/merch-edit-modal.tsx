'use client';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Typography from '../atoms/typography';
import Button from '../atoms/button';
import { useRef, useState, useEffect, useCallback } from 'react';
import _ from 'underscore';
import axios from "axios";
import Image from 'next/image';
import { Plus, Minus, ChevronLeft, ChevronRight, X } from 'lucide-react';
import $ from 'jquery';
import Input from '@/components/atoms/input';
import { InputEdit } from '@/components/atoms/input-edit';

export default function MerchEditModal({ children, products, setProducts }: { children: React.ReactNode, products: any[], setProducts: Function; }) {
  const productUpdate = useRef(null)	
  const [category, setCategory] = useState('');	
  const [name, setName] = useState('');	
  const [description, setDescription] = useState('');	
  const [quantity, setQuantity] = useState('');		
  const [price, setPrice] = useState('');
	
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [progress, setProgress] = useState({started: false, rate: 0});
  const [message, setMessage] = useState('');	


  const addColor = (event: any) => {
          if(event.keyCode == 13){
          setColors([...colors, event.target.value])  
           event.target.value = ""; 
      }
    };

  const removeColor = (colorEl: any) => {
    setColors(colors.filter((_, index) => index !== colorEl));
    
  }	

    const addSize = (event: any) => {
          if(event.keyCode == 13){
          setSizes([...sizes, event.target.value])  
           event.target.value = ""; 
      }
    };

  const removeSize = (sizeEl: any) => {
    setSizes(sizes.filter((_, index) => index !== sizeEl));
    
  }

       const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
        
      }	

	const updateDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
        
      }	

	const updateQty = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(event.target.value)
        
      }	

	const updatePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value)
      }	

	const updateCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value)
      }	

const getMyProducts = useCallback(async () => {
  let vendor_name = localStorage.getItem('channelName');
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(`https://fari-prod.herokuapp.com/api/store/myshop/${vendor_name}`,{
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

	
const updateProduct = async () => {
  
  try {
    let productid = localStorage.getItem('productID');
  const myToken = localStorage.getItem("fariToken");
	    
    const productData = {
        prod_category: category,
        prod_name: name,
        prod_description: description,
        prod_price: price,
        prod_quantity: quantity,
        prod_colors: JSON.stringify(colors),
        prod_sizes: JSON.stringify(sizes),
      }	 
	  
    setMessage('Updating...');
    setProgress((prevState: any) => {
      return {...prevState, started: true}
    })
    const response = await axios.put(`https://fari-prod.herokuapp.com/api/store/update/product/${productid}`, productData, {
      onUploadProgress: (progressEvent: any) => {setProgress((prevState: any) => {
        let percent = Math.round(progressEvent.progress*100)
             if(percent === 100) {
              setMessage('')
              setMessage('Wrapping things up... one moment')
             }                    
        return {...prevState, rate: Math.round(progressEvent.progress*100) }
      })},
      headers: {
        Authorization: `Bearer ${myToken}`,
	 'Content-Type': 'application/json',     
      }
      
    }).then(({ data }) => {
      setMessage('')
      setMessage('Update complete!'); 
	 getMyProducts();   
        return data;
      }); 
  }catch(error){
    setMessage('');
    setMessage('Oops! Update failed, please try again.')
    console.log(error)
  }
  
    
  }





const getProduct = useCallback(async () => {
  const myToken = localStorage.getItem("fariToken");
  const id = localStorage.getItem('productID');	
  try {
    const response = await fetch(`https://fari-prod.herokuapp.com/api/store/product-details/${id}`,{
      method: 'GET',  
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json();
    setCategory(data.product[0].prod_category)
    setName(data.product[0].prod_name)
    setDescription(data.product[0].prod_description)
    setQuantity(data.product[0].prod_quantity)
    setPrice(data.product[0].prod_price)	  	  
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
  }, []) 


	

useEffect(() => {
  getProduct();	
  }, [getProduct]);


	
  
  return (
	  <>
<form ref={productUpdate} id="productUpdate" encType="multipart/form-data" >
   <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 backdrop-blur' />
        <Dialog.Content className='fixed z-50 max-w-5xl m-auto overflow-hidden shadow-xl inset-10 h-max bg-background rounded-xl'>
          <ScrollArea.Root>
            <ScrollArea.Viewport className='h-[90vh] py-10 '>
              <div className='space-y-10'>
               <div className="left-pane flex flex-col">
                      <Typography variant="h5" className="m-4 self-center"> Select product category: </Typography>
                  <select id="categories" name="category" className="m-4 bg-neutral-200/[.3] outline-none w-[28rem] p-2 self-center dark:bg-[#171717] shadow-none rounded-2xl p-2 text-2xl" onChange={updateCategory} value={_.unescape(category)}>

                      <option value="accessories">Accessories</option>
                      <option value="apparel">Apparel</option>
                      <option value="art">Art</option>
                      <option value="books">Books</option>
		      <option value="course">Course</option> 	  
                      <option value="electronics">Electronics</option>
                      <option value="games">Games</option>
                      <option value="jewlery">Jewelry</option>      
                      <option value="misc">Misc</option>
                      <option value="music">Music</option>
                 </select>
		 <div className="flex flex-wrap justify-center">
                     <input type="text" placeholder="name" name="productName" id="name" value={_.unescape(name)} className="m-4 outline-none shadow-none bg-neutral-200/[.3] w-[28rem] dark:bg-[#171717] shadow-none rounded-2xl p-6 text-2xl " onChange={updateName}/>
                     <input type="text" placeholder="description" name="productDescription" id="description" value={_.unescape(description)} className="m-4 outline-none shadow-none bg-neutral-200/[.3] w-[28rem] dark:bg-[#171717] shadow-none rounded-2xl p-6 text-2xl " onChange={updateDescription} />
                     <input type="number" placeholder="quantity available" name="productQuantity" id="quantity" value={_.unescape(quantity)} 
			     className="m-4 outline-none shadow-none bg-neutral-200/[.3] w-[28rem] dark:bg-[#171717] shadow-none rounded-2xl p-6 text-2xl " 
			     onChange={updateQty}
			     />
                     <input type="number" step="0.1" placeholder="price" name="productPrice" id="price" value={_.unescape(price)}  
			     className="m-4 outline-none shadow-none bg-neutral-200/[.3] w-[28rem] dark:bg-[#171717] shadow-none rounded-2xl p-6 text-2xl " 
			     onChange={updatePrice}
			     />
		</div>	 
                </div>

                <div className="right-pane flex flex-col justify-center" >
                     <div className="sizes m-4">
                       <Typography variant="h5"> Enter size variants</Typography>
                     <div className="relative max-w-[62rem] mx-auto grow h-[15rem] bg-gray-200 dark:bg-[#171717] px-4 rounded-2xl pt-4">
                  <ul id="tags-list" className="flex flex-wrap ml-3.5 relative">
                    {sizes && sizes.map((size, index) => (
                      <li key={index} className="flex p-2.5 bg-zinc-500 m-1.5 rounded-full"><span className="mr-[5px] text-[22px] min-w-[2.5rem] h-[1.2rem] flex items-center justify-center ">{_.unescape(size)}</span>
                        <X size={16} color="#ffffff" className="cursor-pointer" onClick={() => removeSize(index)} /></li>
                    ))}
                    
                  <input
                    placeholder='Press enter to add size tag'
                    id="tags-input"
                    onKeyUp={addSize}
                    className="text-2xl outline-none bg-transparent flex w-[13rem]"
                  />
                    </ul>
                    
                </div>
              </div>
              <div className="colors m-4">
                     <Typography variant="h5"> Enter color variants</Typography>
                      <div className="relative max-w-[62rem] mx-auto grow h-[15rem] bg-gray-200 dark:bg-[#171717] px-4 rounded-2xl pt-4">
                  <ul id="tags-list" className="flex flex-wrap ml-3.5 relative">
                    {colors && colors.map((color, index) => (
                      <li key={index} className="flex p-2.5 bg-zinc-500 m-1.5 rounded-full"><span className="mr-[5px] text-[22px] min-w-[2.5rem] h-[1.2rem] flex items-center justify-center ">{_.unescape(color)}</span>
                        <X size={16} color="#ffffff" className="cursor-pointer" onClick={() => removeColor(index)} /></li>
                    ))}
                    
                  <input
                    placeholder='Press enter to add color tag'
                    id="tags-input"
                    onKeyUp={addColor}
                    className="text-2xl outline-none bg-transparent flex w-[13rem]"
                  />
                    </ul>
                    
                </div>
		      
             </div>
             </div>  
	    <div className="flex flex-col items-center justify-center gap-2 w-full h-[7rem] mt-[3rem]">
               {message && <span className="text-[1.5rem] text-[#050529] dark:text-[#fdfbf9]">{progress.rate}% complete </span>}
               {progress.started && <progress className="w-[32rem]" max="100" value={progress.rate}></progress>}
               {message && <span className="text-[1.5rem] text-[#050529] dark:text-[#fdfbf9]">{message}</span>}
             </div>   
  
  <div className='flex justify-center gap-5 pt-20'>
    <Button sm aria-label="update merch" onClick={updateProduct}>Update</Button>
     <Dialog.Close>
      <Button sm aria-label="close modal">Close</Button>
     </Dialog.Close>
  </div>


		      
            </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation='vertical' />
          </ScrollArea.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
	</form>  
	  
	  
	  </>
    
  );
}
