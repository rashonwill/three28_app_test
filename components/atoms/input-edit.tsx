import { cn } from '@/lib/utils';
import { Edit } from 'lucide-react';
import { HtmlHTMLAttributes, forwardRef } from 'react';
import Typography from './typography';

interface InputEditProps extends HtmlHTMLAttributes<HTMLDivElement> {
  textarea?: boolean;
  icon?: boolean;
  label?: string;
  btn?: string;
  value: string;
}

const InputEdit = forwardRef<HTMLDivElement, InputEditProps>(
  ({ className, icon, placeholder, btn, label, textarea, value, ...props }, ref) => {
    const Comp = textarea ? 'textarea' : 'input';
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          'max-w-5xl px-4 mx-auto',
          { 'max-w-full': btn },
          className
        )}
      >
        <label className='text-2xl capitalize opacity-40'>{label}</label>
        <div className='flex min-h-[70px] items-center bg-gray-200 dark:bg-[#171717] shadow-md rounded-2xl'>
          <Comp
            rows={4}
            placeholder={placeholder}
            type='text'
            className='p-6 text-2xl bg-transparent outline-none grow'
            value={value}
          />
          {btn && (
            <Typography variant='h4' role='button' className='mr-6'>
              Send
            </Typography>
          )}
          {icon && <Edit className='text-secondary' />}
        </div>
      </div>
    );
  }
);

InputEdit.displayName = 'InputEdit';
export { InputEdit };
