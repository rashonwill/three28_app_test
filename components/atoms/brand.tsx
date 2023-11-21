import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { HtmlHTMLAttributes } from 'react';

interface CompType {
  explorer?: boolean;
}

export default function Brand({
  explorer,
  className,
  ...props
}: HtmlHTMLAttributes<HTMLAnchorElement> & CompType) {
  return (
    <Link
      href={'/'}
      {...props}
      className={cn(
        'max-lg:flex justify-center w-full',
        { 'max-lg:block': explorer },
        className
      )}
    >
      <Image
        src={'/assets/images/logo.svg'}
        alt='logo'
        className={cn('lg:w-64', { 'lg:w-auto h-8': explorer })}
        width={400}
        height={200}
      />
    </Link>
  );
}
