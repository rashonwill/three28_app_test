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

export default function MerchUploadModal({ children, products, setProducts, }: { children: React.ReactNode, products: any[], setProducts: Function; }) {
  const productUpload = useRef(null);
  const [category, setCategory] = useState('');
  const [premiere, setPremiere] = useState<string | null>(null);
  const [detail1, setDetail1] = useState<string | null>(null);
  const [detail2, setDetail2] = useState<string | null>(null);
  const [detail3, setDetail3] = useState<string | null>(null);	
  const premiereRef = useRef<HTMLInputElement>(null);
  const detail1Ref = useRef<HTMLInputElement>(null);
  const detail2Ref = useRef<HTMLInputElement>(null);
  const detail3Ref = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');	
  const [description, setDescription] = useState('');	
  const [quantity, setQuantity] = useState('');		
  const [price, setPrice] = useState('');	
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
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

    function premiereImage(e: any, start: any) {
     e.preventDefault();  
    let reader = new FileReader();
    let file = e.target.files[0]!;
    let slice_size = 1000 * 1024;
    
    let next_slice = start + slice_size + 1;
    let blob = file.slice(start, next_slice);
    let url = URL.createObjectURL(file); 
    setPremiere(e.target.files[0])
    reader.onloadend = function (event: any) {
        $('#premiere').attr("src", url);
    
  };
  reader.readAsDataURL(blob);
   

};	

    function detail1Image(e: any, start: any) {
     e.preventDefault();  
    let reader = new FileReader();
    let file = e.target.files[0]!;
    let slice_size = 1000 * 1024;
    
    let next_slice = start + slice_size + 1;
    let blob = file.slice(start, next_slice);
    let url = URL.createObjectURL(file); 
    setDetail1(e.target.files[0])
    reader.onloadend = function (event: any) {
    $('#detail1').attr("src", url);
  };
  reader.readAsDataURL(blob);
    

};	

    function detail2Image(e: any, start: any) {
     e.preventDefault();  
    let reader = new FileReader();
    let file = e.target.files[0]!;
    let slice_size = 1000 * 1024;
    
    let next_slice = start + slice_size + 1;
    let blob = file.slice(start, next_slice);
    let url = URL.createObjectURL(file); 
    setDetail2(e.target.files[0])
    reader.onloadend = function (event: any) {
       $('#detail2').attr("src", url);
    
  };
  reader.readAsDataURL(blob);
    

};	

    function detail3Image(e: any, start: any) {
     e.preventDefault();  
    let reader = new FileReader();
    let file = e.target.files[0]!;
    let slice_size = 1000 * 1024;
    
    let next_slice = start + slice_size + 1;
    let blob = file.slice(start, next_slice);
    let url = URL.createObjectURL(file); 
    setDetail3(e.target.files[0])
    reader.onloadend = function (event: any) {
       $('#detail3').attr("src", url);
    
  };
  reader.readAsDataURL(blob);
    

};	





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

async function getUserProfile(){
const myToken = localStorage.getItem("fariToken"); 	
  try {
    const response = await fetch(`https://fari-prod.herokuapp.com/api/users/myprofile`,{
      method: 'GET',  
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${myToken}`
      },
    })
    const data = await response.json();
    return data.profile;
  } catch (error) {
    console.log('Oops Something Went Wrong! Could not get that user.');
  }


} 


const upload = async () => {
  const myToken = localStorage.getItem("fariToken"); 	
  const product_category = category;
  const prod_name = name;
  const prod_description = description;
  const prod_price = price;
  const prod_quant = quantity;
  const color1 = JSON.stringify(colors);
  const size1 = JSON.stringify(sizes);	
  
  let premiereImg = premiere;
  let details1 = detail1;
  let details2 = detail2;
  let details3 = detail3;	

  try {
  let profile = await getUserProfile(); 
	  let vendor = profile[0].vendorid; 
	  let vendorname = profile[0].channelname; 
	  let vendor_email = profile[0].email;
	  let stripe_acctid = profile[0].stripe_acctid;

    const formData = new FormData(productUpload.current!);
    formData.append('vendorname', vendorname);	  
    formData.append('vendorid', vendor);
    formData.append('vendor_email', vendor_email); 
    formData.append('stripe_acctid', stripe_acctid);
    formData.append('category', product_category)
    formData.append('productName', prod_name)
    formData.append('productDescription', prod_description)
    formData.append('productPrice', prod_price)
    formData.append('productQuantity', prod_quant)  
    formData.append('colors', color1)
    formData.append('sizes', size1)
    formData.append('premiere', premiereImg)
    formData.append('detail1', details1)
    formData.append('detail2', details2)
    formData.append('detail3', details3)
	  
    setMessage('Uploading...');
    setProgress((prevState: any) => {
      return {...prevState, started: true}
    })
    const response = await axios.post(`https://fari-prod.herokuapp.com/api/store/products/new`, formData, {
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
      }
      
    }).then(({ data }) => {
      setMessage('')
      setMessage('Upload complete!');
      getMyProducts();	    
        return data;
      }); 
  }catch(error){
    setMessage('');
    setMessage('Oops! Upload failed, please try again.')
    console.log(error)
  }
  
    
  }



  
  return (
	  <>
  <form ref={productUpload} id="productUpload" encType="multipart/form-data" className="p-4">
          <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 backdrop-blur' />
        <Dialog.Content className='fixed z-50 max-w-5xl m-auto overflow-hidden shadow-xl inset-10 h-max bg-background rounded-xl self-center'>
          <ScrollArea.Root>
            <ScrollArea.Viewport className='h-[90vh] py-10 '>
               <Tabs.Root defaultValue='1' className=''>
                  <Tabs.Content value='1' className='space-y-10 '>
                <div className="left-pane flex flex-col">
                      <Typography variant="h5" className="m-4 self-center"> Select product category: </Typography>
                  <select id="categories" name="category" className="m-4 bg-neutral-200/[.3] outline-none w-[28rem] p-2 self-center dark:bg-[#171717] shadow-none rounded-2xl p-2 text-2xl" onChange={updateCategory}>
                      <option value="none">Not Selected</option>
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
                     <input type="text" placeholder="name" name="productName" id="name" value={name} className="m-4 outline-none shadow-none bg-neutral-200/[.3] w-[28rem] dark:bg-[#171717] shadow-none rounded-2xl p-6 text-2xl " onChange={updateName}/>
                     <input type="text" placeholder="description" name="productDescription" id="description" value={description} className="m-4 outline-none shadow-none bg-neutral-200/[.3] w-[28rem] dark:bg-[#171717] shadow-none rounded-2xl p-6 text-2xl " onChange={updateDescription} />
                     <input type="number" placeholder="quantity available" name="productQuantity" id="quantity" value={quantity} 
			     className="m-4 outline-none shadow-none bg-neutral-200/[.3] w-[28rem] dark:bg-[#171717] shadow-none rounded-2xl p-6 text-2xl " 
			     onChange={updateQty}
			     />
                     <input type="number" step="0.1" placeholder="price" name="productPrice" id="price" value={price}  
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
                    {sizes.map((size, index) => (
                      <li key={index} className="flex p-2.5 bg-zinc-500 m-1.5 rounded-full"><span className="mr-[5px] text-[22px] min-w-[2.5rem] h-[1.2rem] flex items-center justify-center ">{size}</span>
                        <X size={16} color="#ffffff" className="cursor-pointer" onClick={() => removeSize(index)} /></li>
                    ))}
                    
                  <input
                    placeholder='Press enter to add size tag'
                    id="tags-input"
                    onKeyUp={addSize}
                    className="text-2xl outline-none bg-transparent flex"
                  />
                    </ul>
                    
                </div>
              </div>
              <div className="colors m-4">
                     <Typography variant="h5"> Enter color variants</Typography>
                      <div className="relative max-w-[62rem] mx-auto grow h-[15rem] bg-gray-200 dark:bg-[#171717] px-4 rounded-2xl pt-4">
                  <ul id="tags-list" className="flex flex-wrap ml-3.5 relative">
                    {colors.map((color, index) => (
                      <li key={index} className="flex p-2.5 bg-zinc-500 m-1.5 rounded-full"><span className="mr-[5px] text-[22px] min-w-[2.5rem] h-[1.2rem] flex items-center justify-center ">{color}</span>
                        <X size={16} color="#ffffff" className="cursor-pointer" onClick={() => removeColor(index)} /></li>
                    ))}
                    
                  <input
                    placeholder='Press enter to add color tag'
                    id="tags-input"
                    onKeyUp={addColor}
                    className="text-2xl outline-none bg-transparent flex"
                  />
                    </ul>
                    
                </div>
		      
             </div>
             </div>   
                   
                   
                   </Tabs.Content>
                    <Tabs.Content value='2'>
		   <Typography variant='h5' className="m-4">Select Product Images</Typography>
		<div className="flex flex-wrap justify-center items-center">
			
	    <div className='relative w-80 m-4 bg-neutral-200/[.3] dark:bg-[#171717]'>
              <Image
                  onClick={() => premiereRef.current?.click()}
                  className='absolute cursor-pointer right-5 bottom-1'
                  src={`/assets/images/camera.svg`}
                  alt=''
                  width={76}
                  height={76}
                />
                <input
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) =>
		    premiereImage(e, 0)	  
                    // setPremiere(URL.createObjectURL(e.target.files?.[0]!))
                  }
                  ref={premiereRef}
                  className='hidden'
                  type='file'
		  name="premiere"	
                />
                <img
                  className='object-cover w-full h-96'
                  src={premiere}
                  alt='product premiere image'
		  id="premiere"	
                />
	     </div>

	    <div className='relative w-80 m-4 bg-neutral-200/[.3] dark:bg-[#171717] '>
              <Image
                  onClick={() => detail1Ref.current?.click()}
                  className='absolute cursor-pointer right-5 bottom-1'
                  src={`/assets/images/camera.svg`}
                  alt=''
                  width={76}
                  height={76}
                />
                <input
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) =>
		   detail1Image(e, 0)		  
                    // setDetail1(URL.createObjectURL(e.target.files?.[0]!))
                  }
                  ref={detail1Ref}
                  className='hidden'
                  type='file'
		  name="detail1"	
                />
                <img
                  className='object-cover w-full h-96'
                  src={detail1}
                  alt='product detail image 1'
		  id="detail1" 	
                />
	     </div>	

	   
	    <div className='relative w-80 m-4 bg-neutral-200/[.3] dark:bg-[#171717] '>
              <Image
                  onClick={() => detail2Ref.current?.click()}
                  className='absolute cursor-pointer right-5 bottom-1'
                  src={`/assets/images/camera.svg`}
                  alt=''
                  width={76}
                  height={76}
                />
                <input
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) =>
		    detail2Image(e, 0)	  
                    // setDetail2(URL.createObjectURL(e.target.files?.[0]!))
                  }
                  ref={detail2Ref}
                  className='hidden'
                  type='file'
		  name="detail2"	
                />
                <img
                  className='object-cover w-full h-96'
                  src={detail2}
                  alt='product detail image 2'
		  id="detail2" 		
                />
	     </div>	

		
	    <div className='relative w-80 m-4 bg-neutral-200/[.3] dark:bg-[#171717]'>
              <Image
                  onClick={() => detail3Ref.current?.click()}
                  className='absolute cursor-pointer right-5 bottom-1'
                  src={`/assets/images/camera.svg`}
                  alt=''
                  width={76}
                  height={76}
                />
                <input
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) =>
		    detail3Image(e, 0)	  
                    // setDetail3(URL.createObjectURL(e.target.files?.[0]!))
                  }
                  ref={detail3Ref}
                  className='hidden'
                  type='file'
		  name="detail3"	
                />
                <img
                  className='object-cover w-full h-96'
                  src={detail3}
                  alt='product detail image 3'
		  id="detail3" 		
                />
	     </div>	
			    
	   </div>

             <div className="flex flex-col items-center justify-center gap-2 w-full h-[7rem] mt-[3rem]">
               {message && <span className="text-[1.5rem] text-[#050529] dark:text-[#fdfbf9]">{progress.rate}% complete </span>}
               {progress.started && <progress className="w-[32rem]" max="100" value={progress.rate}></progress>}
               {message && <span className="text-[1.5rem] text-[#050529] dark:text-[#fdfbf9]">{message}</span>}
             </div>
           

	      <div className='flex justify-center gap-5 pt-20 mb-40'>
		  <Button sm aria-label="upload product" className="dark:text-[#fdfbf9]" onClick={upload}>Upload</Button>    
                <Dialog.Close>
                  <Button sm aria-label="close modal" className="dark:text-[#fdfbf9]">Close</Button>
                </Dialog.Close>
	          			  
              </div>    
        
	</Tabs.Content>
  
  



		      
           <Tabs.List className='absolute bottom-0 flex justify-center w-full gap-6 py-4 bg-background justify-self-end'>
                  {['1', '2'].map((_) => (
                    <Tabs.Trigger
                      key={_}
                      className='flex items-center gap-4 group'
                      value={_}
                    >
                      {_ === '1' && (
                        <ChevronLeft size={32} className='text-secondary' />
                      )}
                      <Typography
                        variant='h6'
                        className='group-aria-selected:underline'
                      >
                        {_}
                      </Typography>
                      {_ === '2' && (
                        <ChevronRight size={32} className='text-secondary' />
                      )}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
              </Tabs.Root>
                 
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


const data = [
  { icon: '/assets/images/video.svg', label: 'Video Upload' },
  { icon: '/assets/images/thumb.svg', label: 'Thumbnail Upload' },
];
