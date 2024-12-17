"use client";

import { useState } from "react";
import {useSession} from "next-auth/react";
import { useRouter } from "next/navigation";
export default function ReviewForm({ teacherID }) {
    const router = useRouter();
    const {data: session} = useSession();
    const userID = session?.user?._id;
    const [courseName, setCourseName] = useState("");
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");
    const [grade, setGrade] = useState("");
    const [error, setError] = useState(null);
    

    
    if(!userID){
        router.push("/");
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!review || !courseName || !rating || !grade){
            setError("Please fill in all fields.");
            return;
        }
        
        try{
            
            const res = await fetch('/api/review', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({rating: rating, comment: review, grade, teacherID, course: courseName, userID})
            });
        if(res.ok){
            const form = e.target;
            console.log(grade);
            form.reset();
            router.push(`/teacher/${teacherID}`);
        }
        else{
            console.log("Review submission failed");
            setError("An error occurred. Please try again.");
        }
        } catch (error){
            console.log(error);
            setError("An error occurred. Please try again.");
        }
    }
    return(
        <div className = "grid place-items-center h-screen" style = {{background: '#a8a8a8'}}>
            <div className="shadow-lg p-10 rounded-lg border-t-4 bg-white" style={{ borderTopColor: '#8a1e15' }}>
                <h1 className="text-xl font-bold my-4">Review</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col my-2">
                            <label>Course Name:</label>
                            <input onChange={e => setCourseName(e.target.value)}/>
                        </div>
                        <div className="flex flex-col my-2">
                            <label htmlFor="rating">Rating:</label>
                            <select
                                id="rating"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select Rating</option>
                                <option value="1">1 - Poor</option>
                                <option value="2">2 - Fair</option>
                                <option value="3">3 - Good</option>
                                <option value="4">4 - Very Good</option>
                                <option value="5">5 - Excellent</option>
                            </select>
                        </div>
                        <div className="flex flex-col my-2">
                            <label htmlFor="grade">Grade:</label>
                            <select
                                id="grade"
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select Grade</option>
                                <option value="A">A</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B">B</option>
                                <option value="B-">B-</option>
                                <option value="C+">C+</option>
                                <option value="C">C</option>
                                <option value="C-">C-</option>
                                <option value="D">D+</option>
                                <option value="D">D</option>
                                <option value="D-">D-</option>
                                <option value="F">F</option>
                            </select>
                        </div>
                        <div className="flex flex-col my-2">
                            <label>Write Review:</label>
                            <textArea onChange={e => setReview(e.target.value)} className = "h-72" maxlength="1000"/>
                        </div>
                        <button className="text-white p-2 rounded-lg w-full" style = {{background: '#8a1e15'}}>Submit</button>
                        <div>1000 character limit</div>

                        {error && <p className="text-red-500">{error}</p>}

                        
                    </form>
            </div>
            <div className="shadow-lg p-10 rounded-lg" style={{ background: '#8a1e15' }}>
                <h1 className="text-xl font-bold my-4 text-white">Review Guidelines</h1>
                <ul className="text-white">
                    <li>Be respectful and constructive.</li>
                    
                </ul>
            </div>
        </div>

    );


}