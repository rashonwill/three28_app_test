import MerchCard from '../molecules/merch-card';

export function ViewMerch({
  poster,
  title,
  price,
  count,
  setCount, 
  outofStock,
  } : {
    price: string;
    title: string;
    poster: string;
    count: number;
    setCount: Function;
    outofStock?: boolean;
  }) {

  return (
    <>
    <div>
     <MerchCard 
       poster={poster} 
       title={title} 
       price={price} 
       count={count} 
       setCount={setCount} 
       outofStock={outofStock!} 
       />
    </div>
    
    </>
  
  
  )
}
