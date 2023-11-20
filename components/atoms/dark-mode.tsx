'use client';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function DarkMode() {
  const { theme, setTheme } = useTheme();
  const Comp = theme === 'dark' ? Sun : Moon;
  return (
    <section
      onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
      className='p-1 rounded-full max-lg:hidden bg-accent/30 w-max'
    >
      <Comp
        className={cn('fill-black', {
          'fill-yellow-300': theme === 'dark',
        })}
        size={40}
      />
    </section>
  );
}
