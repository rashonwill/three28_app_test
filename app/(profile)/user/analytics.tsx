import Avatar from '@/components/atoms/avatar';
import Typography from '@/components/atoms/typography';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import _ from "underscore";
import { viewsConversion } from '@/app/conversions/conversion';

export default function Analytics() {
  const [views, setViews] = useState<number | undefined>(0);
  const [earnings, setEarnings] = useState('');
  const [likes, setLikes] = useState<number | undefined>(0);
  const [dislikes, setDislikes] = useState<number | undefined>(0);
  const [comments, setComments] = useState<number | undefined>(0);
  const [count, setCount] = useState<any[]>([]);
  const [total, setTotal] = useState<any[]>([]);
  const [pricing, setPricing] = useState<any[]>([]);
  const [totalcount, setTotalCount] = useState<any[]>([]);
  const [myVideoItems, setVideoItems] = useState<any[]>([]);
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';

  async function totalViews() {
    let channelid = localStorage.getItem("channelID");
    const myToken = localStorage.getItem("fariToken");

  try {
    const response = await fetch(
      `${FARI_API}/analytics/viewstotal/${channelid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    let convertedViews = viewsConversion(data.total[0].totalviews)
    setViews(convertedViews)
    return data.total;
  } catch (error) {
    console.log(error)
  }
}

  async function totalEarningsRentals() {
  let channelid = localStorage.getItem("channelID");
    const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(
      `${FARI_API}/analytics/rentaltotals/${channelid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    let totalChannelEarnings = parseFloat(data.total[0].earningstotal);
    let allEarningsTotal = totalChannelEarnings.toFixed(2);
    setEarnings(allEarningsTotal)
    
    // localStorage.setItem("channelEarnings", data.total[0].earningstotal);
    return data.total;
  } catch (error) {
    console.log(error)
  }
}


  async function totalLikes() {
  let channelid = localStorage.getItem("channelID");
    const myToken = localStorage.getItem("fariToken");

  try {
    const response = await fetch(
      `${FARI_API}/analytics/likestotal/${channelid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    let convertedLikes = viewsConversion(data.total[0].totallikes)
    setLikes(convertedLikes)
    return data.total;
  } catch (error) {
    console.log(error)
  }
}

async function totalDislikes() {
  let channelid = localStorage.getItem("channelID");
  const myToken = localStorage.getItem("fariToken");

  try {
    const response = await fetch(
      `${FARI_API}/analytics/dislikestotal/${channelid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    let convertedDislikes = viewsConversion(data.total[0].totaldislikes)
    setDislikes(convertedDislikes)
    return data.total;
  } catch (error) {
    console.log(error)
  }
}


async function totalComments() {
  let channelid = localStorage.getItem("channelID");
  const myToken = localStorage.getItem("fariToken");

  try {
    const response = await fetch(
      `${FARI_API}/analytics/commentstotal/${channelid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    let convertedComments = viewsConversion(data.total[0].count)
    setComments(convertedComments)
    return data.total;
  } catch (error) {
    console.log(error)
  }
}


  async function rentalSoldCount() {
  let channelid = localStorage.getItem("channelID");
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(
      `${FARI_API}/analytics/rentedcounts/${channelid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
  const data = await response.json();
  let arr3 = data.total;
  let videos = [];
  for (let i = 0; i < arr3.length; i++) {
    videos.push(arr3[i].uuid);
  }

  let videoIDs = [...new Set(videos)];
  localStorage.setItem("videoIDs", JSON.stringify(videoIDs));
    
    setTotalCount(data.total)
    return data.total;
  } catch (error) {
    console.log(error)
  }
}


async function rentalSoldCountByVideoID() {
  let videoids = JSON.parse(localStorage.getItem("videoIDs")!);
  const myToken = localStorage.getItem("fariToken");
  videoids.forEach(async function (videoid: any) {
    try {
      const response = await fetch(
        `${FARI_API}/analytics/rental-sells/${videoid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${myToken}`,
          },
        }
      );
      const data = await response.json();      
      setVideoItems((myVideoItems) => [...myVideoItems, data.pricing]);
      return data.pricing;
    } catch (error) {
      console.log(error)
    }
  });
}


useEffect(() => {
  totalEarningsRentals();
  totalViews();
  totalLikes();
  totalDislikes();
  totalComments();
  rentalSoldCount().then(rentalSoldCountByVideoID)
  }, []);


  const data = [
  {
    title: 'total views',
    icon: '/assets/images/analytics/Line Chart.svg',
    value: views,
    className: 'col-span-3 w-full max-w-[550px]',
  },
  {
    title: 'total earnings',
    icon: '/assets/images/analytics/Dollar Coin.svg',
    value: '$' + earnings,
    className: 'col-span-3 w-full max-w-[550px]',
  },
  {
    title: 'total likes',
    icon: '/assets/images/analytics/Facebook Like.svg',
    value: likes,
    className: 'col-span-2 w-full max-w-[324px]',
  },
  {
    title: 'total dislikes',
    icon: '/assets/images/analytics/Thumbs Down.svg',
    value: dislikes,
    className: 'col-span-2 w-full max-w-[324px]',
  },
  {
    title: 'total comments',
    icon: '/assets/images/analytics/Chat Bubble.svg',
    value: comments,
    className: 'col-span-2 w-full max-w-[324px]',
  },
];

  
  return (
    <>
      <section className='grid grid-cols-6 gap-12 justify-items-center'>
        {data.map((_) => (
          <div
            className={cn(
              'bg-[#DFDFDF] dark:bg-transparent dark:shadow-[#171717] shadow-lg flex items-center rounded-3xl shadow-md justify-between pt-4 pb-12 pl-3 pr-10',
              _.className
            )}
            key={_.title}
          >
            <div className='capitalize'>
              <Typography variant='h6'>{_.title}</Typography>
              <Typography className='uppercase' variant='h2'>
                {_.value}
              </Typography>
            </div>
            <Image
              src={_.icon}
              alt=''
              className='object-cover w-24 aspect-square'
              width={148}
              height={148}
            />
          </div>
        ))}
      </section>
      <table className='w-full [&_tr]:text-left mt-40'>
        <thead>
          <tr>
            <th className='font-normal'>
              <Typography variant='h2'>Product</Typography>
            </th>
            <th className='font-normal'>
              <Typography variant='h2'>#Sold</Typography>
            </th>
            <th className='font-normal'>
              <Typography variant='h2'>Earnings</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          
           {myVideoItems && myVideoItems.length > 0 ? myVideoItems.map((sold) => {
             return (
              <>
            <tr>    
           <td className='flex items-center gap-5 m-[1rem]'>
              <Avatar src={sold.videothumbnail} />
              <Typography variant='h3'>{sold.videotitle}</Typography>
            </td>
            <td>
              <Typography variant='h3'>{`${viewsConversion(sold.count)}`}</Typography>
            </td>
            <td>
              <Typography variant='h3'>${sold.videoordertotal}</Typography>
            </td>
              </tr> 
              </>
             )
           }) : null}
         
        </tbody>
      </table>
    </>
  );
}


