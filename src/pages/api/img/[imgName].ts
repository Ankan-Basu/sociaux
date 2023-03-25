import { NextApiRequest, NextApiResponse } from "next";
import ImageModel from "~/server/db/models/Image";
import dbConnect from "~/server/db/mongo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        dbConnect();

        const imgName = req.query.imgName;
        console.log('Query', imgName);
        
        try {

            const dbResp = await ImageModel.findOne({_id: imgName});

        if (!dbResp) {
            res.send('');
            return;
        }

        let imgData = dbResp.img;

        // const targetChars = 'base64,';
        // const pos1 = imgData.search(targetChars);
        // const toSkip = pos1 + targetChars.length;

        // imgData = imgData.slice(toSkip, imgData.length);

        // let imgFile = atob(imgData);
        // console.log(imgFile);
        

        res.status(200).json(imgData)

    } catch(err) {
        console.log(err);

    }

        
    } catch(err) {
        res.status(200).send('PeePeePooPoo');
    }
}

export default handler;