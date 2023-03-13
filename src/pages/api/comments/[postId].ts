import dbConnect from "@/Db/middleware/mongodb";
import CommentModel from "@/Db/models/Comment";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await dbConnect();
        const { postId } = req.query;

        if (req.method === 'GET') {
            const dbResp = await CommentModel.find({postId});

            res.status(200).json(dbResp);
        }

        else if (req.method === 'POST') {
            const comment: CommentBody = req.body;

            const dbResp = await CommentModel.create(comment);

            res.status(201).json(dbResp);
        }

        else if (req.method === 'PUT') {
            
        }

        else if (req.method === 'DELETE') {
            const { commentId } = req.body;

            const dbResp = await CommentModel.deleteOne({_id: commentId});

            res.status(200).json(dbResp);
        }

    } catch(err) {
        res.status(500).json('err');
    }
}

interface CommentBody {
    uname: string;
    postId: string;
    message: string;
}