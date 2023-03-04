import React from 'react'

import { FiEdit3, FiTrash, FiX, FiThumbsUp, FiCornerUpRight, FiMessageSquare, FiSettings, FiLogOut, FiUser } from "react-icons/fi";

export default function Post() {
  return (
    <div className='
    w-80 mb-8 shadow-lg border-2 border-solid border-secondary 
    lg:w-100 p-2 pt-1 rounded-lg'>
            <div className='text-xs flex justify-between'>
                
                <div className='flex'><DropDown /></div>
                
                <div className='flex gap-2 text-primary'>
                <span>
                <FiEdit3 />
                </span>
                <span>
                <FiTrash />
                </span>
                <span>
                <FiX />
                </span>
                </div>
                </div>
            <div className='flex flex-col py-1 pt-0'>
                <div>
                    <h3 className='font-medium text-lg'>
                        Kamisato Ayaka
                    </h3>
                </div>
                <div>
                    <h3 className='font-light text-sm'>
                        @aether_simp
                    </h3>
                </div> 
                
              
            </div>
            <div className=''>
            Post
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Repellendus doloremque sapiente asperiores molestiae. Quae repudiandae ab quia excepturi? 
            Nemo molestiae culpa iste magnam officia temporibus quisquam omnis dignissimos odio impedit.
            </div>
            <div className='border-solid border-2 border-yellow-500 flex justify-center gap-2 py-1'>
Optional Img/ Vid
            </div>
            <div className='text-primary flex justify-center gap-2 pt-1'>
               <span className='py-1 flex-1 flex justify-center items-center gap-1 border-solid border-2 border-primary rounded-lg'>
                <FiThumbsUp /> 
                
                {/* Display Text only in big screen */}
                <span className='hidden lg:inline'>Like</span>
                
                </span>
               <span className='py-1 flex-1 flex justify-center items-center gap-1 border-solid border-2 border-primary rounded-lg'> 
               <FiMessageSquare /> 
               
               {/* Display Text only in big screen */}
               <span className='hidden lg:inline'>Comment</span>
               </span>
               <span className='py-1 flex-1 flex justify-center items-center gap-1 border-solid border-2 border-primary rounded-lg'> 
               <FiCornerUpRight /> 
               
               {/* Display Text only in big screen */}
               <span className='hidden lg:inline'>Share</span>
               </span>
                
            </div>
        </div>
  )
}


function DropDown() {
    const choiceArr = {}
    return (
        <div>
            <select>
                <option value="public">Public</option>
                <option value="friends">Friends</option>
                <option value="onlyMe">Only Me</option>
            </select>
        </div>
    )
}