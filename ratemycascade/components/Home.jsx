"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const router = useRouter();
    //implement find by name
    useEffect(() => {
            const fetchTeachers = async() => {
                try{
                    const res = await fetch('/api/teachers');
                    const data = await res.json();
                    setTeachers(data);
                    setFilteredTeachers(data);
                }
                catch (error) {
                    console.log(error);
                }
            
        };

        fetchTeachers();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.value;
        setSearchQuery(query);
        setFilteredTeachers(
            teachers.filter((teacher) =>
                teacher.name.toLowerCase().includes(query.toLowerCase())
            )
        );
    };
    const handleSelect = (id) => {
        router.push(`/teacher/${id}`);
    };
    return (
        <div className = "grid place-items-center min-h-screen" style = {{background: '#a8a8a8'}}>
            <div className="shadow-lg p-10 rounded-lg border-t-4 bg-white mt-7 mb-7" style={{ borderTopColor: '#8a1e15' }}>
            <h1 className = "font-bold">Search for a Teacher</h1>
            <input 
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Enter teacher's name"
                className = "mb-4"
            />
            <ul>
                {filteredTeachers.map((teacher) => (
                    <li key={teacher._id} onClick={() => handleSelect(teacher._id)} className = "text-[#8a1e15] underline cursor-pointer">
                        {teacher.name}
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
}
