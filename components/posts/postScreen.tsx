import React from 'react'
import { FiX } from 'react-icons/fi'
import CommentScreen from '../comment/commentScreen'
import Post from './Post'

interface IPostScreenProps {
    postId: string;
}

function PostScreen() {
  return (
    <div
    className='
    fixed z-50
    top-0 left-0 w-screen h-screen
    bg-gray-600/50 backdrop-blur-lg
    '
    >
        
        
        
        <div className='
        bg-white h-screen 
        w-full sm:w-101
        m-auto sm:rounded-lg
        shadow-lg pt-2 p-2
        '>

            <div className='
            flex justify-end
            mb-2 mr-2
            '>
                <span className='
                active:text-primary2
                lg:hover:text-primary lg:active:text-primary2
                '>

                <FiX />
                </span>
            </div>

            <div>
            <Post 
            expanded={true}
            uname='test'
            message='test message'
            time='12-12-2022'
            privacy={1}
            _id='1'  
            />
            </div>


    <div>
      <CommentScreen />
    </div>

        </div>
        
        </div>
  )
}

export default PostScreen