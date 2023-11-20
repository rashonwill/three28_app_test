import { cn } from '@/lib/utils';
import Image from 'next/image';
import { HtmlHTMLAttributes } from 'react';

interface CompType {
  src: string;
  nav?: boolean;
}

export default function Avatar({
  className,
  nav,
  src,
  ...props
}: HtmlHTMLAttributes<HTMLDivElement> & CompType) {
  return (
    <div
      {...props}
      className={cn(
        ' rounded-full shadow-md shadow-zinc-500 w-20 h-20',
        { 'shadow-md': nav },
        className
      )}
    >
      <Image
        src={src}
        alt='avatar'
        className='rounded-full h-full w-full'
        width={50}
        height={50}
        loading='lazy'
      />
    </div>
  );
}
