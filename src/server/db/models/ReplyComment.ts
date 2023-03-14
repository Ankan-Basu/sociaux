import { Schema, model, models } from "mongoose";

export interface IReplyComment {
    uname: string;
    parenCommId: string;
    message: string;
    likes?: Array<string>;
    time?: Date;
}

const replyCommentSchema: Schema = new Schema<IReplyComment>({
    uname: {
        type: String,
        required: true
    },
    parenCommId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    likes: {
        type: [String],
        required: true,
        default: []
    },
    time: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

const ReplyCommentModel = models.replyComment || model<IReplyComment>('replyComment', replyCommentSchema);

export default ReplyCommentModel;