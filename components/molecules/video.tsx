import { cn } from '@/lib/utils';
import Alert from '@mui/material/Alert';
import * as Popover from '@radix-ui/react-popover';
import { MoreHorizontal, Pencil, Play, Trash2, Check } from 'lucide-react';
import Link from 'next/link';
import { HtmlHTMLAttributes, useCallback, useState } from 'react';
import _ from 'underscore';
import Typography from '../atoms/typography';
import EditModal from './edit-modal';
import Image from 'next/image'

interface CompType {
  src: string;
  poster: string;
  spotlight?: boolean;
  search?: boolean;
  title: string;
  uuid: string;
  favorite?: boolean;
  watcher?: boolean;
  profile?: boolean;
  payable?: number;
  favorites?: any[];
  setFavorites?: Function;
  watchlist?: any[];
  setWatchlist?: Function;
}

export default function Video({
  className,
  title,
  uuid,
  spotlight,
  payable,
  search,
  profile,
  favorite,
  watcher,
  src,
  poster,
  favorites,
  setFavorites,
  watchlist,
  setWatchlist,
  ...props
}: HtmlHTMLAttributes<HTMLDivElement> & CompType) {
  const [video, setVideo] = useState<any[]>([]);
  const [videoArr, setVideoArr] = useState({});
  const [listed, setListed] = useState(false);
  const myToken = localStorage.getItem('fariToken');

    async function getFeature() {
    try {
      const id = localStorage.getItem('videoID');
      const response = await fetch(
        `https://fari-prod.herokuapp.com/api/explorer/play/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      return data.video;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteVideo() {
    const myToken = localStorage.getItem('fariToken');
    let id = localStorage.getItem('videoID');
    let videokey = localStorage.getItem('videokey');
    let thumbnailKey = localStorage.getItem('thumbnailkey');
    try {
      const response = await fetch(
        `https://fari-prod.herokuapp.com/api/uploads/delete-upload/${id}/${videokey}/${thumbnailKey}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        }
      );
      const data = await response.json();
      channelPost();
    } catch (error) {
      console.log(error);
    }
  }
const channelPost = useCallback(async () => {
	localStorage.removeItem('uploads');
  const myToken = localStorage.getItem("fariToken");
  try {
    var channelid = localStorage.getItem("channelID");
    const response = await fetch(
      `https://fari-prod.herokuapp.com/api/users/myprofile/post/${channelid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
	  
    if (data.channelUploads.length > 0) {
     localStorage.setItem('uploads', JSON.stringify(data.channelUploads))
    } 
    return data.channelUploads;
  } catch (error) {
    console.log(error);
  }
  }, [])


  async function laterVideo() {
    var feature = await getFeature();
    const myToken = localStorage.getItem('fariToken');
    var userid = localStorage.getItem('userID');
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
      const response = await fetch(
        `https://fari-prod.herokuapp.com/api/explorer/add/watchlist`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${myToken}`,
          },
          body: JSON.stringify(laterBody),
        }
      );
      const data = await response.json();
      getMyWatchList();
      setListed(true)
      return data;
    } catch (error) {
      console.log(error);
    }
  }

    async function updateWatchlist() {
    let newData;
    let laterID = localStorage.getItem('videoID');
    let allLaters = JSON.parse(localStorage.getItem('watchlist'));
    let removingLater = allLaters.findIndex((later) => later.uuid === laterID);

    allLaters.splice(removingLater, 1);
    newData = allLaters;
    localStorage.setItem('watchlist', JSON.stringify(newData));
  }


  async function getMyWatchList() {
    var userid = localStorage.getItem('userID');
    const myToken = localStorage.getItem('fariToken');
    try {
      const response = await fetch(
        `https://fari-prod.herokuapp.com/api/explorer/watchlist/${userid}`,
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
	      setWatchlist(data.myWatchList)
        // localStorage.setItem('watchlist', JSON.stringify(data.myWatchList));
      }
      return data.myWatchList;
    } catch (error) {
      console.log(error);
    }
  }

    async function deleteWatchLater() {
    var feature = await getFeature();
    var userid = localStorage.getItem('userID');
    let uuid = feature[0].uuid;
    const myToken = localStorage.getItem('fariToken');
    try {
      const response = await fetch(
        `https://fari-prod.herokuapp.com/api/explorer/delete/watchlater/${userid}/${uuid}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${myToken}`,
          },
        }
      );
      const data = await response.json();
      localStorage.removeItem('watchlist');
      getMyWatchList();
      return data;
    } catch (error) {
      console.log(error);
    }
  }


  async function deleteFav() {
    var feature = await getFeature();
    var userid = localStorage.getItem('userID');
    let uuid = feature[0].uuid;
    const myToken = localStorage.getItem('fariToken');
    try {
      const response = await fetch(
        `https://fari-prod.herokuapp.com/api/explorer/delete/favs/${userid}/${uuid}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${myToken}`,
          },
        }
      );
      const data = await response.json();
      localStorage.removeItem('favorites');
	    // updateFavs()
      getMyFavs();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateFavs() {
    let newData;
    let favID = localStorage.getItem('videoID');
    let allFavs = JSON.parse(localStorage.getItem('favorites'));
    let removingFav = allFavs.findIndex((favorite) => favorite.uuid === favID);

    allFavs.splice(removingFav, 1);
    newData = allFavs;
    localStorage.setItem('favorites', JSON.stringify(newData));
  }

async function getMyFavs(){
    localStorage.removeItem('favorites');
    var userid = localStorage.getItem('userID');
    const myToken = localStorage.getItem('fariToken');
    try {
      const response = await fetch(
        `https://fari-prod.herokuapp.com/api/explorer/myfavs/${userid}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${myToken}`,
          },
        }
      );
      const data = await response.json();
      if (data.myFavVids.length > 0) {
	      setFavorites(data.myFavVids)
        // localStorage.setItem('favorites', JSON.stringify(data.myFavVids));
      }
      return data.myFavVids;
    } catch (error) {
      console.log(error);
    }
  };



  async function loginToBuy() {
    if (!myToken || myToken === null) {
      window.location.href = 'login';
    }
  }

  async function checkoutSessionStripe() {
    let signedIn = localStorage.getItem('userID');
    if (!signedIn || signedIn === null) {
      loginToBuy();
    } else {
      const purchaseItems = JSON.parse(localStorage.getItem('videoPurchase'));
      const stripe_acct = localStorage.getItem('productStripeAccount');
      const vendoremail = localStorage.getItem('vendorEmail');
      const customeremail = localStorage.getItem('userEmail');
      fetch(
        `https://fari-prod.herokuapp.com/api/orders/stripe-checkout/rental`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${myToken}`,
          },
          body: JSON.stringify({
            items: [purchaseItems],
            stripe_acct,
            vendoremail,
            customeremail,
          }),
        }
      )
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
  }



  async function checkingOut() {
    let channelView = await getFeature();
    let stripeID = channelView[0].stripe_acctid;
    let vendore = channelView[0].vendor_email;
    localStorage.setItem('vendorEmail', vendore);
    localStorage.setItem('productStripeAccount', stripeID);

    let id = channelView[0].uuid;
    localStorage.setItem('videoID', id);

    let price = channelView[0].rental_price;
    localStorage.setItem('ticketPrice', price);

    let purchasingFilm = {
      video_uuid: localStorage.getItem('videoID'),
      name: _.unescape(channelView[0].videotitle),
      title: channelView[0].videotitle,
      image: channelView[0].videothumbnail,
      vendor: channelView[0].channelname,
      quantity: 1,
      price: channelView[0].rental_price,
      total: channelView[0].rental_price,
      channelid: channelView[0].channelid,
      buyerid: localStorage.getItem('userID'),
      videofile: channelView[0].videofile,
      views: channelView[0].videoviewcount,
    };

    setVideoArr(purchasingFilm);
    localStorage.setItem('videoPurchase', JSON.stringify(purchasingFilm));
  }

  const handlePayment = () => {
    setTimeout(function () {
      checkingOut().then(checkoutSessionStripe);
    }, 1500);
  };


  return (
    <div
      {...props}
      className={cn(
        'relative aspect-video w-full',
        { 'max-w-md': !spotlight },
        className
      )}
    >
      {' '}
      <div
        style={{ zIndex: 1 }}
        className={cn(
          'absolute inset-0 flex flex-col items-center m-auto text-white capitalize translate-y-6 peer h-max text-center',
          { 'translate-y-0': search }
        )}
      >
         {payable ? (
          <div className='px-12 mb-2 rounded-full cursor-pointer bg-[#969697]' onClick={handlePayment}>
            <Typography
              variant='h5'
              className='text-while (condition) {
              black
            }'
            >
              Pay ${payable}
            </Typography>
          </div>
        ) : (
   <Link  href={`/play?video=${uuid}`} aria-label="Play video" >
            <Play
              className='cursor-pointer fill-[#969697] stroke-[#969697] '
              size={64}
            />
          </Link>
        )}    
        {!search && (
          <Typography variant={spotlight ? 'h3' : 'h5'}>{title}</Typography>
        )}
      </div>

	<Image
        src={poster}
        alt='video thumbnail'
        className='w-full transition-all duration-1000 aspect-video brightness-50 peer-hover:brightness-100 rounded-2xl'
        width={400}
        height={300}
	loading='lazy'
      /> 
      <Popover.Root>
        <Popover.Trigger
          className={cn('absolute right-4 top-1', {
            hidden: spotlight || search || payable,
          })}
        >
          <MoreHorizontal className='text-white' size={32} />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className='px-8 py-2 text-white cursor-pointer rounded-3xl bg-black/70 '>
            {profile ? (
              <>
                <EditModal>
                  <div className='w-full m-[.5rem] h-[1.5rem]'>
                    <Typography variant='h6' className='flex gap-2'>
                      <Pencil />
                      Edit
                    </Typography>
                  </div>
                </EditModal>
                <div
                  className='w-full m-[.5rem] h-[1.5rem]'
                  onClick={deleteVideo}
                >
                  <Typography variant='h6' className='flex gap-2'>
                    <Trash2 /> Delete
                  </Typography>
                </div>
              </>
            ) : favorite ? (
              <>
                <Typography variant='h6' onClick={deleteFav}>
                  Remove from favorites
                </Typography>
              </>
            ) : listed ? (
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

                </>
              ) : (
                <>
              <Typography
                variant='h6'
                onClick={() => (watcher ? laterVideo() : deleteWatchLater())}
              >
                {watcher ? 'Add to Watchlist' : 'Remove from watchlist'}
              </Typography>
                </>

            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
