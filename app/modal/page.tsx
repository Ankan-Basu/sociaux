import React from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { FaShare, FaLock, FaGlobe, FaEllipsisV, FaEllipsisH, FaTrash, FaRegTimesCircle, FaImage, FaVideo } from 'react-icons/fa';

export default function Modal() {
    return (
        <div className='border-solid border-2 border-red-500 w-100 p-2 pt-1 rounded-lg'>
            <div className='border-solid border-2 border-green-500 flex justify-end'>
                <span>
                <FaRegTimesCircle />
                </span>
                </div>
            <div className='border-solid border-2 border-orange-500 flex py-1 pt-0'>
                Privacy:
               <DropDown />
            </div>
            <div className='border-solid border-2 border-blue-500'>
            <label htmlFor="textarea" className='py-1'>Write post here:</label>


                <textarea id="textarea" name="textarea" rows='4' cols='40'>
                At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
                </textarea>
            </div>
            <div className='border-solid border-2 border-yellow-500 flex justify-center gap-2 py-1'>
                <button className='p-2 flex-1 flex justify-center rounded-md border-solid border-2 border-black'><FaImage /></button>
                <button className='p-2 flex-1 flex justify-center rounded-md border-solid border-2 border-black'><FaVideo /></button>
            </div>
            <div className='border-solid border-2 border-black-500 flex justify-center flex-col gap-1 pt-1'>
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
                <option value="public"> <FaGlobe /> Public</option>
                <option value="friends">Friends</option>
                <option value="onlyMe"><FaLock /> Only Me</option>
            </select>
        </div>
    )
}

function Button({children, type}: {children: React.ReactNode, type?: string}) {
    return (
        <button className={`p-1 rounded-md ${type==='normal'?'bg-green-400':''} flex w-full justify-center items-center gap-2`}>
            {children}
        </button>
    )
}