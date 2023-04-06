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
    // console.log('REf', detailsBannerRef.current);
    const observer = new IntersectionObserver((entries) => {
      // console.log('ENTRY', data.name, entries[0]);
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
    className={`border-2 border-solid border-black rounded-lg 
    w-700px flex gap-2 p-2
    ${isVisible?'animate-scrollAppear':''}
    transition-all delay-500 mx-auto
    `}
    >
      
    <div
      className='border-2 border-solid border-red-500 flex-1'
    >
      Image  
    </div>
      
      
    <div className='flex flex-col gap-1 flex-2 w-99'>
        {/*DATA  */}
        
      <div
        className='text-3xl'
      >
        <h2>{data?.name}</h2>
      </div>

        

      <div
        className='text-xs'
      >   
        {data?.ongoing?'Ongoing':''}
      </div>
      

      <div className='font-medium'>    
        <h3>{data?.title}</h3>
      </div>
        
        
      <div>
        <p>{data?.desc}</p>
      </div>  
        
        
      <div className='border-2 border-solid border-red-500'>
        <span className='font-medium'>Technologies used:</span><br />
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
        className='border-2 border-solid flex flex-col gap-2 items-start'
        >
          {data?.liveLink?
          // <div> Live Link:
          // <button>liveLink</button>
          // </div>
          <BannerButton>Live Link</BannerButton>
          :
          <></> }
          {data?.gitHubLink?
          // <div> Github Link: 
          // <button>gitHub</button>
          // </div>
          <BannerButton>Github Link</BannerButton>
          :
          <></> }
        </div>
    
        
    
          <div 
        className='border-2 border-solid flex flex-col gap-2 items-start'
        >
          {data?.certificateLink?<BannerButton>Certificate</BannerButton>:<></> }
          {data?.LORLink?<BannerButton>LOR</BannerButton>:<></> }
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
    <button className='p-1 w-40 rounded-lg border-2 border-solid border-black'>
      {children}
    </button>
  )
}

export default DetailsBanner