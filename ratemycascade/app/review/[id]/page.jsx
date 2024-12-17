import ReviewForm from "@/components/ReviewForm";
import { connectMongoDB } from "@/lib/mongodb";
import Teacher from "@/models/teacher";
import Review from "@/models/review";
import User from "@/models/user";

export default async function TeacherReviews({ params }) {
    const { id } = params;
    
    return (
        <ReviewForm teacherID={id} />
    );
}