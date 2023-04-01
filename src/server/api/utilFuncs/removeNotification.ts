import NotificationModel from "~/server/db/models/Notification";

interface x {
  uname: string;
  source: string;
  type: 'likePost' | 'comment' | 'replyToComment' | 'likeComment' | 'likeReplyComment' | 'acceptReq';
  targetId: string;
}

const removeNotification = async ({uname, source, type, targetId}: x) => {
  const notifListTarget = await NotificationModel.findOne({uname: uname});

  if (!notifListTarget) {
    // create one
  } else {
    const newNotifs = notifListTarget.notifs.filter((notif) => {
      return !(notif.source === source && notif.type === type && notif.targetId === targetId)
    });

    notifListTarget.notifs = newNotifs;

    await notifListTarget.save();
  }

}

export default removeNotification;