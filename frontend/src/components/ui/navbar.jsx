import { getSessionId } from "@/app/login/handleSessions";
import Link from "next/link";
import { useState, useEffect } from "react";


export default function Navbar () {
    const [sess, setSess] = useState('');

    useEffect(() => {
        async function fetchData() {
          const sessionId = await getSessionId();
          setSess(sessionId);
        }
    
        fetchData();
      }, []);

    return (
        <div className="flex justify-between p-4 bg-black text-white">
            <div>
                <p>Listen.Express</p>
            </div>

            <div className="flex">
                <div className="pr-5"><Link href="/posts">Posts</Link></div>
                <div className="pr-5"><Link href="/songs">Songs</Link></div>
                <div className="pr-5"><Link href="/create">Create</Link></div>
                <div className="pr-5"><Link href="/search">Search</Link></div>
                <div className="pr-5"><Link href={`/user/${sess}`}>Dashboard</Link></div>
            </div>

            <div>
                <p></p>
            </div>
        </div>
    )
}