import dbConnect from "@/Db/middleware/mongodb";
import NotificationModel from "@/Db/models/Notification";

export default async function handler(req, res) {
    try {
        await dbConnect();

        if (req.method === 'POST') {
            const body = req.body;

            const uname = body.uname;

            const notifObj = {
                source: body.source,
                message: body.message,
                link: body.link,
            }

            const dbResp = await NotificationModel.findOne({uname});

            if (!dbResp) {
                const x = await NotificationModel.create({
                    uname: uname,
                    notifs: [notifObj]
                })

                res.status(201).json(x);
            } else {
                dbResp.notifs.push(notifObj);
                const x = await dbResp.save();
                res.status(201).json(x);
            }
        } else if (req.method === 'GET') {
            res.status(200).json({message: 'Working'});
        }

    } catch (err) {
        res.status(500).json({message: 'Internal Server Error'});
    }
}

// type reqBody {
//     uname: string,
//     source: string,
//     message: string,
//     link: string,
// }