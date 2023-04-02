import { HydratedDocument } from 'mongoose';
import React, { FC, useEffect, useRef } from 'react'
import { IUser } from '~/server/db/models/User';
import { api } from '~/utils/api';

interface IResultDropdownProps {
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>
  searchBoxRef: React.MutableRefObject<null>;
  additionCss?: string;
  results: Array<HydratedDocument<IUser>>
}

const ResultDropdown: FC<IResultDropdownProps> = ({display, setDisplay, searchBoxRef, additionCss='', results=[]}) => {
  const refOne = useRef(null);


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
    if (!refOne?.current.contains(e.target) && !searchBoxRef?.current.contains(e.target) ) {
      console.log('CLICK OUTSIDE');
      setDisplay && setDisplay(false);
    } else {
      console.log('CLICK INSIDE');
      setDisplay && setDisplay(true);
    }
  }

  return (
    <div
    ref={refOne}
    className={`
    ${additionCss + ' '}
    absolute
    p-1 h-56
    overflow-auto
    rounded-lg rounded-t-none
    shadow-lg
    bg-white
    ${display?'flex':'hidden'}
    flex-col gap-2
    `}
    >
      {results && 
      results.map((result) => {
        return (
          <Result key={result.uname} result={result}/>
        );
      })
      }
    </div>
  )
}


interface IResultProps {
  result: HydratedDocument<IUser>
}

const Result: FC<IResultProps> = ({result}) => {
  const imgQuery = api.users.getProfileImage.useQuery({uname: result.uname});

  return (
    <div 
    className='
    cursor-pointer
    rounded-lg
    
    w-full
    flex gap-1
    '
    >
      <div
      className='
     
      h-12 w-12 
      '
      >
        <img src={imgQuery.data?.img}
        className='rounded-full'
        />
        </div>
      <div
      className='
      bg-secondary rounded-lg p-1
      flex-1
      '
      >
        <div className='font-medium'>{result.name}</div>
      <div 
      className='text-sm'
      >{`@${result.uname}`}</div>
      </div>
    </div>
  );
}

export default ResultDropdown