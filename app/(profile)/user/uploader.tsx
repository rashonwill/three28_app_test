import Typography from '@/components/atoms/typography';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Tooltip from '@/components/atoms/tooltip';
import $ from 'jquery';
import _ from 'underscore';


export default function Uploader({
  video,
  setVideo,
  thumb, 
  setThumb,
} : {
  video: string;
  setVideo: Function;
  thumb: string;
  setThumb: Function;
}) {

  const thumbRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  const uploadRef = useRef(null)

  function videoSelection(e: any, start: any) {
  e.preventDefault();
  
  
  
    let reader = new FileReader();
    let file = e.target.files[0]!;
    let slice_size = 1000 * 1024;
    
    let next_slice = start + slice_size + 1;
    let blob = file.slice(start, next_slice);
    let url = URL.createObjectURL(file); 
    $('#video-file').removeAttr('poster');
    
    // $('#video-file').prop('controls',true);  
    setVideo(e.target.files[0])
    reader.onloadend = function (event: any) {
    
    $("#video-file").attr("src", url); 
    $("#video-file").load(event); 

    
    
  };
  reader.readAsDataURL(blob);
    

};




  function putPoster(e: any, start: any) {
    e.preventDefault();
  
  
  
    let reader = new FileReader();
    let file = e.target.files[0]!;
    let slice_size = 1000 * 1024;
    
    let next_slice = start + slice_size + 1;
    let blob = file.slice(start, next_slice);
    let url = URL.createObjectURL(file); 
    
    
    setThumb(e.target.files[0])
    reader.onloadend = function (event: any) {
      
    $("#video-poster").attr("poster", url);
  };
  reader.readAsDataURL(blob);
   

}
  
  return (
    <section className='flex flex-wrap justify-center gap-24'>
      {data.map((_, idx) => (
        <div key={_.label} className='text-center '>
          <Typography variant='h5'>{_.label}</Typography>
          <div
            className={cn(
              'bg-[#EBEAEA] cursor-pointer place-content-center w-96 aspect-square rounded-2xl',
              { 'grid group': idx ? !thumb : !video }
            )}
          >
            <Tooltip title="Select file">
            <video
              src={ idx ? '' : video || _.icon }
              poster={ idx ? thumb || _.icon : '/assets/images/video.svg'}
              onClick={() => (idx ? thumbRef : videoRef).current?.click()}
              className={cn('transition-all group-hover:scale-110', {
                'w-full h-full': idx ? thumb : video,
              })}
              id={idx ? 'video-poster' : 'video-file'}
              >
            </video>
              </Tooltip>
          </div>
          {idx ? (
            <input
              type='file'
              accept=".jpeg, .png, .jpg"
              onChange={(e) =>
                // setThumb(URL.createObjectURL(e.target.files?.[0]!))
                putPoster(e, 0)
              }
              ref={thumbRef}
              className='hidden'
              name="thumbnail"
              required
            />
          ) : (
            <input
              type='file'
              accept=".mp4, .avi, .mov, .mpeg-4, .wmv"
              onChange={(e) =>
                // setVideo(URL.createObjectURL(e.target.files?.[0]!))
                videoSelection(e, 0)
              }
              ref={videoRef}
              className='hidden'
              name="video"
              required
            />
          )}
        </div>
      ))}
    </section>
  );
}

const data = [
  { icon: '/assets/images/video.svg', label: 'Video Upload' },
  { icon: '/assets/images/thumb.svg', label: 'Thumbnail Upload' },
];
