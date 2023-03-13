import dbConnect from '@/Db/middleware/mongodb';
import UserModel from "@/Db/models/User";

export default async function handler(req, res) {
    try {
        dbConnect();
    
        
        const unameObj = req.query;
        const uname = unameObj.uname;
        
        const dbResp = await UserModel.findOne({uname});

        if (!dbResp) {
            res.status(404).json({message: 'Not found'});
        } else {
            res.status(200).json(dbResp);
        }
    } catch(err) {
        res.status(500).json({message: 'Internal Server Error'});
    }
    
}