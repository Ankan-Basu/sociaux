import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FiEdit2, FiEdit3 } from "react-icons/fi";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const Profile: FC = () => {
  const [fullName, setFullName] = useState<string>();
  const [userName, setUserName] = useState<string>();

  const router = useRouter();

  const uname = router.query.uname;
  const { data, isLoading, isError, refetch } = api.users.getUser.useQuery({
    uname: `${router.query.uname}`,
  });  //change later @


  // useEffect(() => {
  //   if (router.query.uname) {
  //   //   console.log(router.query.uname);
  //     (async () => {
  //       const x = await refetch();
  //       // console.log("USE EFFECT\n", x);
  //       setFullName(x.data?.name);
  //       setUserName(x.data?.uname);
  //     })();
  //   }
  // }, [router]);

  return (
    <div
      className="flex w-screen items-center 
    gap-1 p-1 lg:sticky 
    lg:top-16 lg:w-60 lg:flex-col
    lg:items-stretch lg:gap-3
    "
    >
      {/* <Link href='/user/ayaka'>
<button>Go</button>
</Link> */}
      <div className="relative flex flex-col items-center gap-3 lg:items-baseline lg:gap-0">
        <img
          // src="../ayaka.jpg"
          className="h-36 w-36 rounded-full shadow-lg lg:h-56 lg:w-56"
        />
        <div className="absolute bottom-12 right-0 inline-block rounded-full bg-secondary2 p-3 text-primary shadow-lg lg:bottom-4 lg:right-2">
          <FiEdit3 />
        </div>
        <div className="block lg:hidden">
          <FriendButton />
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
          <FriendButton />
        </div>
        <div>
          <div className="mt-1 flex items-center justify-between p-1 text-sm lg:text-base">
            <h3 className="font-medium">Bio:</h3>

            <span>
              <FiEdit3 />
            </span>
          </div>

          <div className="h-24 overflow-hidden whitespace-pre-wrap rounded-lg bg-secondary2 p-1 text-sm lg:h-28 lg:text-base"></div>
        </div>
      </div>
    </div>
  );
};

const FriendButton: FC = () => {
  return (
    <>
      <button className="rounded-lg border-2 border-solid border-primary2 bg-primary p-1 lg:px-2">
        <span className="text-sm lg:text-base">Add Friend</span>
      </button>
    </>
  );
};

export default Profile;
