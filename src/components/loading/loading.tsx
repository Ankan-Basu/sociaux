import Image from 'next/image';
import React from 'react';
import loadingGif from './loading.gif';

const Loading = () => {
  console.log('LOADING', loadingGif);
  
  return (
    <div>
      GIF
      
      <Image src={loadingGif} height={100} width={100} alt='Loading ...' />
    </div>
  )
}

export default Loading