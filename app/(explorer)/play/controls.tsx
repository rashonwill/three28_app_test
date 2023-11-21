import React from "react";
import axios from "axios";
import Typography from '@/components/atoms/typography';
import {
  Clock,
  Flag,
  Heart,
  LucideIcon,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { Reports } from './reports';
import { viewsConversion } from '@/app/conversions/conversion';
import { Alert } from '@mui/material';


function Action(props: {
   _: {
    value?: number;
    icon: LucideIcon;
    onclick?: () => void;
    action?: Function;
};
}) {
  const [clicked, setClicked] = useState(false);
  function handleClick() {
	
    if (props._.onclick) return props._.onclick();
	
    if (props._.action) {
	setClicked((p) => !p);
	return props._.action();
    }
  }

  return (
    <div
      onClick={handleClick}
      role='button'
      className='flex items-center gap-1 transition-all sm:px-5 hover:bg-zinc-400 text-[#545454] dark:text-[#fdfbf9] rounded-2xl sm:bg-neutral-200/[.2] mr-[5px] '
    >
      {props._.value && <Typography variant='h6'>{props._.value}</Typography>}{' '}
      <Icon clicked={clicked} icon={props._.icon} />
    </div>
  );
}


export default function Controls() {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [likes, setLikes] = useState<number | undefined>(0);
  const [dislikes, setDislikes] = useState<number | undefined>(0);
  const [isPaid, setIsPaid] = useState(false);
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';


  
async function playFeature() {
  let paramaters = new URLSearchParams(window.location.search);
  let video_id = paramaters.get("play");
	if(video_id){
	  localStorage.setItem("videoID", video_id);
	}
    try {
      const id = localStorage.getItem("videoID");
      const response = await fetch(`${FARI_API}/explorer/play/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data)
      if (data.video.length === 0) {
        window.location.href = "/";
      }

      return data.video;
    } catch (error) {
      console.log(error);
    }

}

async function userWatchedFlag() {
  let uuid = localStorage.getItem("videoID");
  let userid = localStorage.getItem('userID');
  const myToken = localStorage.getItem("fariToken");	
  try {
    const response = await fetch(`${FARI_API}/explorer/userwatched/${uuid}/${userid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
  }
}

  

async function getUserProfile() {
const myToken = localStorage.getItem("fariToken");	
  try {
    const response = await fetch(`${FARI_API}/users/myprofile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
    if (data.profile.length === 0) {
      window.location.href = "/login";
    }
    return data.profile;
  } catch (error) {
    console.log(error);
  }
}	

async function likeVideo() {
  let uuid = localStorage.getItem("videoID");
  var userlike = localStorage.getItem("userID");
  const myToken = localStorage.getItem("fariToken");	
  try {
    const likingUser = {
      userid: userlike,
      video_uuid: uuid,
    };
    const response = await fetch(`${FARI_API}/explorer/youlikeme/${uuid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
      body: JSON.stringify(likingUser),
    });
    const data = await response.json();
    playVideo()
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function likeStatus() {
  let videoid = localStorage.getItem("videoID");
  var userid = localStorage.getItem("userID");
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(
      `${FARI_API}/explorer/mylikes/${videoid}/${userid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    if (data.iLike.length > 0) {
      revokeLike();
    } else if (data.iLike.length === 0) {
      likeVideo();
      compareDisLikes();
    }
    return data;
  } catch (error) {
    console.log(error)
  }
}

async function revokeLike() {
  let videoid = localStorage.getItem("videoID");
  let id = localStorage.getItem("likeID");
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(
      `${FARI_API}/explorer/youlikeme/revoke/${id}/${videoid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    playVideo()
    return data;
  } catch (error) {
    console.log(error)
  }
}

async function dislikeVideo() {
  let uuid = localStorage.getItem("videoID");
  var userdislike = localStorage.getItem("userID");
  const myToken = localStorage.getItem("fariToken");	
  try {
    const dislkingUser = {
      userid: userdislike,
      video_uuid: uuid,
    };

    const response = await fetch(`${FARI_API}/explorer/youdislikeme/${uuid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
      body: JSON.stringify(dislkingUser),
    });
    const data = await response.json();
    playVideo()
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function dislikeStatus() {
  let videoid = localStorage.getItem("videoID");
  var userid = localStorage.getItem("userID");
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(
      `${FARI_API}/explorer/mydislikes/${videoid}/${userid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    if (data.idisLike.length > 0) {
      revokeDisLike();
    } else if (data.idisLike.length === 0) {
      dislikeVideo();
      compareLikes();
    }
    return data.idisLike;
  } catch (error) {
    console.log(error)
  }
}

async function revokeDisLike() {
  let videoid = localStorage.getItem("videoID");
  let id = localStorage.getItem("disLikeID");
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(
      `${FARI_API}/explorer/youdislikeme/revoke/${id}/${videoid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    playVideo();
    return data;
  } catch (error) {
     console.log(error)
  }
}

async function laterVideo() {
  var getFeature = await playFeature();
  const myToken = localStorage.getItem("fariToken");
  var userid = localStorage.getItem("userID");
  var channelname = getFeature[0].channelname;
  var video = getFeature[0].videofile;
  var posFile = getFeature[0].videothumbnail;
  var vidTitle = getFeature[0].videotitle;
  var channelident = getFeature[0].channelid;
  let views = getFeature[0].videoviewcount;
  var uniqueID = getFeature[0].uuid;

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
    <Alert severity="success">Added to watchlist!</Alert>
	  getMyWatchList();
    return data;
  } catch (error) {
    console.log(error)
  }
}

const getMyWatchList = useCallback(async () => {
  var userid = localStorage.getItem("userID");
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(`${FARI_API}/explorer/watchlist/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
    if (data.myWatchList.length > 0) {
      localStorage.setItem('watchlist', JSON.stringify(data.myWatchList));
    }
    return data.myWatchList;
  } catch (error) {
    console.log(error)
  }
  }, [])

async function favVideo() {
  var getFeature = await playFeature();
  var favedUser = localStorage.getItem("userID");
  var channelname = getFeature[0].channelname;
  var video = getFeature[0].videofile;
  var posFile = getFeature[0].videothumbnail;
  var vidTitle = getFeature[0].videotitle;
  var channelident = getFeature[0].channelid;
  let views = getFeature[0].videoviewcount;
  var uniqueID = getFeature[0].uuid;

  const favedBody = {
    userid: favedUser,
    channelname: channelname,
    videofile: video,
    videothumbnail: posFile,
    videotitle: vidTitle,
    channelid: channelident,
    videoviewcount: views,
    video_uuid: uniqueID,
  };
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(`${FARI_API}/explorer/youfavedme`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
      body: JSON.stringify(favedBody),
    });
    const data = await response.json();
    <Alert severity="success">Added to favorites!</Alert>
	  getMyFavs();
    return data;
  } catch (error) {
    console.log(error)
  }
}


const getMyFavs = useCallback(async () => {
  var userid = localStorage.getItem("userID");
  const myToken = localStorage.getItem("fariToken"); 
  try {
    const response = await fetch(`${FARI_API}/explorer/myfavs/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
     if (data.myFavVids.length > 0) {
       localStorage.setItem('favorites', JSON.stringify(data.myFavVids))
     } 
    return data.myFavVids;
  } catch (error) {
    console.log(error)
  }
  }, [])

async function checkUserLikes() {
  let uuid = localStorage.getItem("videoID");
  var userid = localStorage.getItem("userID");
  const myToken = localStorage.getItem("fariToken");	
  try {
    const response = await fetch(
      `${FARI_API}/explorer/mylikes/${uuid}/${userid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    if (data.iLike.length > 0) {
      localStorage.setItem("likeID", data.iLike[0].likeid);
    }
    return data.iLike;
  } catch (error) {
   console.log(error)
  }
}

async function compareLikes() {
  let videoid = localStorage.getItem("videoID");
  var userid = localStorage.getItem("userID");
  const myToken = localStorage.getItem("fariToken");	
  try {
    const response = await fetch(
      `${FARI_API}/explorer/mylikes/${videoid}/${userid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    if (data.iLike.length > 0) {
      revokeLike();
    }
    return data.iLike;
  } catch (error) {
    console.error("Oops could not determine if you like that video", error);
  }
}

async function checkUserDisLikes() {
  let videoid = localStorage.getItem("videoID");
  var userid = localStorage.getItem("userID");
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(
      `${FARI_API}/explorer/mydislikes/${videoid}/${userid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    if (data.idisLike.length > 0) {
    localStorage.setItem("disLikeID", data.idisLike[0].dislikeid);
    }
    return data.idisLike;
  } catch (error) {
    console.log(error);
  }
}

async function compareDisLikes() {
  let videoid = localStorage.getItem("videoID");
  var userid = localStorage.getItem("userID");
  const myToken = localStorage.getItem("fariToken");
  try {
    const response = await fetch(
      `${FARI_API}/explorer/mydislikes/${videoid}/${userid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
      }
    );
    const data = await response.json();
    if (data.idisLike.length > 0) {
      revokeDisLike();
    }
    return data.idisLike;
  } catch (error) {
   console.log(error);
  }
}


	
  const playVideo = useCallback(async () => {
	const id = localStorage.getItem("videoID");
    try{
  	const response = await axios.get(`${FARI_API}/explorer/play/${id}`)
    .then(({ data }) => {
        if (data) {
	  let convertedLikes = viewsConversion(data.video[0].videolikecount)
          setLikes(convertedLikes);
	  let convertedDislikes = viewsConversion(data.video[0].videodislikecount)	
          setDislikes(convertedDislikes);
        }      if(data.video[0].content_class == 'paid'){
          setIsPaid(true)
          setTimeout(function() {
            userWatchedFlag();
          }, 20000);
        } 
    })
      }catch(error){
      console.log(error)
    }
	  

},[]); 	

	
useEffect(() => {
    playVideo();
    checkUserLikes().then(checkUserDisLikes);	
  }, [likes, dislikes, getMyWatchList, playVideo]);

	
  const data = [
    { value: likes, icon: ThumbsUp, action: likeStatus },
    { value: dislikes, icon: ThumbsDown, action: () =>  dislikeStatus() },
    { icon: Heart, action: () => favVideo() },
    { icon: Clock, action: () => laterVideo() },
    { icon: Flag, onclick: () => setOpen(true) },
  ];

  const data2 = [
    { value: likes, icon: ThumbsUp, action: likeStatus },
    { value: dislikes, icon: ThumbsDown, action: () =>  dislikeStatus() },
  ];

  return (
<section className='flex gap-2.5'>
    {isPaid ? 

    (     
      <>
      { data2.map((_) => ( <Action key={_.icon.name} _={_} /> ))}
      </>
      
    ) : (
      <>
      { data.map((_) => ( <Action key={_.icon.name} _={_} /> ))}
      </>
      
    )

    }
   
 
      <Reports open={open} setOpen={setOpen} reason={reason} setReason={setReason} />
    </section>
  );
}

function Icon({
  icon: Icon,
  clicked,
}: {
  icon: LucideIcon;
  clicked?: boolean;
}) {
  return (
    <Icon
      className={
        clicked ? ' fill-[#686868] stroke-[#545454] transition-all   ' : ''
      }
    />
  );
}







