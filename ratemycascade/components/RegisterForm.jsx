"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm(){
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password){
            setError("Please fill in all fields.");
            return;
        }
        try{
            const resUserExists = await fetch('/api/userExists', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email})
            });
            const {user} = await resUserExists.json();
            if(user){
                setError("User already exists.");
                return;
            }
        } catch (error){
            setError("An error occurred. Please try again.");
        }
        try{
            const res = await fetch('/api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });
        if(res.ok){
            const form = e.target;
            form.reset();
            router.push("/verify");
        }
        else{
            console.log("Registration Failed");
        }
        } catch (error){
            setError("An error occurred. Please try again.");
        }
    }


    return (
        <div className = "grid place-items-center h-screen" style = {{background: '#a8a8a8'}}>
            <div className="shadow-lg p-10 rounded-lg border-t-4 border-green-400 bg-white" style={{ borderTopColor: '#8a1e15' }}>
                <h1 className="text-xl font-bold my-4">Register</h1>
                <form onSubmit = {handleSubmit} method="POST">
                    <div className="flex flex-col my-2">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" onChange ={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" onChange ={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button className="bg-green-500 text-white p-2 rounded-lg w-full" style={{ background: '#8a1e15' }}>Register</button>

                    {error && <p className="text-red-500">{error}</p>}

                    <Link className = "text-sm mt-3 text-right underline" href={"/"}> Already have an account? Login</Link>
                </form>
            </div>
        </div>
    );
}