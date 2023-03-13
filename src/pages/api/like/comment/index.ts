import dbConnect from "@/Db/middleware/mongodb";
import CommentModel, { IComment } from "@/Db/models/Comment";
import { HydratedDocument } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse) {
    try {
        dbConnect();

        // like a comment
        if (req.method === 'POST') {
            const reqBody: IReqBody = req.body;

            try {
                console.log('body id: ', reqBody.commentId);
                const comment: HydratedDocument<IComment> | null = await CommentModel.findOne({_id: reqBody.commentId});
                console.log(comment);
                if (!comment) {
                    //ie null
                    res.status(404).json('Not found');
                } else {
                    if (comment.likes.includes(reqBody.uname)) {
                        res.status(200).json('Already Liked');
                    } else {
                        comment.likes.push(reqBody.uname);
                        
                        const dbResp = await comment.save();

                        res.status(201).json(dbResp);
                    }
                }
            } catch (err) {
                /**
                 *  we compare string (comment ID) with objwct ID
                 * exception will arise when mongoose won't be able to do typecasting
                 * ie user send wrong lwength or format of string
                 * */
                console.log(err);
                res.status(404).json('Not found');
            }
        }


        //unlike a comment
        else if (req.method === 'DELETE') {
            const reqBody: IReqBody = req.body;

            try {
                const comment: HydratedDocument<IComment> | null = await CommentModel.findOne({_id: reqBody.commentId});

                if (!comment) {
                    //ie null
                    res.status(404).json('Not found');
                } else {
                    if (!(comment.likes.includes(reqBody.uname))) {
                        res.status(200).json('Not Liked yet');
                    } else {
                        const likesArr = comment.likes.filter((likeUname) => {
                            return likeUname !== reqBody.uname;
                        })

                        comment.likes = likesArr;
                        
                        const dbResp = await comment.save();

                        res.status(201).json(dbResp);
                    }
                }
            } catch (err) {
                /**
                 *  we compare string (comment ID) with objwct ID
                 * exception will arise when mongoose won't be able to do typecasting
                 * ie user send wrong lwength or format of string
                 * */
                res.status(404).json('Not found');
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json('err');
    }
}

interface IReqBody {
    uname: string,
    commentId: string;
}