'use client';
import { cn } from '@/lib/utils';
import { Eye, LucideIcon } from 'lucide-react';
import React, { useState } from 'react';

interface CompType {
  sm?: boolean;
  icon?: LucideIcon;
}

export default function Input({
  className,
  sm,
  icon,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  CompType) {
  const [shown, setShown] = useState(false);
  return (
    <div
      className={cn(
        'flex items-center px-6 focus-within:shadow-lg overflow-hidden text-4xl transition-all rounded-full shadow-md shadow-zinc-500 hover:shadow-lg h-[60px]',
        { 'h-11': sm }
      )}
    >
      <input
        {...props}
        type={props.type === 'password' && shown ? 'text' : props.type}
        className={cn('outline-none grow', {}, className)}
      />
      <div
        className={props.type === 'password' ? 'cursor-pointer' : ''}
        onClick={() => setShown((p) => !p)}
      >
        {icon && (
          <Icon icon={props.type === 'password' && shown ? Eye : icon!} />
        )}
      </div>
    </div>
  );
}

function Icon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon className='text-[#999999]' />;
}
