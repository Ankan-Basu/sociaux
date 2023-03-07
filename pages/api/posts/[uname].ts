import dbConnect from "@/Db/middleware/mongodb";
import PostModel from "@/Db/models/Post";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await dbConnect();
        
        if (req.method === 'GET') {
            const { uname } = req.query;

            const dbResp = await PostModel.find({uname});

            res.status(200).json(dbResp);
        }
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

interface PostBody {
    uname: string;
    privacy: number;
    message: string;
    shares?: number;
}