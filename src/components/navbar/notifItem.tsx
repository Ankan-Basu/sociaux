import { HydratedDocument } from "mongoose";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useContext, useEffect } from "react";
import { INotifItem } from "~/server/db/models/Notification";
import { api } from "~/utils/api";
import { NotifContext } from "./navbar";

interface INotifProps {
  notif: HydratedDocument<INotifItem>;
}

const NotifItem: FC<INotifProps> = ({ notif }) => {
  const {
    setNotifList,
    setNotifSelected,
    setFriendReqSelected,
    setMobileNotifSelected,
  } = useContext(NotifContext);

  const imgQuery = api.users.getProfileImage.useQuery({ uname: notif.source });

  const readNotifMutation = api.notifs.readNotifs.useMutation();

  const router = useRouter();
  const session = useSession();

  const handleReadNotif = async () => {
    if (session.status !== "authenticated") {
      console.log("UNAUTH");
      return;
    }

    const uname = session.data.user.uname;

    if (!uname) {
      console.log("UNAUTH");
      return;
    }

    const x = await readNotifMutation.mutateAsync({
      uname,
      notifId: notif._id.toString(),
    });
    // console.log('Notif', x);

    setNotifList(x.notifs);
  };

  const handleRedirect = () => {
    handleReadNotif();
    setNotifSelected(false);
    setMobileNotifSelected(false);
    switch (notif.type) {
      case "acceptReq":
        router.push(`/user/${notif.source}`);
        break;

      case "comment":
      case "likeComment":
      case "likePost":
      case "likeReplyComment":
      case "replyToComment":
        router.push(`/post/${notif.postId}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="mb-4 flex gap-1 rounded-lg p-1 shadow-lg">
      <img 
      onClick={() => {
        setNotifSelected(false);
    setMobileNotifSelected(false);
        router.push(`/user/${notif.source}`)
      }}
      src={imgQuery.data?.img} className="h-12 w-12 rounded-full" />
      <div className="w-100 flex-1">
        <div
          onClick={handleRedirect}
          className="h-14 cursor-pointer overflow-hidden text-ellipsis rounded-lg rounded-tl-none  bg-secondary p-1 lg:text-sm"
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
        </div>
        <div
          onClick={handleReadNotif}
          className="cursor-pointer text-xs font-medium hover:text-primary active:text-primary2"
        >
          Mark as read
        </div>
      </div>
    </div>
  );
};

export default NotifItem;
