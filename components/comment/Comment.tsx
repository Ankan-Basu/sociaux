import React from 'react'
import {FaEllipsisV, FaEllipsisH} from 'react-icons/fa';


export default function Comment(){
  return (
    <>
    <div className='flex w-98'>
        <div className='w-16'>
        <div className='w-full'>
            <img src='ayaka.jpg' height='60rem' width='60rem' className='rounded-full'/>
        </div>
        </div>
        <div className='flex-1'>
            <div className='bg-secondary rounded-lg rounded-tl-none'>
                <div className='flex justify-between p-1'>
                    <div className='flex gap-1 items-center'>
                    <span><h4 className='m-0 p-0 font-medium'> Kamisato Ayaka </h4></span>
                    <span><h4 className='text-sm font-light'>(@aether_simp)</h4></span>
                    </div>
                    <div>
                        <FaEllipsisH />
                    </div>
                </div>
                <div className='p-2 pt-0'>
                Lorem ipsum dolor sit, amet consectetur 
                adipisicing elit. Maiores animi in libero 
                ratione sed architecto sit, repudiandae eum porro, 
                dignissimos voluptate nihil 
                tempore eius illum! Totam unde deleniti eos voluptas!    
                </div>                
            </div>
            <div className='px-2 text-sm flex justify-between'>
                <div>
                <span className='mr-2'>Like</span>
                <span>Comment</span>
                </div>
                <div>20 wks</div>
            </div>
            
        </div>
    </div>
    </>
  )
}