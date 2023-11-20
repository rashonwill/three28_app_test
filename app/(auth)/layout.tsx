import Brand from '@/components/atoms/brand';
import Typography from '@/components/atoms/typography';
import Bg from './bg';


export const metadata = {
  title: 'Fari | Account',
  description: 'Fari user access.',
  keywords: ['fari login', 'fari registration', 'fari app', 'FARI', 'fari platform', 'fari videos', 'fari video sharing app', 'fari platform']
}



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className='flex relative [&>*]:basis-full items-center '>
        <Brand className='absolute z-50 top-2 left-5' />
        <div className='relative w-full h-full max-lg:hidden'>
          <Bg />
          <div className='absolute inset-0 p-20 -translate-y-1/2 top-1/2'>
            <div className=' bg-[#B9BAB9]/30 drop-shadow-md p-10 text-[#050529] rounded-3xl w-full'>
              <Typography variant='h1'>
                create. <br /> profit. <br /> repeat.
              </Typography>
            </div>
          </div>
        </div>
        <div className='lg:pt-12 lg:pl-8'>{children}</div>
      </main>
    </>
  );
}
