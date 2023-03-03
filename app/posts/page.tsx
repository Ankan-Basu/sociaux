import React from 'react'
import {  FaShare, FaLock, FaGlobe, FaEllipsisV, FaEllipsisH, FaTrash, FaRegTimesCircle, FaImage, FaVideo, 
    FaRegThumbsUp, FaThumbsUp, FaRegComment, FaComment, FaPen} from 'react-icons/fa';

export default function Page() {
  return (
    <div className='shadow-lg border-2 border-solid border-secondary w-100 p-2 pt-1 rounded-lg'>
            <div className='text-xs flex justify-between'>
                
                <div className='flex'><DropDown /></div>
                
                <div className='flex gap-2 text-primary'>
                <span>
                <FaPen />
                </span>
                <span>
                <FaTrash />
                </span>
                <span>
                <FaRegTimesCircle />
                </span>
                </div>
                </div>
            <div className='flex flex-col py-1 pt-0'>
                <div>
                    <h3 className='font-medium text-lg'>
                        Ayaka Kamisato
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
                <FaThumbsUp /> Like
                </span>
               <span className='py-1 flex-1 flex justify-center items-center gap-1 border-solid border-2 border-primary rounded-lg'> 
               <FaComment /> Comment</span>
               <span className='py-1 flex-1 flex justify-center items-center gap-1 border-solid border-2 border-primary rounded-lg'> 
               <FaShare /> Share</span>
                
            </div>
        </div>
  )
}


function DropDown() {
    const choiceArr = {}
    return (
        <div>
            <select>
                <option value="public"> <FaGlobe /> Public</option>
                <option value="friends">Friends</option>
                <option value="onlyMe"><FaLock /> Only Me</option>
            </select>
        </div>
    )
}