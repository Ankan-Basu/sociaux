import { HydratedDocument } from "mongoose";
import { useSession } from "next-auth/react";
import { useEffect, useContext, FC } from "react";
import { INotifItem } from "~/server/db/models/Notification";
import { api } from "~/utils/api";
import FrenReq from "./friendReq";
import { NotifContext } from "./navbar";
import NotifItem from "./notifItem";

interface INotifProps {
  display: boolean;
  type: string;
}

const Notif: FC<INotifProps> = ({ display, type }) => {
  const { notifList, friendReqList, setNotifList } = useContext(NotifContext);

  const readNotifMutation = api.notifs.readNotifs.useMutation();

  const session = useSession();

  const handleReadAll = async () => {
    if (session.status !== "authenticated") {
      console.log("UNAUTH");
      return;
    }

    const uname = session.data.user.uname;

    if (!uname) {
      console.log("UNAUTH");
      return;
    }

    const x = await readNotifMutation.mutateAsync({ uname, notifId: "0" });
    // console.log('Notif', x);

    setNotifList(x.notifs);
  };

  return (
    <div
      className={`
      z-30 
      hidden
      ${display ? "lg:block" : "hidden"} fixed
       top-14 right-4 h-100 w-72 overflow-auto 
       rounded-lg border-2 bg-white p-2 
       shadow-lg`}
    >
      <h3 className="text-2xl font-medium">{type}</h3>
      <div className="mb-4">
        {type === "Notifications" ? (
          <span
            onClick={handleReadAll}
            className="cursor-pointer hover:text-primary active:text-primary2"
          >
            Mark all as read
          </span>
        ) : (
          <span className="flex justify-between">
            {/* <span className="cursor-pointer hover:text-primary active:text-primary2">
              Accept All
            </span>
            <span className="cursor-pointer hover:text-primary active:text-primary2">
              Reject All
            </span> */}
          </span>
        )}
      </div>

      {type === "Notifications"
        ? notifList &&
          notifList.map((notif: HydratedDocument<INotifItem>, indx: number) => {
            // console.log(notif);
            return notif && <NotifItem key={indx} notif={notif} />;
          })
        : friendReqList?.map((friendReq: any, indx: number) => {
            return friendReq && <FrenReq key={indx} friendReq={friendReq} />;
          })}
    </div>
  );
};

export default Notif;
