import React, { FC } from "react";
import {
  FiEdit,
  FiSettings,
  FiLogOut,
  FiUser,
  FiX,
  FiLogIn,
} from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface IPersonalOptionsMobileProps {
  toShow: boolean;
  toggleToShow: Function;
  setShowModal: Function;
}

const PersonalOptionsMobile: FC<IPersonalOptionsMobileProps> = ({
  toShow,
  toggleToShow,
  setShowModal,
}) => {
  // console.log(toShow);

  const session = useSession();

  return (
    <div
      className={`
        ${toShow ? "" : "hidden"}
        fixed top-0 left-0 
        z-20 flex
        h-screen
        w-screen flex-col
        gap-3 rounded-lg
        bg-white p-4 lg:z-0`}
    >
      <div
        onClick={() => toggleToShow((currState: boolean) => !currState)}
        className="flex justify-end p-2 text-lg active:text-primary lg:hidden"
      >
        <FiX />
      </div>
      <div
        className={`
        ${session.status === "loading" ? "flex" : "hidden"} flex-col gap-3 p-2
        `}
      >
        Loading ...
      </div>

      <div
        className={`
            ${session.status === "authenticated" ? "flex" : "hidden"}
            flex-col gap-3
            `}
      >
        <div
          className="
            flex gap-1 pl-2 text-xl
            font-medium
            "
        >
          Hi,
          <div className="text-xl">{session.data?.user.name}</div>
        </div>

        <div
          onClick={() => {
            setShowModal(true);
            toggleToShow(false);
          }}
          className="flex cursor-pointer items-center justify-center gap-1
            rounded-lg border-2 border-solid border-primary2 bg-primary p-1 hover:bg-primary2 hover:text-white"
        >
          <FiEdit />
          <h4>Add Post</h4>
        </div>
        <div className="flex cursor-pointer items-center gap-1 rounded-lg p-2 hover:bg-primary">
          <FiUser />
          <h4>My Profile</h4>
        </div>
        <Link href='/dashboard'>
        <div className="flex cursor-pointer items-center gap-1 rounded-lg p-2 hover:bg-primary">
          <FiSettings />
          <h4>Settings</h4>
        </div>
        </Link>
        <div
          onClick={() => {
            signOut({
              callbackUrl: "/login",
            });
          }}
          className="flex cursor-pointer items-center gap-1 rounded-lg p-2 hover:bg-primary"
        >
          <FiLogOut />
          <h4>Logout</h4>
        </div>
      </div>
      <Link href="/login">
        <div
          className={`
        p-2 
        ${
          session.status === "unauthenticated" ? "flex" : "hidden"
        } cursor-pointer items-center 
        gap-1 rounded-lg hover:bg-primary
        `}
        >
          <FiLogIn />
          <h4>Login</h4>
        </div>
      </Link>
    </div>
  );
};

export default PersonalOptionsMobile;
