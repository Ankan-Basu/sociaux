import { useSession } from "next-auth/react";
import { useContext, type FC } from "react";
import { type IFriendReqItemHydrated, type INotifItemHydrated, NotifContext, type NotifContextType } from "~/contexts/notifContext";
import { api } from "~/utils/api";
import FrenReq from "./friendReq";
import NotifItem from "./notifItem";

interface INotifProps {
  display: boolean;
  type: string;
}

const Notif: FC<INotifProps> = ({ display, type }) => {
  const { notifList, friendReqList, setNotifList } = useContext(NotifContext) as NotifContextType;

  const readNotifMutation = api.notifs.readNotifs.useMutation();

  const session = useSession();

  const handleReadAll = async () => {
    if (session.status !== "authenticated") {
      return;
    }

    const uname = session.data.user.uname;

    if (!uname) {
      return;
    }

    const x = await readNotifMutation.mutateAsync({ uname, notifId: "0" });

    if (!setNotifList) {
      //err //maybe ignore coz i know i didn't do error while writing the code
      return;
    }
    setNotifList(x.notifs);
  };

  return (
    <div
      className={`
      hidden z-20
      ${display ? "lg:block" : "hidden"} fixed
       top-14 right-4 h-100 w-72 overflow-auto 
       rounded-lg border-2 bg-white p-2 
       shadow-lg`}
    >
      <h3 className="text-2xl font-medium">{type}</h3>
      <div className="mb-4">
        {type === "Notifications" ? (
          <span
            onClick={() => {
              handleReadAll()
              .then(()=>{}).catch(()=>{});
            }
          }
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
          notifList.map((notifItem: INotifItemHydrated, indx: number, arr: Array<INotifItemHydrated>) => {
            // map in reverse order
            return arr[arr.length - 1 -indx]? <NotifItem key={indx} notif={arr[arr.length - 1 -indx]!} />:<></>;
          })
        : friendReqList?.map((friendReq: IFriendReqItemHydrated, indx: number, arr: Array<IFriendReqItemHydrated>) => {


            return arr[arr.length -1 - indx]?<FrenReq key={indx} friendReq={arr[arr.length -1 - indx]!} />:<></>;
          })}
    </div>
  );
};

export default Notif;
