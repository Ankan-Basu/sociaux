import React from 'react'
import style from '../style/portfolio.module.css';

const Banner = () => {
  return (
    <div  
    className='min-h-screen bg-secondary2 snap-start overflow-x-hidden flex justify-center items-center'
    >
     <div className='/border-2 /border-solid /border-black p-2 -mt-14 md:-mt-8 md:-ml-10 lg:-ml-40'>
     <h1 className={`${style.heading} text-primary2 font-medium text-6xl md:text-8xl`}>Hello...</h1>
     <h1 className={`${style.heading2} text-6xl md:text-8xl break-normal mt-4`}>
      <span className='text-gray-700'>I'm </span> 
      <span className='text-primary2'>Ankan Basu</span> 
      </h1>
     
     <h2 className={`${style.jobTitle} text-primary2 font-medium text-xl md:text-3xl mt-6`}>Full Stack Developper and ML enthusiast</h2>
     <h3 className={`${style.welcome} text-gray-600 text-lg`}>Welcome to my website</h3>
     </div>
    </div>
  )
}

export default Banner