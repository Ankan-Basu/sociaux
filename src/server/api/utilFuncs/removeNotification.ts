import NotificationModel from "~/server/db/models/Notification";

interface x {
  uname: string;
  source: string;
  type: 'likePost' | 'comment' | 'replyToComment' | 'likeComment' | 'likeReplyComment' | 'acceptReq';
  postId?: string;
  commentId?: string;
  replyCommentId?: string;
}

const removeNotification = async ({uname, source, type, postId = "",
commentId = "",
replyCommentId = "",}: x) => {
  const notifListTarget = await NotificationModel.findOne({uname: uname});

  if (!notifListTarget) {
    // create one
  } else {
    const newNotifs = notifListTarget.notifs.filter((notif) => {
      return !(notif.source === source 
        && notif.type === type 
        && notif.postId === postId
        && notif.commentId === commentId
        && notif.replyCommentId === replyCommentId)
    });

    notifListTarget.notifs = newNotifs;

    await notifListTarget.save();
  }

}

export default removeNotification;