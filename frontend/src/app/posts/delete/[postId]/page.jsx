'use client'

import Navbar from "@/components/ui/navbar";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSessionId } from "@/app/login/handleSessions";
  

export default function DeletePost () {
    const [post, setPost] = useState({})
    const params = useParams();
    const [user, setUser] = useState();

    useEffect (
        () => {
            async function fetchPost ()  {
                const uname = await getSessionId();
                setUser(uname)
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

            <h1 className="text-center mt-5 text-3xl">Are you sure you want to delete this post?</h1>

            <div className="mx-32 mt-10">
            <Card>
                <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{post.description}</p>
                </CardContent>
                <CardFooter>
                    <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM385 231c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71V376c0 13.3-10.7 24-24 24s-24-10.7-24-24V193.9l-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 119c9.4-9.4 24.6-9.4 33.9 0L385 231z"/></svg>
                    <p>{post.upvotes}</p>
                </CardFooter>
            </Card>

            </div>

            <div className="flex justify-center mt-7">
                <Button className='mr-5 bg-red-700 hover:bg-red-600'>Delete</Button>
                <Link href={`/user/${user}`}><Button>Cancel</Button></Link>
            </div>
        </div>
    )
}