import dbConnect from "@/Db/middleware/mongodb";
import PostModel from "@/Db/models/Post";
import { NextApiRequest, NextApiResponse } from "next";
import { PostBody } from "../../posts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        dbConnect();

        //add like
        if (req.method === 'POST') {
            const reqBody: postReqBody = req.body;

            const post: any = await PostModel.findOne({_id: reqBody.postId});

            if (!post) {
                res.status(404).json('not found');
            } else {
                // console.log(post.likes)
                if (!(post.likes.includes(reqBody.uname))) {
                    post.likes.push(reqBody.uname);
                    const dbResp = await post.save();
                    res.status(201).json(dbResp);
                } else {
                    res.status(200).json('already liked');
                }
            }
        }

        //remove like
        else if (req.method === 'DELETE') {
            const reqBody: deleteReqBody = req.body;

            const post: any = await PostModel.findOne({_id: reqBody.postId});

            if (!post) {
                res.status(404).json('not found');
            } else {
                if (post.likes.includes(reqBody.uname)) {
                    const likesArr = post.likes.filter((likeUname: string | undefined) => {
                        return likeUname !== reqBody.uname;
                    });
                    post.likes = likesArr;

                    const dbResp = await post.save();

                    res.status(200).json(dbResp);
                } else {
                    res.status(200).json('not liked yet');
                }
            }

        }
    } catch(err) {
        res.status(500).json('err');
    }
}

interface postReqBody {
    uname: string,
    postId: string,
}

interface deleteReqBody {
    uname: string,
    postId: string,
}