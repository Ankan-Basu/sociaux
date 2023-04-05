import {Schema, models, model, Model} from "mongoose";

interface IFriendList {
    uname: string;
    friends: Array<string>;
}

const friendListSchema: Schema = new Schema<IFriendList>({
    uname: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    friends: {
        type: [String],
        required: true,
        default: []
    }
});

const FriendListModel = (models.friendList as Model<IFriendList>) || 
    model<IFriendList>('friendList', friendListSchema);

    export default FriendListModel;