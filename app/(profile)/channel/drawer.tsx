import { useState, useEffect, useCallback } from "react";
import Typography from '@/components/atoms/typography';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import './drawer.scss';

export default function Drawer({ children, isOpen, setIsOpen, count, setCount }) {

const [cartItems, setCartItems] = useState([]);
const [subtotal, setSubTotal] = useState('');	
const myToken = localStorage.getItem('fariToken');
const FARI_API = 'https://fari-prod.herokuapp.com/api';
const productInfo = (
    e: any,
    productid: any,
  ) => {
    localStorage.setItem('productID', productid);
  };  

	

async function createShopOrder(){
let customerid = localStorage.getItem('userID'); 
let vendorid = localStorage.getItem('sellerID');	
let order_total = subtotal;
const myToken = localStorage.getItem("fariToken");	
	
 const newOrder = {
 customerid: customerid,
 vendorid: vendorid,
 order_total: order_total, 
 }

 try {
    const response = await fetch(`${FARI_API}/store/new-order`,{
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${myToken}`
      },body: JSON.stringify(newOrder)
    })
    const data = await response.json();
    localStorage.setItem('orderID', data.customerOrder.id)
    return data;
  } catch (error) {
    console.log(error);
  }

};

async function createShopProductOrder(){
let inTheCart = [];
let purchasing = JSON.parse(localStorage.getItem('MyCartItems'))
let orderid = localStorage.getItem('orderID')
	
inTheCart.push(purchasing)
purchasing.forEach(async function(inTheCart){
	
 const newCustomerOrder = {
 orderid: orderid,
 productid: inTheCart.productid,
 vendorid: inTheCart.vendorid,
 vendor: inTheCart.vendor,
 vendor_email: inTheCart.vendor_email,	 
 product_name: inTheCart.name,	 
 product_qty: inTheCart.quantity,
 product_color: inTheCart.color,
 product_size: inTheCart.size,
 prod_img: inTheCart.image,
 product_price: inTheCart.price,
 purchase_total: inTheCart.total,
 customer_name: inTheCart.customer_name,
 	 
 }	
 try {
    const response = await fetch(`${FARI_API}/store/product-order`,{
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${myToken}`
      },body: JSON.stringify(newCustomerOrder)
    })
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Oops Something Went Wrong! Could not add product order.', error);
  }

})	
};
	


  async function loginToBuy() {
    if (!myToken || myToken === null) {
      window.location.href = 'login';
    }
  }	

async function checkoutSessionStripe(){
	let signedIn = localStorage.getItem('userID');
    if (!signedIn || signedIn === null) {
      loginToBuy();
    } else {
     try{
      const myToken = localStorage.getItem("fariToken");
      const purchaseItems = JSON.parse(localStorage.getItem('MyCartItems'))
      const customerorderid = JSON.parse(localStorage.getItem('orderID')) 
      const stripe_acct = localStorage.getItem('productStripeAccount'); 
      const vendoremail = localStorage.getItem('vendorEmail');
      const userEmail = localStorage.getItem('userEmail');
      const userName = localStorage.getItem('userUsername');	    
   fetch(`${FARI_API}/store/stripe-checkout`,{
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${myToken}`
      }, body: JSON.stringify({items: purchaseItems, customerorderid, stripe_acct, vendoremail, userEmail, userName})
    }).then(res => {
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
      }).then(({ url }) => {
	window.location = url
      }).catch(error => {
      console.log(error)
      })
	    
    }catch(error){
	console.log(error)
    }	    
    }
	

}

	

const calculateCartTotal = useCallback(() => {
let items = JSON.parse(localStorage.getItem('MyCartItems'));
 var total = 0;  

items.forEach(item => {total += item.total });
	
let cartTotal = total.toFixed(2)
setSubTotal(cartTotal)
}, [])

	

const removeItem = () => {	
let newCart;	
let producttoRemove = localStorage.getItem('productID')
let lettingGo = producttoRemove
let theCart = JSON.parse(localStorage.getItem('MyCartItems'));

let removingPurchase = theCart.findIndex(items => items.productid === lettingGo)
	
 theCart.splice(removingPurchase, 1);
 newCart = theCart 
 localStorage.setItem('MyCartItems', JSON.stringify(newCart))
 calculateCartTotal();
 setCartItems(newCart);
 setCount(count - 1);
	

};

	

const checkout = () => {
  createShopOrder().then(createShopProductOrder).then(checkoutSessionStripe);
}

const setInitialCount = useCallback(async() => {
  let getExistingCart = JSON.parse(localStorage.getItem('MyCartItems'))
   if(!getExistingCart){  
    setCount(0)
   }else if(getExistingCart){
   let cartItemCount = getExistingCart.length;
      setCount(cartItemCount)  
   }
   
 }, [])	

	
  const getCartItems = useCallback(async () => {
    let items = JSON.parse(localStorage.getItem('MyCartItems'));
	  if(!items){
	   localStorage.setItem('MyCartItems', JSON.stringify(cartItems))
	  }
	  else if(items){
	  setCartItems(items)
	  setInitialCount();
	  }

  }, [cartItems, count]);

	
	

    useEffect(() => {
    getCartItems();
    calculateCartTotal();
  }, [getCartItems]);

  
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-screen max-w-lg right-0 absolute bg-background h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <header className="p-4 font-bold text-lg">Your Cart</header>
          {cartItems && cartItems.length > 0 ? cartItems.map((item) => {
          return (
            <>
          <div className="h-48 w-full p-4 flex flex justify-center items-center shadow-lg m-4 p-4">
      <Image 
        src={item.image} 
        alt="product photo" 
        className='w-1/2 h-full'
        />
        <div className="flex flex-col justify-center items-center m-1">
        <Typography variant="h5">{item.name}</Typography>
        <div className="flex flex-col">
	 <Typography variant="h5">Quantity: {item.quantity} </Typography>
	 <Typography variant="h5">Color: {item.color} </Typography>
	 <Typography variant="h5">Size: {item.size} </Typography>
          
        </div>
	 <div className="flex ml-[9rem]">
	 <button arial-label="remove item from cart" className="flex flex-end bottom-0 right-0 m-4 p-4 cursor-pointer text-[red]" onClick={(e) => {productInfo(e, item.productid ); removeItem();}}>Remove</button>
	 </div>
          
        </div>

        
      </div>
            </>
          )
          }) : <Typography variant='h4' className="text-gray-400 text-center"> Your Cart is empty. </Typography> }
		<div className=" w-full mt-[5rem] w-1/2 flex flex-col justify-center items-center">
			<Typography variant="h4">SubTotal: ${subtotal}</Typography>
		<button className="bg-[#282828] text-[#fdfbf9] h-[3rem] w-[13rem] text-3xl px-12 rounded-full flex justify-center items-center" onClick={checkout}><i className="fa-brands fa-stripe text-[3.5rem] mr-[5px] "></i>checkout</button>
		</div>
        
          
        </article>
      </section>
	    
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
