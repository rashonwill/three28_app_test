import Button from '@/components/atoms/button';
import Typography from '@/components/atoms/typography';
import * as Dialog from '@radix-ui/react-dialog';
import * as RadioGroup from '@radix-ui/react-radio-group';
import $ from 'jquery';
import './reports.css';



export const Reports = ({
  open,
  setOpen,
  reason,
  setReason,	
}: {
  open: boolean;
  setOpen: Function;
  reason: string;
  setReason: Function;	
}) => (

<>
<Dialog.Root open={open}>
    <Dialog.Portal>
      <Dialog.Overlay
        onClick={() => setOpen(false)}
        className='fixed inset-0 bg-black/50 backdrop-blur-lg'
      />
      <Dialog.Content className='fixed inset-0 max-w-3xl px-10 py-6 m-auto shadow-lg outline-none rounded-2xl h-max bg-background/90 z-[50]'>
        <Typography variant='h3'>Report:</Typography>
        <RadioGroup.Root className='my-4 space-y-2 ' name="flag" onValueChange={(v) => setReason(v)}>
          {data.map((_) => (
            <div role='button' key={_} 
	      className='flex items-baseline gap-2'>
              <RadioGroup.Item
                className='w-5 rounded-full aria-checked:bg-secondary h-max aspect-square bg-zinc-400'
                value={_}
                id={_}
              />
              <label role='button' htmlFor={_}>
                <Typography variant='h5'>{_}</Typography>
              </label>
            </div>
          ))}
        </RadioGroup.Root>
        <Button
	  accent	
	  className="bg-gradient-to-r from-primary-light to-primary-dark text-primary-foreground h-[60px] text-3xl px-12 rounded-2xl shadow-lg hover:shadow-xl transition-all capitalize"	
          onClick={() => { setOpen(false); flagVideo(reason);}}
        >
          Report
        </Button>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
	
	</>
);

const data = [
  'Harassment/Abuse/Bulling',
  'Sexual/Pornography',
  'Violence',
  'Stolen Content/Copyright Violation',
  'Spam',
  'Hate Speech',
];

async function flagVideo(reason: string) {
  let id = localStorage.getItem("videoID");
  const myToken = localStorage.getItem("fariToken");
  // const FARI_API = 'https://www.fariapi.com/api';
  const FARI_API = 'https://fari-prod.herokuapp.com/api';
	
  let reasonFlagged = {
    flag_reason: reason,
  };
  try {
    const response = await fetch(`${FARI_API}/explorer/flag-video/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
      body: JSON.stringify(reasonFlagged),
    });
    const data = await response.json();
  } catch (error) {
     console.log(error)
  }
}

