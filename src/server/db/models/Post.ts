import mongoose, { Schema } from "mongoose";
import { boolean } from "zod";

export interface IPost {
    uname: string;
    time?: Date;
    privacy: number;
    message: string;
    imageId?: string;
    shareId?: string;
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
        default: Date.now(),
        index: true
    },
    privacy: {
        type: Number,
        required: true,
        default: 0 // CHANGE THIS LATER
    },
    message: {
        type: String,
        // required: true,
        default: ''
    },
    imageId: {
        type: String,
        // required: true,
        default: '',
    },
    shareId: {
        type: String,
        default: ''
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