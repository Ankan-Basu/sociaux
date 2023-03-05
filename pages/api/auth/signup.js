import dbConnect from "@/Db/middleware/mongodb";
import UserModel from "@/Db/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            dbConnect();
            const obj = req.body;
            // console.log('OBJ:\n\n', obj)
            const userR = await UserModel.create(obj);
            res.json(userR);
        } catch(err) {
            // console.log(err.message);
            let errorsFound = handleErrors(err);
            if (errorsFound.others) {
              res.status(500).json({message: 'Internal Server Error'});
            } else {
              res.status(400).json(errorsFound);
            }
        }
    }
}

const handleErrors = (error) => {
    const errorsFound = {email: '',uname: '', password: ''};
  
    if (error.message.includes('user validation failed')) {
      Object.values(error.errors).forEach((item) => {
        errorsFound[item.properties.path] = item.properties.message
      })
    } else if (error.message.includes('duplicate key error')) {
      if (error.message.includes('email')) {
        errorsFound['email'] = 'duplicate email';
      } else if (error.message.includes('uname')) {
        errorsFound['uname'] = 'duplicate uname';
      } else {
        errorsFound['others'] = true;
      }
    } else {
      errorsFound['others'] = true;
    }
  
    return errorsFound;
  }