"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false
            });

            if(result.error){
                setError("Make sure email and password are correct and email is verified.");
                return
            }
            if(!result.error){
                setError(null);
                router.push("/search");
                
            }
            
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className = "grid place-items-center h-screen" style = {{background: '#a8a8a8'}}>
            <div className="shadow-lg p-10 rounded-lg border-t-4 bg-white" style={{ borderTopColor: '#8a1e15' }}>
                <h1 className="text-xl font-bold my-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col my-2">
                        <label htmlFor="email">Email:</label>
                        <input onChange={e => setEmail(e.target.value)} type="email" id="email" name="email" />
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="password">Password:</label>
                        <input onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" />
                    </div>
                    <button className="text-white p-2 rounded-lg w-full" style = {{background: '#8a1e15'}}>Login</button>

                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-red-500">{success}</p>}

                    <Link className = "text-sm mt-3 text-right underline" href={"/register"}> Don&apos;t have an account? Register</Link>
                    <br/>
                    <Link className = "text-sm mt-3 text-right underline" href={"/verify"}> Didn&apos;t verify?</Link>
                </form>
            </div>
        </div>

    );
}