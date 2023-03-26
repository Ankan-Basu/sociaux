import { NextApiRequest, NextApiResponse } from "next";
import FriendReqModel from "~/server/db/models/FriendReq";

interface IBody {
  targetUname: string;
  requesterUname: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  if (req.method === 'POST') {

    try {
      
      const body: IBody = req.body;

      const targetUser = await FriendReqModel.findOne({uname: body.targetUname});

      if (!targetUser) {
        //create
        console.log('Creating new');
        const reqs = [{source: body.requesterUname}];
        const friendListObj = {
          uname: body.targetUname,
          reqs: reqs
        }
        const dbResp = await FriendReqModel.create(friendListObj);

        
        res.status(201).json(dbResp);
      } else {
        console.log('Modifying old');
        targetUser.reqs.push({source: body.requesterUname});
        const dbResp = await targetUser.save();

        res.status(201).json(dbResp);
      }
      
    } catch (err) {
      console.log(err);
    }
  }

}

export default handler;
