import { FC } from 'react'

interface IOptionsObject {
  optionName: string;
  callback: Function;
}

interface IDropdownProps {
  additionCSS?: string;
  display: boolean;
  options: Array<IOptionsObject>;
}

const Dropdown: FC<IDropdownProps> = ({additionCSS='', display, options}) => {
  return (
    <div className={`
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
          onClick={() => option.callback()}
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