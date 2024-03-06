'use client'

import Navbar from "@/components/ui/navbar";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditPost () {
    const [post, setPost] = useState({})
    const params = useParams();

    useEffect (
        () => {
            async function fetchPost ()  {
                const post_lnk = await fetch(`http://localhost:8000/posts/id=${params.postId}`);
                const post_json = await post_lnk.json();
                setPost(post_json);
                console.log(post_json);
            } 
            fetchPost();
        }, []
    )
    return (
        <div>
            <Navbar />
        </div>
    )
}