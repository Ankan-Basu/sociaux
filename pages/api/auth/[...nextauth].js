import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from '@/Db/middleware/mongodb';
import UserModel from "@/Db/models/User";
// const bcrypt = require('bcrypt');
import bcrypt from 'bcrypt';

const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) {
                console.log('authorize')
                dbConnect().catch(err => {error: 'Connection failed'});

                console.log(credentials);
                const result = await UserModel.findOne({email: credentials.email});

                if(!result) {
                    console.log('User not found')
                    throw new Error('User not found'); 
                }

                const checkPassword = await bcrypt.compare(credentials.password, result.password);

                if (!checkPassword) {
                    throw new Error('Wrong password');
                }

                credentials.uname = result.uname;
                credentials.email = result.uname;

                return result;
                // return credentials;
            }
        })
    ],
    secret: process.env.SECRET
}

export default NextAuth(authOptions);
