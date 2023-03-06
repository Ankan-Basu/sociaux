import {Schema, models, model} from "mongoose";

interface FriendReqItem {
    source: string,
    time: Date
}

interface FriendReqs {
    uname: string,
    reqs: [FriendReqItem]
}

const friendReqItemSchema: Schema = new Schema<FriendReqItem> ({
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

const friendReqListSchema: Schema = new Schema<FriendReqs>({
    uname: {
        type: String,
        required: true,
        unique: true
    },
    reqs: {
        type: [friendReqItemSchema],
        required: true,
        default: []
    }
});

var FriendReqModel = models.friendReq || 
    model<FriendReqs>('friendReq', friendReqListSchema);
export default FriendReqModel;