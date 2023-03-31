import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "~/server/db/models/User";
import dbConnect from "~/server/db/mongo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    dbConnect();
    
    const searchName = req.query.name;

    console.log('FIND USER', searchName);
    

    const dbResp = await UserModel.find({ $or: [
                        {uname: searchName}, 
                        {name: searchName}
                      ]}
                    );
    res.status(200).json(dbResp);
  } catch(err) {
    console.log('FIND USER', err);
    res.status(500).json('INt Serv Err');
  }
}

export default handler;