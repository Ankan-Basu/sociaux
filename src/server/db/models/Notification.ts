import {Schema, models, model, type Model} from "mongoose";

export interface INotifItem {
    source: string;
    type: 'likePost' | 'comment' | 'replyToComment' | 'likeComment' | 'likeReplyComment' | 'acceptReq';
    postId?: string;
    commentId?: string;
    replyCommentId?: string;
    time?: Date;
    isSend?: boolean;
}

export interface INotification {
    uname: string,
    notifs: INotifItem[]
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
    postId : {
        type: String,
        // required: true,
        default: ''
    },
    commentId : {
        type: String,
        // required: true,
        default: ''
    },
    replyCommentId : {
        type: String,
        // required: true,
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

const NotificationModel = (models.notification as Model<INotification>) || model<INotification>('notification', notificationSchema);
export default NotificationModel;