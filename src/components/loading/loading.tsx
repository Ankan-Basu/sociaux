import Image from 'next/image';
import type { FC } from 'react';
import loadingGif from './loading.gif';

interface ILoadingProps {
  height: number;
  width: number;
}

const Loading: FC<ILoadingProps> = ({height, width}) => {  
  return (
    <div>      
      <Image src={loadingGif} height={height} width={width} alt='Loading ...' />
    </div>
  )
}

export default Loading;