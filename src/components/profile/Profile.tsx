import { type FC, useEffect, useState, useContext } from "react";
import { FiEdit3 } from "react-icons/fi";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import FileUploadModal from "./fileUploadModal";
import { useSession } from "next-auth/react";
import ButtonTest from "./button";
import Image from "next/image";
import Loading from "../loading/loading";
import { ErrorContext, ErrorContextType } from "~/contexts/errorContext";
import { TRPCClientError } from "@trpc/client";
import Test from "../test/test";

const Profile: FC = () => {
  const [fullName, setFullName] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [bio, setBio] = useState<string>();
  const [img, setImg] = useState<string>();

  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

  const {setErrorDisplay, setErrorMessage, setErrorType} = useContext(ErrorContext) as ErrorContextType;

  const router = useRouter();

  const uname = router.query.uname;
  const { data, isLoading, isError, refetch } = api.users.getUser.useQuery({
    uname: `${router.query.uname}`,
  });

  const imgQuery = api.users.getProfileImage.useQuery({
    uname: `${router.query.uname}`,
  });

  const session = useSession();

  useEffect(() => {
    if (router.query.uname) {
      (async () => {
        
        refetch()
        .then((resp) => {
          // console.log('IN THEN, resp', resp);

          if (resp.status === 'success') { 
            setFullName(resp.data?.name);
            setUserName(resp.data?.uname);
            setBio(resp.data?.bio);
          } else {
            let err = resp.error;
            setErrorDisplay(true);
          let msg = 'An unexpected error occured';
          if (err instanceof TRPCClientError) {
            msg = err.data.code || msg;
          }
          setErrorMessage(msg);
          setErrorType('redirect');
          }
        })
        .catch((err) => {
          // console.log("PROFILE err", err);
          setErrorDisplay(true);
          let msg = 'An unexpected error occured';
          if (err instanceof TRPCClientError) {
            msg = err.data.code || msg;
          }
          setErrorMessage(msg);
          setErrorType('redirect');
        });

        imgQuery.refetch().then((resp) => {
          setImg(resp.data?.img);
        });
      })();
    }
    return () => {
      setFullName(undefined)
      setUserName(undefined)
      setImg(undefined)
    }
  }, [router]);


  if (isLoading) {
    return (
      <>
      <div
      className="flex w-screen items-center /justify-center
    gap-1 p-1 lg:sticky 
    lg:top-16 lg:w-60 lg:flex-col
    lg:items-stretch lg:gap-3 z-0
    "
    >
    <div className="relative flex flex-col items-center gap-3 lg:items-baseline lg:gap-0">
        
        <div className="relative h-36 w-36 rounded-full shadow-lg lg:h-56 lg:w-56">
          {/* //img */}
          <Image src={img || '/avtar.jpg'} fill={true}  alt='photo' className="rounded-full" />
        </div>
        
        <div className="block lg:hidden">
        </div>
      </div>


      <div className="flex flex-1 flex-col gap-1 rounded-lg bg-white p-1 shadow-lg lg:flex-none">

          <div className="flex justify-center items-center">
        <Loading height={100} width={100} />

          </div>
        {/* <div className="flex flex-col rounded-lg p-1">
          <div>
            <h2 className="text-lg font-semibold">
              {"Loading..."}
            </h2>
          </div>
          <div>
            <h2 className="text-sm font-medium lg:text-base">
              {"Loading..."}
            </h2>
          </div>
        </div>
        <div className="mt-1 hidden lg:block">
         
        </div>
        <div>
          <div className="mt-1 flex items-center justify-between p-1 text-sm lg:text-base">
            <h3 className="font-medium">Bio:</h3>
          </div>

          <div className="h-24 overflow-hidden whitespace-pre-wrap rounded-lg bg-secondary2 p-1 text-sm lg:h-28 lg:text-base"></div>
        </div> */}
      </div>
    </div>
      </>
    )
  }
  return (
    <div
      className="flex w-screen items-center 
    gap-1 p-1 lg:sticky 
    lg:top-16 lg:w-60 lg:flex-col
    lg:items-stretch lg:gap-3 z-0
    "
    >
      {/* <Link href='/user/ayaka'>
<button>Go</button>
</Link> */}
      <div className="relative flex flex-col items-center gap-3 lg:items-baseline lg:gap-0">
        {/* <img
          src={img}
          className="h-36 w-36 rounded-full shadow-lg lg:h-56 lg:w-56"
        /> */}
        <div className="relative h-36 w-36 rounded-full shadow-lg lg:h-56 lg:w-56">
          <Image src={img || '/avtar.jpg'} fill={true}  alt='photo' className="rounded-full" />
        </div>
        
        {/* <div
          className={`absolute bottom-12 right-0 
          ${(session.data?.user.uname === router.query.unmae)?'inline-block':'hidden'} rounded-full bg-secondary2 p-3 text-primary shadow-lg lg:bottom-4 lg:right-2`}
          onClick={() => {
            // setShowUploadModal(true);
            router.push('/app/dashboard')
          }}
        >
          <FiEdit3 />
        </div> */}
        {/* <div>Upload</div> */}
        <div className="block lg:hidden">
          {/* <FriendButton /> */}
          {router.query.uname && typeof router.query.uname === "string" && (
            <ButtonTest profileUname={router.query.uname} />
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 rounded-lg bg-white p-1 shadow-lg lg:flex-none">
        <div className="flex flex-col rounded-lg p-1">
          <div>
            <h2 className="text-lg font-semibold">
              {/* Kamisato Ayaka */}
              {fullName || "Loading..."}
            </h2>
          </div>
          <div>
            <h2 className="text-sm font-medium lg:text-base">
              {/* @aether_simp */}
              {userName || "Loading..."}
            </h2>
          </div>
        </div>
        <div className="mt-1 hidden lg:block">
          {/* <FriendButton /> */}
          {router.query.uname && typeof router.query.uname === "string" && (
            <ButtonTest profileUname={router.query.uname} />
          )}
        </div>
        <div>
          <div className="mt-1 flex items-center justify-between p-1 text-sm lg:text-base">
            <h3 className="font-medium">Bio:</h3>

            {/* <span>
              <FiEdit3 />
            </span> */}
          </div>

          <div className="h-24 overflow-hidden whitespace-pre-wrap rounded-lg bg-secondary2 p-1 text-sm lg:h-28">
            {bio}
          </div>
        </div>
      </div>
      {uname ? (
        <FileUploadModal
          display={showUploadModal}
          setDisplay={setShowUploadModal}
          uname={userName || ''}
          setProfileImg={setImg}
        />
      ) : (
        <></>
      )}

      {/* {router.query.uname &&
typeof router.query.uname === 'string' &&
<ButtonTest profileUname={router.query.uname} />
 }  */}
    </div>
  );
};

// const FriendButton: FC = () => {
//   const session = useSession();
//   const router = useRouter();

//   const frienReqMutation = api.friends.sendFriendReq.useMutation();

//   const sendFriendReq = async () => {
//     console.log("Freind req");

//     if (session.status !== "authenticated") {
//       console.log("LOGIN PLZ");
//       return;
//     }

//     if (!router.query.uname) {
//       console.log("WHo req to send?");
//       return;
//     }

//     const requesterUname = session.data.user.uname;
//     const targetUname = router.query.uname as string;

//     if (!requesterUname || !targetUname) {
//       console.log("UnauThorIseD");
//       return;
//     }

//     try {
//       const x = frienReqMutation.mutateAsync({ requesterUname, targetUname });
//       console.log(x);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={sendFriendReq}
//         className="rounded-lg border-2 border-solid border-primary2 bg-primary p-1 lg:px-2"
//       >
//         <span className="text-sm lg:text-base">Add Friend</span>
//       </button>
//     </>
//   );
// };

export default Profile;
