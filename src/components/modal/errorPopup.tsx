import { type FC } from "react";
import { signOut } from 'next-auth/react';
import { useRouter } from "next/router";

interface IErrorPopupProps {
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  type: 'simple' | 'redirect' | 'logout' | 'redirectLogin' | undefined;
}

const ErrorPopup: FC<IErrorPopupProps> = ({display, setDisplay, message, type}) => {

  const router = useRouter();

  const handleClick = () => {
    setDisplay(false);
    switch(type) {
      case "simple":
        break;
      case "redirect":
        // write here
        router.push('/app/feed')
        .then(()=>{}).catch(()=>{});
        break;
      case "logout":
        signOut({callbackUrl: '/login'}).then(()=>{}).catch(()=>{});
        break;
      case "redirectLogin":
        router.push('/app/login')
        .then(()=>{}).catch(()=>{});
        break;
    }
  }
  
  return (
    <div className={`
    fixed top-0 left-0 h-screen w-screen bg-gray-500/50 backdrop-blur-lg
    ${display?'flex':'hidden'} justify-center items-center z-80
    `}>

      <div className={`
      bg-white h-28 w-72 rounded-lg mb-8 p-2
      flex flex-col justify-between
      `
      }>
        <div className='flex justify-center
        '>
          {message}
          
        </div>
        <div className='
        
        flex justify-center
        '>
          <button
          onClick={handleClick}
          className='
          bg-primary active:bg-primary2 active:text-white
          lg:hover:bg-primary2 lg:hover:text-white 
          lg:active:bg-primary lg:active:text-white
          p-1 rounded-lg w-full
          '
          >
            OK
          </button>

        </div>
      </div>


    </div>
  )
}

export default ErrorPopup;