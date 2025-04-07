import { NextApiRequest, NextApiResponse } from "next";
import otpGenerator from "~/server/api/utilFuncs/otpGenerator";
import { transporter } from "~/server/api/utilFuncs/transporter";
import OtpModel from "~/server/db/models/Otp";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const body = req.body;

    const email = body.email;

    const mailOptions = {
      from: '',
      to: email
    }

    const otp = otpGenerator(6);
    const resp = await transporter.sendMail({
      ...mailOptions,
      subject: 'Test',
      text: `OTP is ${otp}\nThis is a test mail. Plz ignore`
    });

    const dbResp = await OtpModel.findOneAndUpdate({uname: 'testOTP'}, {uname: 'testOTP', otp: otp, expireAt: Date.now()}, {upsert: true});
    console.log('OTP resp', dbResp);
    

    console.log('MAIL', resp);
    
    res.status(200).json('Success')

    try {

    } catch (err) {
      res.status(500).json('Bad request')
    }
  }
}

export default handler;