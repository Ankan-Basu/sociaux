import mongoose, {Schema, models, model} from "mongoose";

interface IFriendReqItem {
    source: string;
    time?: Date;
}

interface IFriendReqs {
    uname: string;
    reqs: [IFriendReqItem];
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

var FriendReqModel = (models.friendReq as mongoose.Model<IFriendReqs>) || 
    model<IFriendReqs>('friendReq', friendReqListSchema);
export default FriendReqModel;