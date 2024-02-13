// 'use client'
import { getSessionData } from "@/app/login/actions"
import { getSessionId } from "@/app/login/handleSessions"
// import { useEffect } from "react"

export default async function UserDashboard({params}) {
    const sess = await getSessionId();
    console.log(sess);
    return(
        <>
            <title>Dashboard</title>
            {sess}
        </>
    )
}