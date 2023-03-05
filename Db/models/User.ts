import {Schema, models, model} from "mongoose";

interface IUser {
    name: string,
    password: string
}

const userSchema: Schema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

var UserModel = models.user || model<IUser>('user', userSchema);
export default UserModel;