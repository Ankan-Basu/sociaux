import { TRPCClientError } from "@trpc/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { FiImage, FiX } from "react-icons/fi";
import { ErrorContext, type ErrorContextType } from "~/contexts/errorContext";
import { api } from "~/utils/api";

interface IFileUploadModalProps {
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  uname: string;
  setProfileImg: React.Dispatch<React.SetStateAction<string | undefined>>;
}
const FileUploadModal: FC<IFileUploadModalProps> = ({display, setDisplay, uname, setProfileImg}) => {

  const session = useSession();  

  const [img, setImg] = useState<string>();

  const profileImgMutation = api.users.uploadProfileImage.useMutation();

  const {setErrorDisplay, setErrorMessage, setErrorType} = useContext(ErrorContext) as ErrorContextType;

  const formRef = useRef<HTMLInputElement>(null);

  const router = useRouter(); 


  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e);
    console.log(e.target.files);
    const file = e.target.files?e.target.files[0]:null;

    const reader = new FileReader();

    if (!file) {
      setErrorDisplay(true);
      setErrorMessage('No image chosen');
      setErrorType('simple');
      return;
    }
    reader.readAsDataURL(file);

    reader.onload = () => {
      // console.log(reader.result);
      if (!reader.result) {
        setErrorDisplay(true);
      setErrorMessage('An unexpected error occured');
      setErrorType('simple');
        return;
      }
      const imgStr = reader.result as string
      setImg(imgStr)
  
    }
    reader.onerror = (err) => {
      // console.log(err);
      setErrorDisplay(true);
      setErrorMessage('An unexpected error occured');
      setErrorType('simple');
    }
}

const handleProfilImgUpload = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!img) {
    // console.log('No image selected');
    setErrorDisplay(true);
      setErrorMessage('No image chosen');
      setErrorType('simple');
    return;
  }

  if (session.status !== 'authenticated') {
    // console.log('UNAUTHORISED');
    setErrorDisplay(true);
      setErrorMessage('You need to login to upload profile picture');
      setErrorType('logout');
    return;
  }

  if (uname !== session.data.user.uname) {
    // console.log('Dont edit others pic');
    setErrorDisplay(true);
      setErrorMessage('UNAUTHORISED');
      setErrorType('logout');
    return;
  }

  try {

    const x = await profileImgMutation.mutateAsync({uname: session.data?.user.uname, image: img});
    setDisplay(false);
    
    
    setProfileImg(img);
    // console.log(newImg)
    // router.push(`/user/${session.data.user.uname}`);
    // router.push('/dashboard');
  } catch(err) {
    // console.log(err)
    setErrorDisplay(true);
    let msg = 'An unknown error occured';
    if (err instanceof TRPCClientError) {
      msg = err.data.code;
    }
      setErrorMessage(msg);
      setErrorType('simple');
  }

}
  
  return (
    <div
    className={`
    fixed top-0 left-0 h-screen w-screen
    z-50
    bg-gray-500/50
    backdrop-blur-sm
    ${display?'flex':'hidden'}
    justify-center items-center
    `}
    >
      <div
      className={`
      w-100
      bg-white
      rounded-lg
      p-2
      `}
      >
        {/* <div>
          <FiX />
        </div> */}
        <div className="flex flex-col justify-center items-center gap-3 p-2">
          <div className={`
          ${img?'block':'hidden'}
          border-2 border-solid border-red-500 relative`}>
            <span 
            onClick={() => {
              setImg('');
              if (!formRef.current) {
                return;
              }
              formRef.current.value = '';
            }}
            className="absolute bg-secondary2 text-primary p-2 rounded-full -top-4 -right-4" >
            <FiX />
            </span>
            <Image src={img || ''} height={100} width={100} alt={'image'} />
            </div>
        <form 
        onSubmit={handleProfilImgUpload}
        className="flex flex-col justify-center items-center gap-3"
        >
          <input type={'file'} accept='image/*' onChange={handleImg} ref={formRef} className='invisible' />
          <button 
          onClick={() => {
            formRef.current?.click();
          }}
          type='button'
          className="p-2 rounded-lg bg-deactiv flex justify-center items-center gap-1"
          ><FiImage />Choose Image</button>
          <button type="submit"
          className="
          p-2 rounded-lg 
          bg-primary
          hover:bg-primary2 hover:text-white
          active:bg-primary active:text-black
          lg:hover:bg-primary2 lg:hover:text-white
          "
          >Upload</button>
        </form>
          <button 
          className="
          p-2 rounded-lg bg-deactiv"
          onClick={() => setDisplay(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default FileUploadModal;