import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useEffect, useRef, useState } from 'react'
import { projectType } from '../infos/projects'
import works, { workType } from '../infos/work'


interface IDetailsBannerProps {
  data: workType | projectType;
}

const DetailsBanner: FC<IDetailsBannerProps> = ({data}) => {
  const detailsBannerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsVisible(entry?.isIntersecting || false);
    });
    if (detailsBannerRef.current === null) {
      return
    }
    observer.observe(detailsBannerRef.current);
    
    return () => {
      observer.disconnect();
    }
  }, [])
  
  return (
    <div
    ref={detailsBannerRef}
    className={`border-2 border-solid border-primary2 rounded-lg 
    bg-white/60
    w-10/12 md:w-700px flex gap-2 p-2 shadow-lg lg:hover:bg-secondary2 lg:hover:bg-opacity-60
    opacity-0
    ${isVisible?'animate-scrollAppear opacity-100':''}
    transition-all /delay-500 mx-auto duration-500
    `}
    >
      
    <div
      className={`flex-1 flex justify-center items-center relative
      ${data._id%2===0?'':'order-2'}`}
    >
      <Image src={data.img} alt='logo' />  
    </div>
      
      
    <div className='flex flex-col gap-1 flex-2 w-1/2 md:w-99'>
        {/*DATA  */}
        
      <div
        className='text-2xl md:text-3xl'
      >
        <h2>{data?.name}</h2>
      </div>

        

      <div
        className='text-xs'
      >   
        {data?.ongoing?'Ongoing':''}
      </div>
      

      <div className='font-medium text-primary2'>    
        <h3>{data?.title}</h3>
      </div>
        
        
      <div>
        <p className='text-sm md:text-base text-justify'>{data?.desc}</p>
      </div>  
        
        
      <div className='bg-secondary my-3 p-2 rounded-lg'>
        <span className='font-medium text-sm'>Technologies used:</span><br />
        <div className='text-sm'>
          {data &&
          data.techStack.map((tech, indx, arr) => {
            return (
              <span key={indx}>
                {`${tech}${indx<arr.length-1?', ':''}`}
              </span>
            )
          })
          }
          </div>
      </div>
      
      
      <div>
      {/* LINKS SECTION */}
          
        <div
        className='flex flex-col gap-2 items-start'
        >
          {data?.liveLink?
          // <div> Live Link:
          // <button>liveLink</button>
          // </div>
          <Link href={data.liveLink} target='_blank'>
          <BannerButton>Live Link</BannerButton>
          </Link>
          :
          <></> }
          {data?.gitHubLink?
          // <div> Github Link: 
          // <button>gitHub</button>
          // </div>
          <Link href={data.gitHubLink} target='_blank'>
            <BannerButton>Github Link</BannerButton>
          </Link>
          :
          <></> }
        </div>
    
        
    
          <div 
        className='flex flex-col gap-2 items-start'
        >
          {
            data?.certificateLink?
           <Link href={data.certificateLink} target='_blank'>
              <BannerButton>Certificate</BannerButton>
            </Link>
            :
            <></> 
          }
          {
            data?.LORLink?
            <Link href={data.LORLink} target='_blank'>
              <BannerButton>LOR</BannerButton>
            </Link>
            :
            <></> 
          }
        </div>


      </div>
    </div>
  </div>
  )
}


interface IBannerButtonProps {
  children: React.ReactNode;
}

const BannerButton: FC<IBannerButtonProps> = ({children}) => {
  return (
    <button 
    className='
    p-1 w-32 md:w-40 rounded-lg 
    active:bg-primary2 duration-150
    lg:hover:bg-primary lg:active:bg-primary2 lg:active:text-white
    border-2 border-solid border-primary2 lg:duration-700'>
      {children}
    </button>
  )
}

export default DetailsBanner