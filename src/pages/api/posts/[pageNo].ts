import { NextApiRequest, NextApiResponse } from "next";
import PostModel from "~/server/db/models/Post";
import dbConnect from "~/server/db/mongo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const pageNo = Number(req.query.pageNo);
    const limit = 5;

    const skip = (pageNo - 1) * limit;

    const posts = await PostModel.find({}).sort({
      time: "desc",
    }).skip(skip).limit(limit);

    res.status(200).json(posts);
  } catch (err) {
    // POSTS REST ROUTE
    res.status(500).json({msg: 'Error'});    
  }
}

export default handler;