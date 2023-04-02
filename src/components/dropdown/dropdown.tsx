import { FC, useEffect, useRef } from 'react'

interface IOptionsObject {
  optionName: string;
  callback: Function;
}

interface IDropdownProps {
  additionCSS?: string;
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  options: Array<IOptionsObject>;
}

const Dropdown: FC<IDropdownProps> = ({additionCSS='', display, setDisplay, options}) => {

  const dropDownRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    if (!display) {
      document.removeEventListener('click', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    }

  }, [display]);


  const handleClickOutside = (e: MouseEvent) => {
    if (!dropDownRef?.current.contains(e.target)) {
      console.log('CLICK OUTSIDE menu');
      setDisplay && setDisplay(false);
    } else {
      console.log('CLICK INSIDE menu');
      setDisplay && setDisplay(true);
    }
  }

  return (
    <div 
    ref={dropDownRef}
    className={`
    ${additionCSS + ' '}
    absolute
    ${display?'flex':'hidden'}
    flex flex-col gap-1
    bg-white/50 backdrop-blur-md
    border-2 border-solid border-primary
    rounded-lg
    text-base
    p-1
    `}>
      {options.map((option, indx) => {
        return (
          <div key={indx}
          onClick={() => {
            option.callback();
            setDisplay(false);
          }}
          >
          <Options>{option.optionName}</Options>
          </div>
        );
      })}
    </div>
  )
}

interface IOptionsProps {
  children: React.ReactNode;
}
const Options: FC<IOptionsProps> = ({children}) => {
  return (
    <div
      className='
      cursor-pointer
      active:bg-primary lg:hover:bg-primary
      p-1 rounded-lg'
      >
        {children}
      </div>
  )
}

export default Dropdown