import Navbar from '@/components/molecules/navbar';


export const metadata = {
  title: 'Three28 | Community',
  applicationName: 'Three28',
  category: 'social media',
  description: 'Content creators come enjoy Three28, a platform that allows video uploading with a monetization option, a personal eCommerce store all while keeping 100% profit.',
  keywords: ['video sharing', 'youtube', 'video monetization', 'social media', 'video sharing platform', 'content monetization', 'Three28', 'Three28 social media site', 'Three28 video platform', 
            'Three28', 'video uploading', 'sites like YouTube', 'sell video content', 'OnlyFans like site', 'Three28 app', 'Three28: Share Videos Online', 
            'Ecommerce Store for Content Creators on Three28', 'Three28: Monetize Your Video Content', 'Three28: 100% Profit for Creators', 'Boondocks', 'boondocks full episodes', 'AI Videos', 'Three28 AI Content', 'Three28 Short films',
           'Three28 pay per view', 'pay per view videos', 'Three28 pay to view content', 'bondocks', 'full episodes', 'vlogs', 'short films', 'films', 'series', 'music', 'tech', 'podcast'],
}

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className='pt-32'>
      <Navbar />
      {children}
    </div>
  );
}
