import { NextApiRequest, NextApiResponse } from "next";
import PostModel from "~/server/db/models/Post";
import dbConnect from "~/server/db/mongo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {    
    try {
      dbConnect();

      const input: IBody = req.body;
      console.log('Share\n', input);
      

      const dbResp = await PostModel.create({uname: input.uname, privacy: input.privacy, message: input.message, shareId: input.shareId});

      res.status(201).json(dbResp);

    } catch(err) {
      res.status(500).json(err);
    }
  }
}

interface IBody {
  uname: string;
  privacy: number;
  message: string;
  shareId: string;  
}
export default handler;