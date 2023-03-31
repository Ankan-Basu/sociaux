import React, { FC, useEffect, useState } from "react";
import { FiEdit2, FiEdit3, FiX, FiTrash } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { TRPCClientError } from "@trpc/client";
import { AppRouter } from "~/server/api/root";
import { useRouter } from "next/router";


const Dashboard: FC = () => {

  const session = useSession();

  const [fName, setFName] = useState<string>();
  const [uName, setUName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [bio, setBio] = useState<string>();
  const [img, setImg] = useState<string>();

  let uname = session.data?.user.uname || '';

  const userQueryInitial = api.users.getUser.useQuery({uname});
  const imgQueryInitial = api.users.getProfileImage.useQuery({uname});

  let userQuery;
  

  useEffect(() => {
    if (session.status === 'authenticated') {
      (async () => {
        userQuery = await userQueryInitial.refetch();

        if (userQuery.status === 'success') {
          console.log('USER', userQuery);
          
          setFName(userQuery.data?.name);
          // setUName(userQuery.data?.uname);
          setEmail(userQuery.data?.email);
          setBio(userQuery.data?.bio);
        }

      })();
      (async () => {
        const imgQuery = await imgQueryInitial.refetch();

        if (imgQuery.status === 'success') {
          setImg(imgQuery.data.img);
        }        
      })();
    }
  }, [session]);

  useEffect(() => {
    return () => {
      setFName(undefined);
      // setUName(undefined);
      setEmail(undefined);
      setImg(undefined);
      setBio(undefined);
    }
  }, [])

  if (session.status === "loading") {
    return <>Loading ...</>;
  } else if (session.status === "unauthenticated") {
    return <>UNAUTHORISED</>;
  }

  return (
    <div
      className="
    w-screen
    max-w-md"
    >

      <div>
        <h2 className="text-3xl font-medium p-2">Dashboard: </h2>
      </div>

      <div>
        <div
          className="
      relative 
      flex items-center justify-center"
        >
          <img
            src={img}
            className="
        h-36 w-36 rounded-full
        "
          ></img>

          <div
            className="
        absolute bottom-2 
        ml-28 inline-block
        rounded-full bg-secondary2 p-3 text-primary shadow-lg"
          >
            <FiEdit3 />
          </div>
        </div>


          </div>

        <div
          className="
          flex
          flex-col gap-3 p-4
          ">
        <Bio bio={bio || ''}/>
          <DataField mode='Name' data={fName || ''} />
          <DataField mode='Uname' data={uname} />
          <DataField mode='Email' data={email || ''} />
          <div>
            <button
              className="
  flex items-center
  justify-center gap-2 rounded-lg 
  border-2 
  border-solid border-primary2
  bg-primary p-1
  active:bg-primary2 active:text-white
  lg:hover:bg-primary2 lg:hover:text-white lg:active:bg-primary lg:active:text-black
  "
            >
              <FiTrash />
              Delete Account
            </button>
          </div>
        </div>
      </div>
  
  );
};

interface IDataFieldProps {
  mode: string;
  data: string;
}
const DataField: FC<IDataFieldProps> = ({mode, data}) => {

  const session = useSession();

  const [state, setState] = useState<string>(data);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>('');

  const changeNameMutation = api.users.modifyName.useMutation();
  const changeEmailMutation = api.users.modifyEmail.useMutation();

  useEffect(() => { setState(data); }, [data])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('Submit event');
    
    if (session.status !== 'authenticated') {
      console.log('Unauthenticated');
      return;
    }

    if (!editedText) {
      return;
    }

    const uname = session.data.user.uname;
    console.log(editedText);
    
    let resp = undefined;

    switch(mode) {
      case 'Name':
        try {
          resp = await changeNameMutation.mutateAsync({uname, fName: editedText});
          setState(editedText)
          setEditedText('');
          setEditMode(false);
        } catch(err) {
          console.log(err);
        }
        break;
      
      case 'Email':
        try {
          resp = await changeEmailMutation.mutateAsync({uname, email: editedText});
          setEditedText('');
          setEditMode(false);
        } catch(err) {
          console.log(err);
          
        }
        break;

      default:
        break;
    }
  }

  return (
    <div
    className="
    flex items-center justify-between
   px-2 py-1
    "
  >
    <span 
    className={`${editMode?'hidden':'block'}
    py-1`}
    >
      <span className="font-medium">{mode}:</span> {state || 'Loading ...'}
    </span>
      
      
      <div
      className={`${editMode?'block':'hidden'}
      flex gap-1 
      sm:items-center flex-col items-stretch sm:flex-row justify-center
      `}
      >
        <span className="font-medium">{mode}:</span>
      <div className="min-w-0 flex-1">
        
        <form
        onSubmit={handleSubmit}
        className="
        w-full
        flex gap-2 
        "
        >
          <input 
          className="
          bg-secondary2 rounded-lg w-full p-1"
          type='text'
          placeholder={`New ${mode}`} 
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          />
          
          <button 
          className="p-1 bg-primary rounded-lg text-sm"
          type='submit'>Submit</button>
          <button
          className="p-1 bg-deactiv rounded-lg text-sm"
          type="button"
          onClick={() => setEditMode(false)}
          >Cancel</button>
        </form>
        </div>
      </div>



    <span 
    onClick={() => setEditMode(true)}
    className={`cursor-pointer
    ${editMode?'hidden':'block'}
    ${mode==='Uname'?'hidden':'block'}
    `}
    >
      <FiEdit3 />
    </span>
  </div>
  )
}

interface IBioProps  {bio: string;}
const Bio: FC<IBioProps> = ({bio}) => {
  const [state, setState] = useState<string>(bio);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>('');

  const changeBioMutation = api.users.modifyBio.useMutation();

  const session = useSession();

  const router = useRouter();

  useEffect(() => {
    setState(bio);
  }, [bio])
  const handleSubmitBio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('Submit', editedText);

    if (session.status === 'unauthenticated') {
      console.log('Error');
      return;
    }

    if (session.status === 'loading') {
      // console.log('Error');
      return;
    }

    const uname = session.data?.user.uname;

    if (!uname) {
      console.log('Unauth');
      return;
    }

    try {
      const x = await changeBioMutation.mutateAsync({uname, bio: editedText});
      setState(editedText);
      setEditedText('');
      setEditMode(false);
      
    } catch(err: TRPCClientError<AppRouter>) {
      console.log(err);
      return;
    }
    
  }

  return (
    <div
    className="
    flex gap-1 justify-between
    px-2 py-2 bg-deactiv rounded-lg
    ">
      
      <span className="font-medium">Bio:</span>
      <div className={`
      ${editMode?'hidden':'block'}
      border-2 border-solid border-gray-300 rounded-lg
      overflow-hidden whitespace-pre-wrap flex-1 p-1 pt-0`}>
      {state}
      </div>
      
      <form
      onSubmit={handleSubmitBio}
      className={`
      ${editMode?'flex':'hidden'}
      gap-1 flex-1
      `}
      >
        <textarea 
        className="h-24 overflow-hidden 
        whitespace-pre-wrap rounded-lg bg-secondary2 
        p-1 text-sm lg:h-28 lg:text-base flex-1" 
        placeholder="Enter new bio"
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        />
        <div 
        className="flex flex-col gap-1"
        >
        <button type='submit'
        className="p-1 rounded-lg bg-primary"
        >Submit</button>
        <button
        type="button"
        onClick={() => setEditMode(false)}
        className="p-1 rounded-lg bg-deactiv"
        >Cancel</button>
        </div>
      </form>
      <span 
    onClick={() => setEditMode(true)}
    className={`cursor-pointer
    ${editMode?'hidden':'block'}
    `}
    >
      <FiEdit3 />
    </span>
    </div>
  );
}

export default Dashboard;
