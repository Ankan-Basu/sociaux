import Image from 'next/image';
import React, { FC } from 'react';
import loadingGif from './loading.gif';

interface ILoadingProps {
  height: number;
  width: number;
}

const Loading: FC<ILoadingProps> = ({height, width}) => {
  console.log('LOADING', loadingGif);
  
  return (
    <div>      
      <Image src={loadingGif} height={height} width={width} alt='Loading ...' />
    </div>
  )
}

export default Loading;