import { cn } from '@/lib/utils';
import Avatar from '../atoms/avatar';
import Typography from '../atoms/typography';
import Link from 'next/link';

export default function VideoAuthor({
  className,
  name,
  pop,
  view,
  src,
  handle,
}: {
  className?: string;
  view: string;
  src: string;
  pop?: boolean;
  name: string;
  handle: string;
}) {
  return (
    <Link
      href={`/channel?profile=${handle}`}
      className={cn('text-white flex items-center gap-1.5', className)}
      aria-label="View Channel"
    >
      <Avatar
        src={src}
        className={pop ? '-translate-x-10 -translate-y-14' : ''}
      />
      <div className={pop ? '-translate-x-10 ' : ''}>
        <Typography variant='h5'>{name}</Typography>
        <Typography variant='h5'>{view} Views</Typography>
      </div>
    </Link>
  );
}
