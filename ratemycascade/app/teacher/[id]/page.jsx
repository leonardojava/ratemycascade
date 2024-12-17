import TeacherPage from "@/components/TeacherPage";
import { connectMongoDB } from "@/lib/mongodb";
import Teacher from "@/models/teacher";
import Review from "@/models/review";

export async function generateMetaData() {
    await connectMongoDB();
    const teachers = await Teacher.find().lean();
    return teachers.map((teacher) => ({
        id: teacher._id.toString(),
    }));
}


export default async function TeacherReviews({ params }) {
    const { id } = params;
    await connectMongoDB();

    const teacher = await Teacher.findById(id).populate('reviews').lean();
    if (!teacher) {
        return {
            notFound: true,
        };
    }
    return (
        <TeacherPage teacher={teacher} />
    );
}