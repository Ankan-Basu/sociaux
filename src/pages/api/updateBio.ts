import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "~/server/db/models/User";
import dbConnect from "~/server/db/mongo";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {    
    try {
      dbConnect();

      const input: IBody = req.body;
      // console.log('Share\n', input);
      

      const dbResp = await UserModel.findOneAndUpdate({uname: input.uname}, {uname: input.uname, bio: input.bio}, {upsert: false});
      

      res.status(201).json(dbResp);

    } catch(err) {
      res.status(500).json(err);
    }
  }
}

interface IBody {
  uname: string;
  bio: string;  
}
export default handler;