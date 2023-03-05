import UserModel from '@/Db/models/User';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const obj = {
            name: 'aBc',
            password: '123'
        }

        var user = new UserModel(obj);

        var resp = await user.save();

        res.status(200).json(resp)
    }
}