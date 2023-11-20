import Navbar from '@/components/molecules/navbar';


export const metadata = {
  title: 'Fari: Create & Profit',
  applicationName: 'Fari',
  category: 'social media',
  description: 'Content creators come enjoy Fari, a platform that allows video uploading with a monetization option, a personal eCommerce store all while keeping 100% profit.',
  keywords: ['video sharing', 'youtube', 'video monetization', 'social media', 'video sharing platform', 'content monetization', 'fari', 'Fari social media site', 'Fari video platform', 
            'Fari', 'video uploading', 'sites like YouTube', 'sell video content', 'OnlyFans like site', 'fari app', 'Fari: Share Videos Online', 
            'Ecommerce Store for Content Creators on Fari', 'Fari: Monetize Your Video Content', 'Fari: 100% Profit for Creators', 'Boondocks', 'boondocks full episodes', 'AI Videos', 'FARI AI Content', 'FARI Short films',
           'fari pay per view', 'pay per view videos', 'fari pay to view content', 'bondocks', 'full episodes', 'vlogs', 'short films', 'films', 'series', 'music', 'tech', 'podcast'],
}

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className='pt-32'>
      <Navbar />
      {children}
    </div>
  );
}
