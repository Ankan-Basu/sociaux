import React from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { FaShare, FaLock, FaGlobe, FaEllipsisV, FaEllipsisH, FaTrash, FaRegTimesCircle, FaImage, FaVideo } from 'react-icons/fa';

export default function Modal() {
    return (
        <div className='border-solid border-2 border-secondary w-100 p-2 pt-1 rounded-lg'>
            <div className='flex justify-end'>
                <span className='text-primary'>
                <FaRegTimesCircle />
                </span>
                </div>
            <div className='flex py-1 pt-0'>
                Privacy:
               <DropDown />
            </div>
            <div className=''>
            <label htmlFor="textarea" className='py-1'>Write post here:</label>


                <textarea id="textarea" name="textarea" rows={4} cols={50} className='bg-secondary2 w-99 rounded-lg outline-none p-1 resize-none'>
                </textarea>
            </div>
            <div className='flex justify-center gap-2 py-1'>
                <button className='bg-deactiv p-2 flex-1 flex justify-center rounded-md'><FaImage /></button>
                <button className='bg-deactiv p-2 flex-1 flex justify-center rounded-md'><FaVideo /></button>
            </div>
            <div className='flex justify-center flex-col gap-1 pt-1'>
                <span className='flex-1'>
                <Button>
                    <FaTrash />Discard
                </Button>
                </span>
                <span className='flex-1'>
                <Button type='normal'><FaShare/>Post</Button>
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
                <option value="public"> Public</option>
                <option value="friends">Friends</option>
                <option value="onlyMe"> Only Me</option>
            </select>
        </div>
    )
}

function Button({children, type}: {children: React.ReactNode, type?: string}) {
    return (
        <button className={`p-1 rounded-md ${type==='normal'?'bg-primary':'bg-deactiv'} flex w-full justify-center items-center gap-2`}>
            {children}
        </button>
    )
}