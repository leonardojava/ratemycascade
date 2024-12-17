import { connectMongoDB } from '@/lib/mongodb';
import Teacher from '@/models/teacher';
import { NextResponse } from 'next/server';
export async function GET() {
    try {
        await connectMongoDB();
        const teachers = await Teacher.find().select('_id name').lean();
        return NextResponse.json(teachers, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "An error occurred while fetching the teachers."}, {status: 500});
    }
}