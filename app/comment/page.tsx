import React from 'react'
import {FaEllipsisV, FaEllipsisH} from 'react-icons/fa';


export default function Comment(){
  return (
    <>
    <div className='flex w-98 border-2 border-solid border-red-500'>
        <div className='w-16 border-2 border-solid border-green-500'>
        <div className='w-full border-2 border-solid border-orange-500'>
            <img src='ayaka.jpg' height='60rem' width='60rem' className='rounded-full'/>
        </div>
        </div>
        <div className='flex-1 border-2 border-solid border-blue-500'>
            <div className='rounded-lg rounded-tl-none border-2 border-solid border-black'>
                <div className='flex justify-between p-1'>
                    <div className='flex gap-1 items-center'>
                    <span><h4 className='m-0 p-0 font-medium'> Kamisato Ayaka </h4></span>
                    <span><h4 className='text-sm font-light'>(@aether_simp)</h4></span>
                    </div>
                    <div>
                        <FaEllipsisH />
                    </div>
                </div>
                <div>
                Lorem ipsum dolor sit, amet consectetur 
                adipisicing elit. Maiores animi in libero 
                ratione sed architecto sit, repudiandae eum porro, 
                dignissimos voluptate nihil 
                tempore eius illum! Totam unde deleniti eos voluptas!    
                </div>                
            </div>
            <div className='pl-2 text-sm'>
                <span>Like</span>
                <span></span>
            </div>
            
        </div>
    </div>




    <div className='w-100 border-2 border-solid border-red-500'>
        page
    </div>
    </>
  )
}
