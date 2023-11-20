import { cn } from '@/lib/utils';
import { HtmlHTMLAttributes } from 'react';

interface CompType {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export default function Typography({
  className,
  variant,
  ...props
}: HtmlHTMLAttributes<HTMLParagraphElement> & CompType) {
  return (
    <p
      {...props}
      className={cn(
        '',
        {
          'text-5xl sm:text-7xl md:text-8xl': variant === 'h1',
          'text-3xl sm:text-4xl md:text-[50px]': variant === 'h2',
          'text-3xl sm:text-4xl md:text-5xl': variant === 'h3',
          'text-2xl sm:text-3xl md:text-4xl': variant === 'h4',
          'text-xl sm:text-2xl md:text-[22px]': variant === 'h5',
          'text-lg sm:text-xl md:text-2xl': variant === 'h6',
        },
        className
      )}
    />
  );
}
