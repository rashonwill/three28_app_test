import Image from 'next/image';
import Profile from './profile';
import { MobileNav } from '@/components/organisms/mobile-nav';
import Navbar from '@/components/molecules/navbar';
import HeaderPhoto from './header-photo';

export const metadata = {
  title: 'Fari | Channel',
  description: 'Fari user profile',
  keywords: ['fari app', 'FARI', 'fari platform', 'fari videos', 'fari video sharing app', 'fari platform', 'fari channel']
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
