import dbConnect from "@/Db/middleware/mongodb";
import FriendReqModel from "@/Db/models/FriendReq";
import { stringify } from "querystring";

export default async function handler(req, res) {
    try {
        await dbConnect();

        if (req.method === 'GET') {
            res.status(200).json('working');
        } else if (req.method === 'POST') {
            const body = req.body;

            const uname = body.uname;

            const friendObj = {
                source: body.source
            }

            const dbResp = await FriendReqModel.findOne({uname});

            if (!dbResp) {
                const x = await FriendReqModel.create({
                    uname: uname,
                    reqs: [friendObj]
                })

                res.status(201).json(x);
            } else {
                dbResp.reqs.push(friendObj);
                const x = await dbResp.save();
                res.status(201).json(x);
            }
        }

    } catch (err) {
        res.status(500).json('err');
    }
}


// {
//     uname: string,
//     source: string,

// }