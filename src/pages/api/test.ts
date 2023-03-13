import dbConnect from "@/Db/middleware/mongodb";
import UserModel from "@/Db/models/User"
import { NextApiRequest, NextApiResponse } from "next"


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  await dbConnect();
  if(method === 'GET') {
    const user = await UserModel.findOne({
        name: 'A b'
    });

    res.status(200).json(user);

  }
}