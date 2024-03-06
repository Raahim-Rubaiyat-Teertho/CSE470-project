'use client'

import { getSessionId } from "@/app/login/handleSessions"
import { useEffect, useState } from "react"

export default function OwnPosts () {
    const [dets, setDets] = useState({})

    useEffect(
        () => {
            async function fetchData () {
                const uname = await getSessionId();
                const data = await fetch(`http://localhost:8000/posts/${uname}`);
                const data_json = await data.json();
                setDets(data_json);
            }
            fetchData ();
        }, []
    )
    return (
        <>
        hi
        </>
    )
}