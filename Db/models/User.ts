import mongoose from "mongoose";
var Schema = mongoose.Schema;

interface IUser {
    name: string,
    password: string
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.models.UserModel || mongoose.model<IUser>('user', userSchema);
export default UserModel;