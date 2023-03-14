import {Schema, models, model} from "mongoose";
const bcrypt = require('bcrypt');

export interface IUser {
    name: string,
    email: string,
    uname: string,
    password: string,
    img?: string,
    bio?: string
}

const userSchema: Schema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    uname: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    }
});

userSchema.pre('save', async function(next) {
    // console.log('pre save hook')
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    // console.log('saving', this);
    next();
})

var UserModel = models.user || model<IUser>('user', userSchema);
export default UserModel;