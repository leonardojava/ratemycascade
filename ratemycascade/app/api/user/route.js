import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import Review from '@/models/review';
import Teacher from '@/models/teacher';
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get('userID');
    try {
        await connectMongoDB();
        const user = await User.findById(userID).populate({
            path: 'reviews',
            populate: {
                path: 'teacher',
                model: 'Teacher',
                select: 'name'
            }
        }).lean();
        return NextResponse.json(JSON.stringify(user.reviews), {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "An error occurred while fetching user."}, {status: 500});
    }
}