"use client";

import { useEffect, useState } from "react";
import  {useSession}  from "next-auth/react";


export default function UserInfo() {
    const {data: session, status} = useSession();
    const [reviews, setReviews] = useState([]);
    const[error, setError] = useState(null);
    useEffect(() => {
        if (status === "loading") {
            return;
        }
        if (status === "unauthenticated") {
            <div>
                <p>You need to be logged in to view this page.</p>
            </div>
        }
        async function fetchData(){
            const userID = session?.user?._id;
            console.log(userID);
            try {
                const res = await fetch(`/api/user?userID=${userID}`);
                const reviews = await res.json();
                const parsedReviews = JSON.parse(reviews);
                setReviews(parsedReviews);
            } catch(error){
                setError("Please Login to view your reviews");
            }
        }
        fetchData();
    }, [session]);

    const handleDelete = async (reviewID) => {
        try{
            const res = await fetch(`/api/review/delete?reviewID=${reviewID}`, {method: "DELETE"});
            if(res.ok){
                const newReviews = reviews.filter((review) => review._id !== reviewID);
                setReviews(newReviews);
            }
            else{
                setError("An error occurred while deleting review");
            }
        }
        catch(error){
            setError("An error occurred while deleting review");
        }
    }
    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!reviews || reviews.length === 0) {
        return (
            <div className="grid place-items-center h-screen">
                <div className="shadow-lg p-5 rounded-lg border-t-4" style={{ borderTopColor: '#8a1e15' }}>
                    <div>No reviews found</div>
                </div>
            </div>
        );
    }
    return (  
        <div className = "grid place-items-center h-fit">
        {error && <p className="text-red-500">{error}</p>}
        <h2 className = "font-mono text-4xl font-extrabold mb-8 " >Your Reviews:</h2>
            <ul className = "grid place-items-center h-fit">
                {reviews.map((review) => (    
                    <li key = {review._id} className = "shadow-lg p-10 rounded-lg border-t-4 bg-white mb-10 w-fit h-fit" style={{ borderTopColor: '#8a1e15' }}>
                        <p><span className="font-bold">Teacher:</span> {review.teacher.name}</p>
                        <p><span className="font-bold">Rating:</span> {review.rating}</p>
                        <p><span className="font-bold">Grade:</span> {review.grade}</p>
                        <p><span className="font-bold">Course:</span> {review.course}</p>
                        <div className = "font-bold">Comment:</div> 
                        <div className = "max-w-72 h-fit break-words">{review.comment}</div>         
                        <button onClick={() => handleDelete(review._id)} className="mt-4 bg-red-500 text-white p-2 rounded">Delete</button>
                    </li>    
                    
                ))}
            </ul>
        </div>
    );
}