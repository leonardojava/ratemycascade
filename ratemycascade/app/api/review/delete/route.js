import { connectMongoDB } from '@/lib/mongodb';
import Teacher from '@/models/teacher';
import User from '@/models/user';
import Review from '@/models/review';
import { NextResponse } from 'next/server';

export async function DELETE(req){
    try{
        await connectMongoDB();
        const { searchParams } = new URL(req.url);
        const reviewID = searchParams.get('reviewID');
        const review = await Review.findById(reviewID);
        const userID = review.user;
        const teacherID = review.teacher;
        
        const teacher = await Teacher.findById(teacherID);
        const user = await User.findById(userID);

        teacher.reviews = teacher.reviews.filter((id) => id.toString() !== reviewID);
        user.reviews = user.reviews.filter((id) => id.toString() !== reviewID);
        teacher.total -= Number(review.rating);
        await teacher.save();
        await user.save();
        await Review.findByIdAndDelete(reviewID);
        return NextResponse.json({message: "Review deleted successfully"}, {status: 200});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message: "An error occurred while deleting review"}, {status: 500});
    }
}