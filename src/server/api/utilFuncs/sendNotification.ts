import NotificationModel from "~/server/db/models/Notification";

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
  targetId: string;
}
const sendNotification = async ({ uname, source, type, targetId }: x) => {
  const notifListTarget = await NotificationModel.findOne({ uname: uname });

  if (!notifListTarget) {
    // create one
  } else {
    notifListTarget.notifs.push({
      source: source,
      type: type,
      targetId: targetId,
    });

    await notifListTarget.save();
  }
};

export default sendNotification;
