import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type FC, useState, useContext } from 'react'
import { FiEdit, FiSettings, FiLogOut, FiUser, FiX, FiLogIn } from "react-icons/fi";
import { ErrorContext, type ErrorContextType } from '~/contexts/errorContext';
import Loading from '../loading/loading';
import Modal from '../modal/Modal';

const PersonalOptions: FC = () => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const {data, status} = useSession();

    const {setErrorDisplay, setErrorMessage, setErrorType} = useContext(ErrorContext) as ErrorContextType;
    const router = useRouter();
    
  return (
    <div 
    className='hidden sticky /z-20 /z-0 /lg:z-0 
    top-0 left-0
    lg:top-16
    bg-white
    w-screen h-screen
    lg:w-60 lg:h-auto
    p-4 lg:p-1 rounded-lg lg:shadow-lg 
    lg:flex flex-col gap-3'
    >
        <div className='lg:hidden flex justify-end p-2 text-lg'>
            <FiX />
        </div>

        {/* <div className={`
        ${status==='unauthenticated'?'flex': 'hidden'} flex-col gap-3 p-2
        `}>
            UNAUTHORISED
        </div> */}


        <div className={`
        ${status==='loading'?'flex': 'hidden'} flex-col gap-3 p-2
        `}>
            Loading ...
            <Loading height={40} width={40} />
        </div>

        

        <div 
        className={`
        pt-2
        ${status==='authenticated'?'flex':'hidden'} flex-col gap-3
        `}>

        <div className='
            text-xl font-medium flex gap-1
            pl-2
            '>
            Hi, 
            
            <div
            className='text-xl'
            >{data?.user.name} ...
            </div>
            </div>


        <div 
        onClick={()=> setShowModal(currState => !currState)}
        className={`
        p-1 flex justify-center gap-1 items-center
        border-2 border-solid border-primary2 rounded-lg cursor-pointer bg-primary hover:bg-primary2 hover:text-white`}>
            <FiEdit /><h4>Add Post</h4>
            {/* <Modal display={true} 
            customCss=''
            setShowModal={()=>{}} /> */}
        </div>
        <div 
        onClick={() => {
            if (data) {
            if (!data.user.uname) {
                setErrorDisplay(true);
                setErrorMessage('You need to login to perform this action');
                setErrorType('simple');
                return;
            }
                router.push(`/app/user/${data.user.uname}`)
                .then(()=>{}).catch(()=>{});
            }
        }}
        className='p-2 flex gap-1 items-center 
        rounded-lg cursor-pointer hover:bg-primary'
        >
            <FiUser /><h4>My Profile</h4>
        </div>
        <Link href='/app/dashboard'>
        <div className='p-2 flex gap-1 items-center rounded-lg cursor-pointer hover:bg-primary'>
            <FiSettings/>
            <h4>Settings</h4>
        </div>
        </Link>
        <div 
        onClick={() => {
            signOut({
                callbackUrl: '/app/login'
            }).then(()=>{}).catch(()=>{});
        }}
        className='p-2 flex gap-1 items-center rounded-lg cursor-pointer hover:bg-primary'>
            <FiLogOut />
            <h4>Logout</h4>
        </div>
        </div>

<Link href='/app/login'>
        <div 
        className={`
        p-2 
        ${status==='unauthenticated'?'flex':'hidden'} gap-1 items-center 
        rounded-lg cursor-pointer hover:bg-primary
        `}>
            <FiLogIn />
            <h4>Login</h4>
        </div>
        </Link>



        {/* <div className={`
        bg-slate-800/80
        fixed
        w-screen h-screen top-0 left-0
        ${!showModal?'hidden':'flex'} justify-center
        items-center
        `}> */}



            <Modal mode='desktop' display={showModal} setShowModal={setShowModal} />
        {/* </div> */}
    </div>
  )
}

export default PersonalOptions;