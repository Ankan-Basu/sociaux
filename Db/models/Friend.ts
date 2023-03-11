import {Schema, models, model} from "mongoose";

interface FriendList {
    uname: string;
    reqs: Array<string>;
}

const friendListSchema: Schema = new Schema<FriendList>({
    uname: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    reqs: {
        type: [String],
        required: true,
        default: []
    }
});

var FriendListModel = models.friendList || 
    model<FriendList>('friendList', friendListSchema);

    export default FriendListModel;