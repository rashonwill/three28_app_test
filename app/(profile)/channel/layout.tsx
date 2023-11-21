import Image from 'next/image';
import Profile from './profile';
import { MobileNav } from '@/components/organisms/mobile-nav';
import Navbar from '@/components/molecules/navbar';
import HeaderPhoto from './header-photo';

export const metadata = {
  title: 'Three28 | Channel',
  description: 'Three28 user profile',
  keywords: ['Three28 app', 'Three28', 'Three28 platform', 'Three28 videos', 'Three28 video sharing app', 'Three28 platform', 'Three28 channel']
}


function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div>
        <HeaderPhoto />
        <Profile />
      </div>
      {children}
    </main>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='pt-0'>
      <Navbar />
      <span className='max-lg:hidden'>
        <MainLayout>{children}</MainLayout>
      </span>
      <MobileNav Main={<MainLayout>{children}</MainLayout>} />
    </div>
  );
}
