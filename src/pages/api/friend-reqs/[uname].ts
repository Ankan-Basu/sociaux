import dbConnect from "@/Db/middleware/mongodb";
import FriendReqModel from "@/Db/models/friendReq";
import { NextApiRequest, NextApiResponse } from "next";

export default async function(req: NextApiRequest, res: NextApiResponse) {
    try {
        dbConnect();

        // get list of pending friend reqs
        if (req.method === 'GET') {    
            const unameObj = req.query;
            const uname = unameObj.uname;
            
            const notif = await FriendReqModel.findOne({ uname });
            
            res.status(200).json(notif);
        }
        

        // reject a friend req
        else if (req.method === 'DELETE') {

        }


        // another user sends this user a friend req
        else if (req.method === 'POST') {

        }

    } catch (err) {
        res.status(500).json('err');
    }
}