import mongoose from "mongoose";

export interface IReplyComment {
    uname: string;
    parenCommId: string;
    message: string;
    likes: Array<string>;
    time: string;
}