'use client';
import Button from '@/components/atoms/button';
import { InputEdit } from '@/components/atoms/input-edit';
import * as Dialog from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';
import _ from 'underscore';
import Typography from '@/components/atoms/typography';

export default function EditProfile({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cover, setCover] = useState<string | null>(null);
  const [dp, setDp] = useState<string | null>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const dpRef = useRef<HTMLInputElement>(null);
  const [account, setAccount] = useState<any[]>([]);
  const [handle, setHandle] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [avatar, setAvatar] = useState('https://wallpapercave.com/w/uwp3855596');	
  const [poster, setPoster] = useState('https://wallpapercave.com/uwp/uwp3856701.jpeg');
  const profilePosterUpdate = useRef(null)
  const profileAviUpdate = useRef(null)
  const [message, setMessage] = useState('');	
  const [message2, setMessage2] = useState('');		
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';

	
    const updateHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHandle(event.target.value)
  }

      const updateBio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value)
        
  }

      const updateLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value)
  }

async function updatePoster(){
	if(!cover || cover === ''){
		return false;
	}
  const myToken = localStorage.getItem("fariToken"); 	
  try {
    var channelid = localStorage.getItem("channelID");
    const formData = new FormData(profilePosterUpdate.current!);
    const response = await fetch(
      `${FARI_API}/uploads/update/poster/${channelid}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${myToken}`,
	  'Access-Control-Allow-Origin': '*'
        },
        body: formData,
      }
    );
    const data = await response.json();
	  setMessage2('')
	  setMessage2('Changes Saved!')
	  window.location.reload();
    return data;
  } catch (error) {
    console.log(error);
  }	
}

async function updateAvatar(){
if(!dp || dp === ''){
	return false;
}
  const myToken = localStorage.getItem("fariToken"); 
  try {
    var channelid= localStorage.getItem("channelID");
    const formData = new FormData(profileAviUpdate.current!);
    const response = await fetch(
      `${FARI_API}/uploads/update/avatar/${channelid}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${myToken}`,
	  'Access-Control-Allow-Origin': '*'
        },
        body: formData,
      }
    );
    const data = await response.json();
	  localStorage.removeItem('uploads')
	  setMessage2('')
	  setMessage2('Changes Saved!')
	  window.location.reload();
	   
    return data;
  } catch (error) {
    console.log(error);
  }	
}	

  async function editHandle(){
    const userHandle = handle;
   if(!userHandle|| userHandle === ''){
     return false;
   }
    const myToken = localStorage.getItem("fariToken"); 
    let id = localStorage.getItem("channelID");
    try {
      const updateHandle = {
        channel_handle: userHandle,
      };

      const response = await fetch(`${FARI_API}/account/addhandle/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
        body: JSON.stringify(updateHandle),
      });
      const data = await response.json();
	setMessage('')
	if(data.error){
        setMessage(data.message);
      }else{
	setMessage2('')
	setMessage2('Changes Saved!')	
      }
    } catch (error) {
      console.log(error)
    }

  }

   async function editLocation(){
     const userLocation = location;
	   if(!userLocation || userLocation === ''){
		   return false;
	   }
     const myToken = localStorage.getItem("fariToken"); 
    let id = localStorage.getItem("userID");
    try {
      const updateBio = {
        location: userLocation,
      };

      const response = await fetch(`${FARI_API}/account/addlocation/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
        body: JSON.stringify(updateBio),
      });
      const data = await response.json();
      	setMessage2('')
	setMessage2('Changes Saved!')	    
    } catch (error) {
      console.log(error)
    }
  }

  async function editBio(){
  const channelBio = bio;
   if(!channelBio || channelBio === ''){
     return false;
   }
   const myToken = localStorage.getItem("fariToken");  
    let id = localStorage.getItem("userID");
    try {
      const updateBio = {
        bio: channelBio,
      };

      const response = await fetch(`${FARI_API}/account/addbio/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
        body: JSON.stringify(updateBio),
      });
      const data = await response.json();
      	setMessage2('')
	setMessage2('Changes Saved!')	    
    } catch (error) {
	    console.log(error)
    }
  }


  const userChannel = useCallback(async () => {
  const myToken = localStorage.getItem("fariToken"); 
  const channelid = localStorage.getItem("channelID");
  try {
    const response = await fetch(`${FARI_API}/users/myprofile/channel/${channelid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    });
    const data = await response.json();
    if (data.profile.length > 0) {
      setAccount(data.profile)
      setHandle(data.profile[0].channel_handle)
      setLocation(data.profile[0].location)
      setBio(data.profile[0].bio)
      setAvatar(data.profile[0].profile_avatar)
      setPoster(data.profile[0].profile_poster)
    } if (data.profile[0].profile_poster === null) {
	 setPoster('https://fari-prod-hls-069544520198.s3.amazonaws.com/wp4053330-no-wallpapers.jpg?format=webp')   
    }if (data.profile[0].profile_avatar === null){
	setAvatar('https://drotje36jteo8.cloudfront.net/noAvi.png?format=webp')   
    }

    return data.profile;
  } catch (error) {
    console.log(error)
  }
  }, []);

  

    useEffect(() => {
     userChannel();
  }, [userChannel]);


  
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 backdrop-blur' />
        <Dialog.Content className='fixed z-50 max-w-5xl m-auto overflow-hidden shadow-xl inset-10 h-max bg-background rounded-xl'>
          <ScrollArea.Root>
            <ScrollArea.Viewport className='h-[90vh]'>
              
          {account && account.length > 0 ? account.map((creator) => {
               return (
                 <>
                 <div className='relative'>
		<form
                  id="profilePosterUpdate"
		 ref={profilePosterUpdate}	
                >	 
                 <Image
                  onClick={() => coverRef.current?.click()}
                  className='absolute cursor-pointer right-5 bottom-1'
                  src={`/assets/images/camera.svg`}
                  alt=''
                  width={76}
                  height={76}
                />
                <input
                  accept=".jpeg, .png, .jpg, .gif"
                  onChange={(e) =>
                    setCover(URL.createObjectURL(e.target.files?.[0]!))
                  }
                  ref={coverRef}
                  className='hidden'
                  type='file'
		  name="channel-poster"	
                />
                <img
                  className='object-cover w-full h-96'
                  src={cover || poster}
                  alt='user poster'
                  width={600}
                  height={400}
                />
			   </form>
              </div>
              <div className='relative w-max'>
		<form
                  id="profileAviUpdate"
		  ref={profileAviUpdate}	
                >      
                <img
		  className='ml-10 -translate-y-1/4 rounded-2xl'	
                  src={dp || avatar}
                  alt='user avatar'
                  width={168}
                  height={200}
                />
                <input
                  accept=".jpeg, .png, .jpg, .gif"
                  onChange={(e) =>
                    setDp(URL.createObjectURL(e.target.files?.[0]!))
                  }
                  ref={dpRef}
                  className='hidden object-cover w-full h-64'
                  type='file'
		  name="avatar"	
                />
                <Image
                  className='absolute cursor-pointer right-2 bottom-10 -translate-y-1/4'
                  src={`/assets/images/camera.svg`}
                  alt=''
                  onClick={() => dpRef.current?.click()}
                  width={76}
                  height={76}
                />
		</form>
              </div>
              <div className='space-y-5'>
                <InputEdit label='channel name' value={_.unescape(creator.channelname)} />
                <InputEdit icon label='location' value={_.unescape(location)} onChange={updateLocation}/>
                <InputEdit icon label='handle' value={_.unescape(handle)} onChange={updateHandle}/>
	        <div className="text-[red] ml-[1.5rem]">{message}</div>
		<Typography variant="h6" className="text-[grey] ml-[1.5rem]">https://letsfari.com/channel?profile=yourhandle</Typography>
                <InputEdit icon textarea label='bio' value={_.unescape(bio)} onChange={updateBio}/>
              </div>
                 
                 </>

      
                )
                 }) : null}

	     <div className="flex flex-col items-center justify-center gap-2 w-full h-[4rem] mt-[3rem]">
               {message2}
                 </div>

              <div className='flex justify-end gap-4 px-4 py-8'>
                <Dialog.Close asChild>
                  <Button accent className='text-primary-foreground h-[3rem] text-3xl px-12 rounded-2xl shadow-lg hover:shadow-xl transition-all capitalize dark:text-[#fdfbf9]'>Cancel</Button>
                </Dialog.Close>
                  <Button accent className='text-primary-foreground h-[3rem] text-3xl px-12 rounded-2xl shadow-lg hover:shadow-xl transition-all capitalize dark:text-[#fdfbf9]' onClick={() => {editBio(); editHandle(); editLocation(); updatePoster(); updateAvatar();}} >Save</Button>
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation='vertical' />
          </ScrollArea.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
