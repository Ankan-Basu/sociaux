import SignupComponent from '~/components/auth/signupComponent'
import React, { FC } from 'react'
import Blob from '~/components/blob/blob'

const Signup: FC = () => {
  return (
    <div className=''>
      <Blob additionCss='left-20 md:left-28 lg:left-40 xl:left-52 2xl:left-72'/>
      
      <div className={`mt-4 lg:mt-10 flex flex-col justify-center gap-2 lg:flex-row`}>
      <div 
      className=' 
      flex-1 lg:order-2 
      text-4xl lg:text-5xl font-medium 
      flex item-center'>
      <span 
      className='flex items-center
     ml-6 sm:ml-20 md:ml-24
      '>
        <div>
        Welcome to<span className='text-primary2'>&nbsp;Sociaux</span>
        <span className='text-secondary2'>.</span>
        </div>
      </span>
      </div>
      <div className='flex-1 order-1'>
      <SignupComponent />
      </div>
      </div>
    </div>
  )
}

export default Signup