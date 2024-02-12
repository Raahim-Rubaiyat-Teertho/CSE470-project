'use client'
import { getSessionData } from "@/app/login/actions"
import { useEffect } from "react"

export default async function UserDashboard({params}) {
    return(
        <>
            {params.username}
        </>
    )
}