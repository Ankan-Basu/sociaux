import { useSession } from "next-auth/react";
import React, { FC, useEffect, useState } from "react";
import { api } from "~/utils/api";

interface IFileUploadModalProps {
  display: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>
  uname: string
}
const FileUploadModal: FC<IFileUploadModalProps> = ({display, setDisplay, uname}) => {

  const session = useSession();
  console.log(session);
  

  const [img, setImg] = useState<string>();

  const profileImgMutation = api.users.uploadProfileImage.useMutation();


  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e);
    console.log(e.target.files);
    const file = e.target.files?e.target.files[0]:null;

    const reader = new FileReader();

    if (!file) {
      return;
    }
    reader.readAsDataURL(file);

    reader.onload = () => {
      // console.log(reader.result);
      if (!reader.result) {
        return;
      }
      const imgStr = reader.result as string
      setImg(imgStr)
  
    }
    reader.onerror = (err) => {
      console.log(err);
    }
}

const handleProfilImgUpload = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!img) {
    console.log('No image selected');
    return;
  }

  if (session.status !== 'authenticated') {
    console.log('UNAUTHORISED');
    return;
  }

  if (uname !== session.data.user.uname) {
    console.log('Dont edit others pic');
    return;
  }

  const x = await profileImgMutation.mutateAsync({uname: session.data?.user.uname, image: img})

}
  
  return (
    <div
    className={`
    fixed top-0 left-0 h-screen w-screen
    z-80
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
        <div className="flex flex-col justify-center items-center gap-3">
        <form 
        onSubmit={handleProfilImgUpload}
        className="flex flex-col justify-center items-center gap-3"
        >
          <input type={'file'} accept='image/*' onChange={handleImg} />
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