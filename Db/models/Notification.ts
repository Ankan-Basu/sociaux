import {Schema, models, model} from "mongoose";

interface INotifItem {
    source: string,
    message: string,
    link: string,
    time: Date,
    isSend: boolean
}

interface INotification {
    uname: string,
    notifs: [INotifItem]   
}

const notifItemSchema: Schema = new Schema<INotifItem> ({
    source: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
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
        required: true
    },
    notifs: [notifItemSchema] 
});

var NotificationModel = models.notification || model<INotification>('notification', notificationSchema);
export default NotificationModel;