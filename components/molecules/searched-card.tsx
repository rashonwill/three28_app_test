import { cn } from '@/lib/utils';
import * as Popover from '@radix-ui/react-popover';
import { MoreHorizontal, Check } from 'lucide-react';
import Avatar from '../atoms/avatar';
import Typography from '../atoms/typography';
import Video from './video';
import Button from '../atoms/button';
import _ from 'underscore';
import { useState, useEffect } from "react";
import Link from 'next/link';

export default function SearchedCard({
  feature,
  poster,
  title,
  views,
  user,
  price,
  payable,
  avatar,
  uuid,
  handle,
  watchlist,
  setWatchlist,
}: {
    price: string;
    user: string;
    uuid: string;
    views: string;
    title: string;
    poster: string;
    feature: string;
    payable?: boolean;
    avatar: string;
    handle: string;
   watchlist?: any[];
  setWatchlist?: Function;
  
}) {
const [videoArr, setVideoArr] = useState({});
const [listed, setListed] = useState(false);

async function checkoutSessionStripe() {
  const purchaseItems = JSON.parse(localStorage.getItem("videoPurchase")!);
  const stripe_acct = localStorage.getItem("productStripeAccount");
  const vendoremail = localStorage.getItem("vendorEmail");
  const customeremail = localStorage.getItem("userEmail");
  const FARI_API = 'https://three28-test-api.onrender.com/api';
   const myToken = localStorage.getItem("fariToken");
    
  fetch(`${FARI_API}/orders/stripe-checkout/rental`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myToken}`,
    },
    body: JSON.stringify({
      items: [purchaseItems],
      stripe_acct,
      vendoremail,
      customeremail,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location = url;
    })
    .catch((error) => {
      console.log(error);
    });
}

   async function checkingOut() {
      let channelView = await getFeature();
      let stripeID = channelView[0].stripe_acctid;
      let vendore = channelView[0].vendor_email;
      localStorage.setItem("vendorEmail", vendore);
      localStorage.setItem("productStripeAccount", stripeID);
     
      let id = channelView[0].uuid;
      localStorage.setItem("videoID", id);

      let price = channelView[0].rental_price;
      localStorage.setItem("ticketPrice", price);

      let purchasingFilm = {
        video_uuid: channelView[0].uuid,
        name: _.unescape(channelView[0].videotitle),
        title: channelView[0].videotitle,
        image: channelView[0].videothumbnail,
        vendor: channelView[0].channelname,
        quantity: 1,
        price: channelView[0].rental_price,
        total: channelView[0].rental_price,
        channelid: channelView[0].channelid,
        buyerid: localStorage.getItem("userID"),
        videofile: channelView[0].videofile,
        views: channelView[0].videoviewcount,
      };

      setVideoArr(purchasingFilm);
      localStorage.setItem("videoPurchase", JSON.stringify(purchasingFilm));
      let gettingYou = JSON.parse(localStorage.getItem("videoPurchase")!);
      checkoutSessionStripe();
    };


async function getFeature() {
    try {
      const id = localStorage.getItem("videoID");
      const response = await fetch(`${FARI_API}/explorer/play/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.video.length === 0) {
        window.location.href = "/";
      }
      return data.video;
    } catch (error) {
      console.log(error);
    }

}

async function getMyWatchList() {
    var userid = localStorage.getItem('userID');
    const myToken = localStorage.getItem('fariToken');
    try {
      const response = await fetch(
        `${FARI_API}/explorer/watchlist/${userid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${myToken}`,
          },
        }
      );
      const data = await response.json();
      if (data.myWatchList.length > 0) {
        localStorage.removeItem('watchlist');
      }
      return data.myWatchList;
    } catch (error) {
      console.log(error);
    }
  }

async function laterVideo() {
  var feature = await getFeature();
  const myToken = localStorage.getItem("fariToken");
  var userid = localStorage.getItem("userID");
  var channelname = feature[0].channelname;
  var video = feature[0].videofile;
  var posFile = feature[0].videothumbnail;
  var vidTitle = feature[0].videotitle;
  var channelident = feature[0].channelid;
  let views = feature[0].videoviewcount;
  var uniqueID = feature[0].uuid;

  const laterBody = {
    userid: userid,
    channelname: channelname,
    videofile: video,
    videothumbnail: posFile,
    videotitle: vidTitle,
    channelid: channelident,
    videoviewcount: views,
    paidtoview: false,
    video_uuid: uniqueID,
  };


  try {
    const response = await fetch(`${FARI_API}/explorer/add/watchlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
      body: JSON.stringify(laterBody),
    });
    const data = await response.json();
    getMyWatchList();
    setListed(true)
    return data;
  } catch (error) {
    console.log(error)
  }
}  


const handlePayment = () => {
	 setTimeout(function(){
    checkingOut().then(checkoutSessionStripe)
}, 1500);
  
}	
  
  return (
     <>

    
   <section className='relative flex max-w-6xl py-3 mx-auto transition-all duration-700 origin-top-left shadow-lg max-sm:scale-50 max-sm:-mr-[100%] hover:shadow-xl rounded-xl group gap-7 mt-[2rem]'>  
      <Video search src={feature} className='max-w-[21rem]' poster={poster} title={title} uuid={uuid}/>
      <div className='flex flex-col'>
        <div className=' grow'>
          <Typography variant='h4'>{title}</Typography>
          <Typography variant='h5'>{views} Views</Typography>
        </div>
	<Link href={`/channel?profile=${handle}`} aria-label="visit channel" >
        <div className='flex items-center '>
          <Avatar src={avatar} className='origin-left scale-50' />
          <Typography variant='h5'>{user}</Typography>
        </div>
	</Link>
      </div>
      <Popover.Root>
        {payable ? (
          <Button accent className='absolute origin-top-right scale-75 dark:lg:scale-90 right-4 top-4' onClick={handlePayment} aria-label="purchase video">
            ${price}
          </Button>
        ) : (
          <Popover.Trigger className={cn('absolute right-4 top-4')}>
            <MoreHorizontal className='text-foreground' size={32} />
          </Popover.Trigger>
        )}
        <Popover.Portal>
          <Popover.Content className='px-8 py-1 text-white rounded-full cursor-pointer bg-black/70 '>
		  {listed ? (
	         <>
	<div className="flex">
		<Check color="#969697" />
		<Typography
                variant='h6'
                className="text-[#969697]"
                >
               Added to watchlist
                </Typography>
		   </div>
		  
		  </>) : (
	           <>
		  <Typography variant='h6' onClick={laterVideo}>Add to Watchlist</Typography>
		  
		  </>
     
     )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
       </section>


  

        </>

    
     )};
