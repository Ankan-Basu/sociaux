import { useState } from 'react'
import { FiPlus } from 'react-icons/fi';
import PersonalOptionsMobile from '../PersonalOptions/PersonalOptionsMobile';

export default function Plus() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  
  return (
    <div 
    className='active:bg-primary2 z-10 fixed bottom-6 right-6 shadow-2xl h-14 w-14 flex lg:hidden justify-center items-center bg-primary rounded-full'
    >
        <span
        onClick={() => {
          console.log(menuOpen)
          setMenuOpen((currState) => !currState)
        }} 
        className='text-3xl active:text-white p-1'
        >
            <FiPlus />
        </span>

        <PersonalOptionsMobile toShow={menuOpen} toggleToShow={setMenuOpen}/>
    </div>
  )
}
