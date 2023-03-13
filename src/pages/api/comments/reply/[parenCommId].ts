import dbConnect from "@/Db/middleware/mongodb";
import ReplyCommentModel, {IReplyComment} from '@/Db/models/ReplyComment';
import { HydratedDocument } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        dbConnect();

        const {parenCommId} = req.query;

        // get the list of replied comments
        if (req.method === 'GET') {
            const dbResp: Array<HydratedDocument<IReplyComment>> = await ReplyCommentModel.find({parenCommId});

            if (!dbResp) {
                res.status(404).json('Not found');
            } else {
                res.status(200).json(dbResp)
            }
        }

    } catch (err) {
        console.log(err);
        res.status(500).json('err');
    }
}