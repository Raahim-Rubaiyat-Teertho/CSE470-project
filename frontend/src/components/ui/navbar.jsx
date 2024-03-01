"use client"
import { getSessionId } from "@/app/login/handleSessions";
import Link from "next/link";

export default async function Navbar () {
    const sess = await getSessionId()

    return (
        <div className="flex justify-between p-4 bg-black text-white">
            <div>
                <p>Listen.Express</p>
            </div>

            <div className="flex">
                <div className="pr-5"><Link href="../posts">Posts</Link></div>
                <div className="pr-5"><Link href="../songs">Songs</Link></div>
                <div className="pr-5"><Link href="../create">Create</Link></div>
                <div className="pr-5"><Link href={`../users/${sess}`}></Link></div>
            </div>

            <div>
                Logout
            </div>
        </div>
    )
}