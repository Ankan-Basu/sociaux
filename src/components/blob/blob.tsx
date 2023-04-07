import React, { FC } from 'react'

interface IBlobProps {
  additionCss?: string;
}

const Blob: FC<IBlobProps> = ({additionCss=''}) => {
  return (
    <div className={`fixed /relative -z-10 w-0 m-auto mt-36 ${additionCss}`}>
    <div className='absolute mix-blend-multiply top-14 -left-14 w-72 h-72 bg-primary rounded-full filter blur-xl opacity-70 animate-blob'></div>
    <div className='absolute mix-blend-multiply top-0 -right-4 w-72 h-72 bg-secondary2 rounded-full filter blur-xl opacity-70 animate-blob animation-delay-2000'></div>
    <div className='absolute mix-blend-multiply -bottom-60 -left-36 w-72 h-72 bg-secondary rounded-full filter blur-xl opacity-70 animate-blob animation-delay-4000'></div>
    </div>
  )
}

export default Blob