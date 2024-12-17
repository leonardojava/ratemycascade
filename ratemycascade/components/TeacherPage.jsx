import Link from 'next/link';


export default async function TeacherPage({ teacher }) {
    const avg = teacher.reviews.length > 0 ? ((teacher.total) / teacher.reviews.length).toFixed(2) : 0;
    return (
        <div className = "grid place-items-center items-start min-h-screen" style = {{background: '#a8a8a8'}}>

            <div className="shadow-lg p-10 rounded-lg border-t-4 border-green-400 bg-white mt-10 w-3/4 min-h-screen" style={{ borderTopColor: '#8a1e15' }}>

            <h1 className = "font-mono text-5xl font-extrabold">{teacher.name}</h1>

            <p className = "font-mono text-2xl font-extrabold mt-6 mb-6">Average Rating: {avg}</p>
            <Link href={`/review/${teacher._id}`}>
                <button className="text-white p-2 rounded-lg" style = {{background: '#8a1e15'}}>Write A Review</button>
            </Link>
            
            <div className = "grid place-items-center h-fit">
                <h2 className = "font-mono text-4xl font-extrabold mb-8 " >Reviews:</h2>
                    <ul className = "grid place-items-center h-fit">
                        {teacher.reviews.map((review) => (    
                            <li key = {review._id} className = "shadow-lg p-10 rounded-lg border-t-4 bg-white mb-10 w-full h-fit" style={{ borderTopColor: '#8a1e15' }}>
                                <p><span className="font-bold">Rating:</span> {review.rating}</p>
                                <p><span className="font-bold">Grade:</span> {review.grade}</p>
                                <p><span className="font-bold">Course:</span> {review.course}</p>
                                <div className = "font-bold">Comment:</div> 
                                <div className = "max-w-72 h-fit break-words">{review.comment}</div>      
                            </li>    
                            
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}