import NotificationModel, { INotifItem } from "~/server/db/models/Notification";

interface x {
  uname: string;
  source: string;
  type:
    | "likePost"
    | "comment"
    | "replyToComment"
    | "likeComment"
    | "likeReplyComment"
    | "acceptReq";
  postId?: string;
  commentId?: string;
  replyCommentId?: string;
}
const sendNotification = async ({
  uname,
  source,
  type,
  postId = "",
  commentId = "",
  replyCommentId = "",
}: x) => {
  const notifListTarget = await NotificationModel.findOne({ uname: uname });

  const obj: INotifItem = {
    source: source,
    type: type,
  }
  if (postId) {
    obj.postId = postId
  }
  if (commentId) {
    obj.commentId = commentId
  }
  if (replyCommentId) {
    obj.replyCommentId = replyCommentId
  }

  if (!notifListTarget) {
    // create one
    NotificationModel.create({
      uname: uname,
      notifs: [obj]
    })

  } else {    
    notifListTarget.notifs.push(obj);

    await notifListTarget.save();
  }
};

export default sendNotification;
