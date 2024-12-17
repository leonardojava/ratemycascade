import { connectMongoDB } from '@/lib/mongodb';
import Teacher from '@/models/teacher';
import User from '@/models/user';
import Review from '@/models/review';
import { NextResponse } from 'next/server';


export async function POST(req) {
    try{
        await connectMongoDB();
        const {rating, comment, grade, course, userID,teacherID} = await req.json();
        
        const review = await Review.create(
            {
                rating, 
                comment, 
                grade, 
                teacher: teacherID, 
                course, 
                user: userID
            }
        );
        const teacher = await Teacher.findById(teacherID);
        const user = await User.findById(userID);
        teacher.reviews.push(review._id);
        user.reviews.push(review._id);
        
        teacher.total += Number(review.rating);;
        
        await teacher.save();
        await user.save();

        
        return NextResponse.json({message: "Review written successfully"}, {status: 200});

    }
    catch(error){
        console.log(error);
        return NextResponse.json({message: "An error occurred while writing review"}, {status: 500});
    }

}
