import dbConnect from "@/Db/middleware/mongodb";
import PostModel, { IPost } from "@/Db/models/Post";
import { NextApiRequest, NextApiResponse } from "next";
import { HydratedDocument } from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await dbConnect();
        
        if(req.method === 'POST') {
            const post: PostBody = req.body;

            const dbResp: HydratedDocument<IPost> = await PostModel.create(post);
            // console.log(typeof dbResp);

            res.status(201).json(dbResp);
        } 
        
        else if (req.method === 'GET') {
            const dbResp: IPost | any = await PostModel.find();

            // console.log(typeof dbResp);

            res.status(200).json(dbResp);
        } 
        
        else if (req.method === 'PUT') {
            const post: EditPostBody = req.body;

            const dbResp: IPost | any = await PostModel.findOne({
                uname: post.uname,
                _id: post.postId
            });

            if (!dbResp) {
                res.status(400).json('Not found');
            } else {
                dbResp.privacy = post.privacy;
                dbResp.message = post.message;

                const dbResp2 = await dbResp.save(); 
                // const obj = {
                //     post.uname
                // }
                res.status(201).json(dbResp2);
            }
        }

    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

export interface PostBody {
    uname: string;
    privacy: number;
    message: string;
    shares?: number;
    likes?:[];
    comments?:[];
    time?: Date;
}

interface EditPostBody {
    uname: string;
    postId: string,
    privacy: number;
    message: string;
    shares?: number;
    likes?:[];
    comments?:[];
    time?: Date;
}