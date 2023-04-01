import mongoose, {Schema, models, model} from "mongoose";

interface INotifItem {
    source: string;
    // message: string;
    type: 'likePost' | 'comment' | 'replyToComment' | 'likeComment' | 'likeReplyComment' | 'acceptReq';
    targetId?: string;
    // for likePost /comment - postId, replyComment/likeComment - commentId
    // likeReplyComment - , acceptReq - userId  
    time?: Date;
    isSend?: boolean;
}

export interface INotification {
    uname: string,
    notifs: [INotifItem]   
}

const notifItemSchema: Schema = new Schema<INotifItem> ({
    source: {
        type: String,
        required: true
    },
    // message: {
    //     type: String,
    //     required: true
    // },
    type: {
        type: String,
        required: true
    },
    targetId : {
        type: String,
        required: true,
        default: ''
    },
    time: {
        type: Date,
        required: true,
        default: Date.now()
    },
    isSend: {
        type: Boolean,
        required: true,
        default: false
    }
})

const notificationSchema: Schema = new Schema<INotification>({
    uname: {
        type: String,
        required: true,
        unique: true
    },
    notifs: {
        type: [notifItemSchema],
        required: true,
        default: []
    } 
});

var NotificationModel = (models.notification as mongoose.Model<INotification>) || model<INotification>('notification', notificationSchema);
export default NotificationModel;