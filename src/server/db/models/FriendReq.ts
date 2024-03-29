import {Schema, models, model, type Model} from "mongoose";

export interface IFriendReqItem {
    source: string;
    time?: Date;
}

interface IFriendReqs {
    uname: string;
    reqs: IFriendReqItem[];
}

const friendReqItemSchema: Schema = new Schema<IFriendReqItem> ({
    source: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

const friendReqListSchema: Schema = new Schema<IFriendReqs>({
    uname: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    reqs: {
        type: [friendReqItemSchema],
        required: true,
        default: []
    }
});

const FriendReqModel = (models.friendReq as Model<IFriendReqs>) || 
    model<IFriendReqs>('friendReq', friendReqListSchema);
export default FriendReqModel;