'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Bg() {
  const path = usePathname();
  return (
    <Image
      src={`/assets/images/${
        path.includes('login') ? 'login' : 'register'
      }.svg`}
      alt=''
      className='object-cover w-full h-full min-h-screen'
      width={800}
      height={300}
    />
  );
}
