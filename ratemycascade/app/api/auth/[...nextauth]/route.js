import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials){
                const {email, password} = credentials;
                try{
                    await connectMongoDB();
                    const user = await User.findOne({email});
                    if(!user || !user.isVerified){
                        return null;
                    }
                    const passwordRes = await bcrypt.compare(password, user.password);
                    if(!passwordRes){
                        return null;
                    }
                    return { _id: user._id, email: user.email };
                } catch (error){
                    console.log(error);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60*60,
    },
    callbacks: {
        async session({session, token}){
            session.user._id = token._id;
            return session;
        },
        async jwt({token, user}){
            if(user){
                token._id = user._id;
            }
            return token;
        },
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn: "/",
    }
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};