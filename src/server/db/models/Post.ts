import mongoose, { Schema } from "mongoose";
import { boolean } from "zod";

export interface IPost {
    uname: string;
    time?: Date;
    privacy: number;
    message: string;
    imageId?:string;
    likes?: Array<string>;
    comments?: Array<string>;
    shares?: number;
}

const postSchema: Schema = new Schema<IPost> ({
    uname: {
        type: String,
        required: true,
        index: true
    },
    time: {
        type: Date,
        required: true,
        default: Date.now()
    },
    privacy: {
        type: Number,
        required: true,
        default: 0 // CHANGE THIS LATER
    },
    message: {
        type: String,
        required: true
    },
    imageId: {
        type: String,
        // required: true,
        default: '',
    },
    likes: {
        type: [String],
        required: true,
        default: []
    },
    comments: {
        type: [String],
        required: true,
        default: []
    }
});

const PostModel = (mongoose.models.post as mongoose.Model<IPost>) || 
mongoose.model<IPost>('post', postSchema);

export default PostModel;