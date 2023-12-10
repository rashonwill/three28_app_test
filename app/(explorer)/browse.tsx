import MoreVideos from '@/components/organisms/more-videos';
import Spotlight from '@/components/organisms/spotlight';
import SuggestedVideo from '@/components/organisms/suggested-video';

export default function Browse() {
  return (
    <>
      <section className='flex w-full max-lg:flex-col '>
        <Spotlight />
        <br className='lg:hidden' />
        <SuggestedVideo />
      </section>
      <section className='flex w-full max-lg:flex-row w-1/2 '>
        <MoreVideos />
      </section>
    </>
  );
}
