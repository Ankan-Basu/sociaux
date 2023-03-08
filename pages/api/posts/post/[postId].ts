import dbConnect from "@/Db/middleware/mongodb";
import PostModel from "@/Db/models/Post";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {postId} = req.query;
        await dbConnect();

        if (req.method === 'GET') {
            try {
                const dbResp = await PostModel.findById({_id: postId});
                res.status(200).json(dbResp);
            } catch(err) {
                res.status(404).json('Not found');
            }

        }

    } catch(err) {
        console.log('Error in individual post route');
        res.status(500).json(err);
    }
}