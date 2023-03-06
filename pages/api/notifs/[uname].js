import dbConnect from "@/Db/middleware/mongodb";
import NotificationModel from "@/Db/models/Notification";

export default async function(req, res) {
    try {
        await dbConnect();
        
        const unameObj = req.query;
        const uname = unameObj.uname;
        
        const notif = await NotificationModel.findOne({ uname });

        res.status(200).json(notif);
        
    } catch (err) {
        res.status(500).json('err');
    }
}