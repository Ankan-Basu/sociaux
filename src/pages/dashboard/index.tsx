import React, { FC, useEffect, useState } from "react";
import { FiEdit2, FiEdit3, FiX, FiTrash } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";


const Dashboard: FC = () => {

  const session = useSession();

  const [fName, setFName] = useState<string>();
  const [uName, setUName] = useState<string>();
  const [email, setEmail] = useState<string>();
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
      setUName(undefined);
      setEmail(undefined);
      setImg(undefined);
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
    max-w-md
    border-2 border-solid"
    >
      {/* <div>
        <FiX />
       </div> */}
      <div>
        <h2 className="text-3xl font-medium">Dashboard: </h2>
      </div>

      <div>
        <div
          className="
      relative 
      flex items-center justify-center
      border-2 border-solid"
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

        <div
          className="
      flex
      flex-col gap-3 p-4
      "
        >
          
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
  bg-primary p-2
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
        resp = await changeNameMutation.mutateAsync({uname, fName: editedText});
        break;
      
      case 'Email':
        resp = await changeEmailMutation.mutateAsync({uname, email: editedText});
        break;

      default:
        break;
    }
  }

  return (
    <div
    className="
    flex items-center justify-between
    border-2 border-solid"
  >
    <span 
    className={`${editMode?'hidden':'block'}
    py-1`}
    >
      {mode}: {state || 'Loading ...'}
    </span>
      <div
      className={`${editMode?'block':'hidden'}
      flex items-center
      `}
      >{mode}: 
        <form
        onSubmit={handleSubmit}
        className="border-2 border-solid border-green-500
      
        flex gap-2 
        "
        >
          <input 
          className="border-2 border-solid border-blue-500
          bg-secondary2 rounded-lg "
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
          onClick={() => setEditMode(false)}
          >Cancel</button>
        </form>
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

export default Dashboard;
