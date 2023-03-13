import dbConnect from "@/Db/middleware/mongodb";
import UserModel from "@/Db/models/User"
import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/utils/prisma";


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  await dbConnect();
  if(method === 'GET') {
    await prisma.$connect();
    // const user = await UserModel.findOne({
    //     name: 'A b'
    // });

    const user = await prisma.user.create({
      data: {
        email: 'a2@b.c',
        name: 'A B',
        uname: 'ab2',
        password: 'abcd',
      }
    });

    res.status(200).json(user);

  }
}