import { type HydratedDocument } from "mongoose";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type FC, useContext } from "react";
import { type INotifItem } from "~/server/db/models/Notification";
import { api } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { type INotifItemHydrated, NotifContext, type NotifContextType } from "~/contexts/notifContext";
import { ErrorContext, type ErrorContextType } from "~/contexts/errorContext";
import Image from "next/image";

dayjs.extend(relativeTime);

interface INotifProps {
  notif: HydratedDocument<INotifItem> | INotifItemHydrated;
}

const NotifItem: FC<INotifProps> = ({ notif }) => {
  const {
    setNotifList,
    setNotifSelected,
    setMobileNotifSelected,
  } = useContext(NotifContext) as NotifContextType;

  const {setErrorDisplay, setErrorMessage, setErrorType} = useContext(ErrorContext) as ErrorContextType;

  const imgQuery = api.users.getProfileImage.useQuery({ uname: notif.source });

  const readNotifMutation = api.notifs.readNotifs.useMutation();

  const router = useRouter();
  const session = useSession();

  const handleReadNotif = async () => {
    if (session.status !== "authenticated") {
      // console.log("UNAUTH");
      setErrorDisplay(true);
      setErrorMessage('UNAUTHENTICATED');
      setErrorType('logout');
      return;
    }

    const uname = session.data.user.uname;

    if (!uname) {
      // console.log("UNAUTH");
      setErrorDisplay(true);
      setErrorMessage('UNAUTHENTICATED');
      setErrorType('logout');
      return;
    }

    if (!notif._id) {
      setErrorDisplay(true);
      setErrorMessage('An unexpexted error occured');
      setErrorType('simple');
      return;
    }

    const x = await readNotifMutation.mutateAsync({
      uname,
      notifId: notif._id.toString(),
    });
    // console.log('Notif', x);

    if (!setNotifList) {
      // won't happen
      return;
    }

    setNotifList(x.notifs);
  };

  const handleRedirect = () => {
    handleReadNotif()
    .then(()=>{}).catch(()=>{});

    if (!setNotifSelected) {
      // won't happen
      return;
    }
    setNotifSelected(false);

    if (!setMobileNotifSelected) {
      // won't happen
      return;
    }
    setMobileNotifSelected(false);
    switch (notif.type) {
      case "acceptReq":
        router.push(`/app/user/${notif.source}`)
        .then(()=>{}).catch(()=>{});
        break;

      case "comment":
      case "likeComment":
      case "likePost":
      case "likeReplyComment":
      case "replyToComment":
        if (!notif.postId) {
          return;
        }
        router.push(`/app/post/${notif.postId}`)
        .then(()=>{}).catch(()=>{});
        break;
      default:
        break;
    }
  };

  return (
    <div className="mb-4 flex gap-1 rounded-lg p-1 shadow-lg">
      <Image
      alt='photo' 
      width={100} height={100}
      onClick={() => {
        if (!setNotifSelected) {
          // won't happen
          return;
        }
        setNotifSelected(false);

        if (!setMobileNotifSelected) {
          // won't happen
          return;
        }
    setMobileNotifSelected(false);
        router.push(`/app/user/${notif.source}`)
        .then(()=>{}).catch(()=>{});
      }}
      src={imgQuery.data?.img || '/avtar.jpg'} className="h-12 w-12 rounded-full" />
      <div className="w-100 flex-1">
        <div
          onClick={handleRedirect}
          className="h-16 cursor-pointer overflow-hidden text-ellipsis rounded-lg rounded-tl-none  bg-secondary p-1 lg:text-sm
          "
        >
          {notif && (
            <>
              {/* <div>{notif.source}</div>
                    <div>{notif.message}</div> */}
              <span className="font-medium">{`@${notif.source} `}</span>
              {/* {!notif.postId && <>Sent you a friend req</>} */}
              {notif.type === "acceptReq" ? "accepted your friend request" : ""}
              {notif.type === "likePost" ? "likes your post" : ""}
              {notif.type === "comment" ? "commented on your post" : ""}
              {notif.type === "likeComment" ? "likes your comment" : ""}
              {notif.type === "replyToComment" ? "replied to your comment" : ""}
              {notif.type === "likeReplyComment"
                ? "likes your reply comment"
                : ""}
            </>
          )}
          <div className="text-xs">({dayjs(notif.time).fromNow()})</div>
        </div>
        <div
          onClick={() => {
            handleReadNotif()
            .then(()=>{}).catch(()=>{});
          }
        }
          className="cursor-pointer text-xs font-medium hover:text-primary active:text-primary2"
        >
          Mark as read
        </div>
      </div>
    </div>
  );
};

export default NotifItem;
