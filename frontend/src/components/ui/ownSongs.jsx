'use client'

import { getSessionId } from "@/app/login/handleSessions"
import { useEffect, useState } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu"
import Link from "next/link";

export default function OwnSongs () {
    const [posts, setPosts] = useState([])
    const [deleted, setDeleted] = useState(false)
    const [toDelete, setToDelete] = useState('')

    useEffect(
        () => {
            const deletePost = async () => {
                try {
                    const res = await fetch (`http://localhost:8000/posts/delete/id=${postId}`,
                    {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json"
                          },
                    });
                }

                catch(err) {
                    console.log(err)
                }
            }
        }
    )

    useEffect(
        () => {
            async function fetchData () {
                const uname = await getSessionId();
                const data = await fetch(`http://localhost:8000/music/artist/${uname}`);
                const data_json = await data.json();
                setPosts(data_json.reverse());
            }
            fetchData ();
        }, []
    )
    return (
        <div>
            <div className="m-11 mx-20">
                {Array.isArray(posts) && posts.map((post) => (
                    <div className="mb-7" key={post._id}><Card>
                    <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <audio controls>
                  <source src={`http://localhost:8000/music/stream/${post._id}`} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </CardContent>
              <CardFooter>
                <div className="mr-3">
                  <svg className="hover:animate-bounce" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25">
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM385 231c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71V376c0 13.3-10.7 24-24 24s-24-10.7-24-24V193.9l-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 119c9.4-9.4 24.6-9.4 33.9 0L385 231z"/>
                  </svg>
                </div>
                <div>{post.uname}</div>
                {/* Button to stream audio */}
                {/* <button onClick={() => streamAudio(post.id)}>Stream</button> */}
              </CardFooter>
                    
                </Card>
                </div>
                
                ))}
            </div>
        </div>
    )
}