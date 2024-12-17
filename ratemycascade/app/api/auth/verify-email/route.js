import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');
        if (!token) {
            return NextResponse.json({ message: "Verification token is missing." }, { status: 400 });
        }

        await connectMongoDB();
        const user = await User.findOne({ token });
        if (!user) {
            return NextResponse.json({ message: "Invalid verification token." }, { status: 400 });
        }

        user.isVerified = true;
        await user.save();

        return NextResponse.json({ message: "Email verified successfully." }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred while verifying the email." }, { status: 500 });
    }
}