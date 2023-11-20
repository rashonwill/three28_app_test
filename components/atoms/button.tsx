import { cn } from '@/lib/utils';
import { HtmlHTMLAttributes } from 'react';

interface CompType {
  secondary?: boolean;
  sm?: boolean;
  accent?: boolean;
}

export default function Button({
  className,
  secondary,
  sm,
  accent,
  ...props
}: HtmlHTMLAttributes<HTMLButtonElement> & CompType) {
  return (
    <button
      {...props}
      className={cn(
        'bg-gradient-to-r from-primary-light to-primary-dark text-primary-foreground h-[78px] text-5xl px-12 rounded-2xl shadow-lg hover:shadow-xl transition-all capitalize',
        {
          'from-secondary to-secondary text-secondary-foreground rounded-full h-12 text-2xl':
            secondary,
          'h-[64px] text-4xl': sm,
          'from-accent to-accent text-accent-foreground h-9 text-3xl': accent,
        },
        className
      )}
    />
  );
}
