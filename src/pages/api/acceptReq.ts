import { NextApiRequest, NextApiResponse } from "next";
import { bracketSameLine } from "prettier.config.cjs";
import FriendListModel from "~/server/db/models/Friend";
import FriendReqModel from "~/server/db/models/FriendReq";
import dbConnect from "~/server/db/mongo";

interface IBody {
  targetUname: string;
  acceptorUname: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  if (req.method === 'POST') {

    try {
      
      const body: IBody = req.body;

      const friendReqList = await FriendReqModel.findOne({uname: body.acceptorUname});
      if (!friendReqList) {
        // do something
        res.status(500).json({message: 'int serv err'});
      } else {

      // add to friend List

      const friendListTarget = await FriendListModel.findOne({uname: body.targetUname});

      if (!friendListTarget) {
        // add
        const friendListTargetObj = {
          uname: body.targetUname,
          friends: [body.acceptorUname]
        }
        await FriendListModel.create(friendListTargetObj);
      } else {
        //modify

        let alreadyExists = false;

        for (let i=0; i<friendListTarget.friends.length; i++) {
          if (friendListTarget.friends[i] === body.acceptorUname) {
            alreadyExists = true;
            break;
          }
        }

        if (!alreadyExists) {
          friendListTarget.friends.push(body.acceptorUname);
          await friendListTarget.save();
        }
      }

      const friendListAcceptor = await FriendListModel.findOne({uname: body.acceptorUname});

      if (!friendListAcceptor) {
        // add
        const friendListAcceptorObj = {
          uname: body.acceptorUname,
          friends: [body.targetUname]
        }
        await FriendListModel.create(friendListAcceptorObj);
      } else {
        //modify
        let alreadyExists = false;
        for (let i=0; i<friendListAcceptor.friends.length; i++) {
          if (friendListAcceptor.friends[i] === body.targetUname) {
            alreadyExists = true;
            break;
          }
        }
        if (!alreadyExists) {
          friendListAcceptor.friends.push(body.targetUname);
          await friendListAcceptor.save();
        }
      }
        
        //delete from req list
        const newReqs = friendReqList.reqs.filter((req) => {
          return req.source !== body.targetUname;
        });
        
        //@ts-ignore
        friendReqList.reqs = newReqs;
       

        const dbResp1 = await friendReqList.save();

        res.json(dbResp1)
      }
      
    } catch (err) {
      console.log(err);
    }
  }
  else if (req.method === 'DELETE') {
    try {
      dbConnect();

      const body: deleteBody = req.body;
      const friendReqList = await FriendReqModel.findOne({uname: body.rejectorUname});

      if (!friendReqList) {
        res.status(400).json({msg: 'BAD REQ'});
      } else {
        const newReqs = friendReqList.reqs.filter((req) => {
          return req.source !== body.targetUname;
        });

        //@ts-ignore
        friendReqList.reqs = newReqs;

        const dbResp = await friendReqList.save();

        res.status(200).json(dbResp);
      }


    } catch(err) {
      res.status(500).json({msg: 'int serv er'});
    }
  }

}

interface deleteBody {
  rejectorUname: string;
  targetUname: string;
}

export default handler;
