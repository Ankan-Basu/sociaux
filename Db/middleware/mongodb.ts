import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

const connectDB = (handler: Function) => {
    async(req: NextApiRequest, res: NextApiResponse) => {
        if (mongoose.connections[0].readyState) {
            //use current db connection
            return handler(req, res);
        }
    
        //use new db connection
        await mongoose.connect(process.env.MONGO_URL as string);
        return handler(req, res);
    }
}

export default connectDB;