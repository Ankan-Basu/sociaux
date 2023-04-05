import type { HydratedDocument } from 'mongoose';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useRef } from 'react'
import type {FC} from 'react';
import { IUser } from '~/server/db/models/User';
import { api } from '~/utils/api';
import Loading from '../loading/loading';

interface IResultDropdownProps {
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>
  searchBoxRef: React.MutableRefObject<null>;
  additionCss?: string;
  results: Array<HydratedDocument<IUser>>
  searchQuery: any
}

const ResultDropdown: FC<IResultDropdownProps> = ({display, setDisplay, searchBoxRef, additionCss='', results=[], searchQuery}) => {
  const refOne = useRef<HTMLDivElement>(null);


  useLayoutEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    if (!display) {
      document.removeEventListener('click', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    }

  }, [display]);

  const handleClickOutside = (e: MouseEvent) => {
   
    if (e.target === null) {
      return;
    }

    if (refOne === null || refOne.current === null) {
      return;
    }

    if (searchBoxRef === null || searchBoxRef.current === null) {
      return;
    }

    //@ts-ignore
    if (!refOne.current.contains(e.target) && !searchBoxRef.current.contains(e.target)) {
      console.log('CLICK OUTSIDE search');
      setDisplay && setDisplay(false);
    } else {
      console.log('CLICK INSIDE search');
      setDisplay && setDisplay(true);
    }
  }

  if (searchQuery.isFetching && results.length === 0) {
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
    justify-center 
    `}
    >
      <Loading width={40} height={40} />
      </div>
    );
  }


  if (searchQuery.isFetched && results.length === 0) {
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
    justify-center 
    `}
    >
      No results
      </div>
    );
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
          <Result key={result.uname} result={result} setDisplay={setDisplay} />
        );
      })
      }
    </div>
  )
}


interface IResultProps {
  result: HydratedDocument<IUser>;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>
}

const Result: FC<IResultProps> = ({result, setDisplay}) => {
  const router = useRouter();
  const imgQuery = api.users.getProfileImage.useQuery({uname: result.uname});

  return (
    <div 
    onClick={() => {
      router.push(`/user/${result.uname}`);
      setDisplay(false);
    }}
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