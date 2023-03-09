import dbConnect from "@/Db/middleware/mongodb";
import CommentModel, { IComment } from "@/Db/models/Comment";
import ReplyCommentModel, { IReplyComment } from "@/Db/models/ReplyComment";
import { HydratedDocument } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        dbConnect();

        console.log('Comments reply api')
        //add reply
        if (req.method === 'POST') {
            const reqBody: IPostReqBody = req.body;

            try {
                const parenComm: HydratedDocument<IComment> | null = await CommentModel.findOne({_id: reqBody.parenCommId});

                if (!parenComm) {
                    // ie null
                    res.status(404).json('Not Found');
                } else {
                    const replyCommObj: IReplyComment = {
                        uname: reqBody.uname,
                        parenCommId: reqBody.parenCommId,
                        message: reqBody.message
                    };

                    try {
                        const replyComm: HydratedDocument<IReplyComment> | null = await ReplyCommentModel.create(replyCommObj);

                        if (!replyComm) {
                            res.status(500).json('Err saving comment');    
                        } else {
                            parenComm.replies.push(replyComm._id.toString());
                            
                            const dbResp = await parenComm.save();

                            res.status(201).json(dbResp);
                        }

                    } catch(err) {
                        res.status(500).json('Err saving comment');
                    }
                }
            } catch (err) {
                /**
                 * if user provided parenCommId which cannot be type casted into Object Id
                 */
                res.status(404).json('Not Found');
            }
        }


        //delete reply
        else if (req.method === 'DELETE') {
            const reqBody: IDeleteReqBody = req.body;

            try {
                const parenComm: HydratedDocument<IComment> | null = await CommentModel.findOne({_id: reqBody.parenCommId});

                if (!parenComm) {
                    // ie null
                    res.status(404).json('Not Found');
                } else {
                    try {
                       // remove from parenComm

                    //    if (parenComm.replies.includes(reqBody.commentId)) {

                    //    }
                    //    const repliesArr = parenComm.replies.filter((reply) => {
                    //         return reply !== reqBody.commentId;
                    //    });
                        
                    // try in single pass
                        const repliesArr: Array<string> = [];

                        const len = parenComm.replies.length;
                        let found = false;

                        for (let i=0; i<len; i++) {
                            if (parenComm.replies[i] === reqBody.commentId) {
                                found = true;
                            } else {
                                repliesArr.push(parenComm.replies[i]);
                            }
                        }
                        /*********************************************** */
                       
                        if (!found) {
                            res.status(404).json('Reply comment doesnt exist');
                        } else {
                            parenComm.replies = repliesArr;

                            const dbResp1 = await parenComm.save();
                            // err will be catched by catch block;

                            const dbResp = await ReplyCommentModel.deleteOne({_id: reqBody.commentId});

                            res.status(200).json(dbResp1);
                        }
                       
                    } catch(err) {
                        res.status(500).json('Err saving comment');
                    }
                }
            } catch (err) {
                /**
                 * if user provided parenCommId which cannot be type casted into Object Id
                 */
                res.status(404).json('Not Found');
            }
        }

    } catch (err) {
        console.log(err);
        res.status(500).json('err');
    }
}

interface IPostReqBody {
    uname: string;
    parenCommId: string;
    message: string;
}

interface IDeleteReqBody {
    uname: string;
    parenCommId: string;
    commentId: string;
}