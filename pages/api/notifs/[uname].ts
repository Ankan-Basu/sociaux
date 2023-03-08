import dbConnect from "@/Db/middleware/mongodb";
import NotificationModel from "@/Db/models/Notification";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    const unameObj = req.query;
    const uname = unameObj.uname;

    if (req.method === "GET") {
      const notif = await NotificationModel.findOne({ uname });

      res.status(200).json(notif);
    } else if (req.method === "DELETE") {
      const body: DeleteReqBody = req.body;
      const notifId = body.notifId;

      const dbRes = await NotificationModel.findOne({ uname });

      let notifs2: Array<Object>;
      if (notifId === "0") {
        //delete all
        notifs2 = [];
      } else {
        notifs2 = dbRes.notifs.filter((notif: any) => {
          // console.log(notif._id, notifId, notif._id == notifId);
          return notif._id != notifId;
          // !=. !== won't work coz comaparing objectID with string
        });
      }

      dbRes.notifs = notifs2;

      const dbRes2 = await dbRes.save();

      res.status(200).json(dbRes2);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("err");
  }
}

interface DeleteReqBody {
  notifId: String;
}
