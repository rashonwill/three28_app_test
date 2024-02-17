import Typography from '../atoms/typography';
import SearchedCard from '../molecules/searched-card';
import _ from 'underscore';
import { useState, useEffect, useRef, useCallback } from "react";



export default function SearchResult() {  
const [searched, setSearched] = useState<any[]>([]);
const [message, setMessage] = useState('Searching...'); 
const searchPage = useRef(null);
const FARI_API = 'https://three28-test-api.onrender.com/api';
  
const videoPlay = (uuid: any, channelid: any) =>{
  localStorage.setItem('videoID', uuid)
  localStorage.setItem('visitingChannelID', channelid);
}


const purchasePlay = (uuid: any, channelid: any) =>{
  localStorage.setItem('videoID', uuid)
  localStorage.setItem('visitingChannelID', channelid)
}



  async function getEnteredSearch() {
    setSearched([])
  let query = localStorage.getItem('searchTerm');
  try {
    const response = await fetch(`${FARI_API}/explorer/video-search-explorer/${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.videos.length > 0){
      setSearched(data.videos)
    }else{
      setMessage('')
      setMessage('No results')
    }
    
    return data.videos;
  } catch (error) {
    console.log(error)
  }
}

  
  
  const handleKeyPress = useCallback((event) => {
      if (event.key === 'Enter' || event.keyCode === 13) {
        getEnteredSearch();
        console.log('Enter key pressed');
      }
  },[]);

  

  
  useEffect(() => {

   window.addEventListener('keydown', handleKeyPress);
  
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
   
  }, [handleKeyPress]);

    
  return (
    <section className='lg:container' ref={searchPage} id="searchPage">
{/*       <Typography variant='h4' className='max-w-6xl mx-auto max-lg:mt-10'>
        Search Results
      </Typography> */}
      <br />
      <div className='max-sm:-space-y-24'>
        {searched && searched.length > 0 ? searched.map((result) => {
      return result.content_class === "paid" ? (
        <div onClick={()=> purchasePlay(result.uuid, result.channelid)} key={result.id}>
                                               <SearchedCard 
                                                  payable 
                                                  feature={result.videofile} 
                                                  poster={result.videothumbnail} 
                                                  title={_.unescape(result.videotitle)} 
                                                  views={result.videoviewcount}
                                                  user={_.unescape(result.channelname)}
                                                  price={result.rental_price}
                                                  avatar={result.profile_avatar ? result.profile_avatar : 'https://drotje36jteo8.cloudfront.net/noAvi.png'} 
                                                  uuid={result.uuid}
                                                  handle={result.channel_handle}
                                                 
                                                /> 
          </div>
                                               ) : (
          <div onClick={()=> videoPlay(result.uuid, result.channelid)} key={result.id}>
                                                  <SearchedCard 
                                                   feature={result.videofile} 
                                                   poster={result.videothumbnail} 
                                                   title={_.unescape(result.videotitle)}
                                                   views={result.videoviewcount}
                                                   user={_.unescape(result.channelname)}
                                                   price={result.rental_price}
                                                   avatar={result.profile_avatar ? result.profile_avatar : 'https://drotje36jteo8.cloudfront.net/noAvi.png'} 
                                                   uuid={result.uuid} 
                                                   handle={result.channel_handle} 
                                                  />
               </div>
                                                  )
       }) :  <Typography variant='h4' className="text-gray-400 text-center"> {message} </Typography>}
        
        
      </div>
    </section>
  );
}
