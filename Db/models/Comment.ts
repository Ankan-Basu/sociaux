import mongoose, { Schema } from "mongoose";

export interface IComment {
    uname: string;
    postId: string,
    message: string;
    time: Date;
    likes: Array<string>;
    replies: Array<string>;
}

const commentSchema: Schema = new Schema<IComment> ({
    uname: {
        type: String,
        required: true,
        index: true
    },
    postId: {
        type: String,
        required: true,
        index: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true,
        default: Date.now()
    },
    likes: {
        type: [String],
        required: true,
        default: []
    },
    replies: {
        type: [String],
        required: true,
        default: []
    }
});

const CommentModel = mongoose.models.comment || 
mongoose.model<IComment>('comment', commentSchema);

export default CommentModel;