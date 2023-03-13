import dbConnect from "@/Db/middleware/mongodb";
import PostModel from "@/Db/models/Post";
import { NextApiRequest, NextApiResponse } from "next";

import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await dbConnect();
        
        if (req.method === 'GET') {

            const token = await getToken({ req, secret })
            console.log("JSON Web Token", token)

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