"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OTPform() {
    const[otp, setOtp] = useState('');
    const[error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(otp);
        console.log("OTP");
        if(!otp){
            setError("Please fill in all fields.");
            return;
        }
        window.open(`/api/auth/verify-email?token=${otp}`, '_blank');
    };
    return(
        <div className = "grid place-items-center h-screen" style = {{background: '#a8a8a8'}}>
        <div className="shadow-lg p-10 rounded-lg border-t-4 bg-white" style={{ borderTopColor: '#8a1e15' }}>
            <h1 className="text-xl font-bold my-4">Verify</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col my-2">
                    <label htmlFor="Enter verification token">Token:</label>
                    <input onChange={e => setOtp(e.target.value)}/>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button className="text-white p-2 rounded-lg w-full" style = {{background: '#8a1e15'}}>Enter</button>
            </form>
            
        </div>
    </div>
    )
}