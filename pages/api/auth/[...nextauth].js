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

                // console.log(credentials);
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

                // console.log(result)

                const user = result;
                return result;
                // return credentials;
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },
        async jwt({ token, user }) {
            
            let uname = undefined
            if (user) {
                uname = {uname: user.uname};
            }
            return ({...token, ...uname});
        },
        // async session({ session, token, user}) {
        //     session.accessToken = 'token.accessToken';
        //     // session.user._id = 'token.id';
        //     // token.uname = 'xD';
    
        //     console.log('user\n',token);
        //     return session;
        // }
    },
    secret: process.env.SECRET,
}

export default NextAuth(authOptions);
