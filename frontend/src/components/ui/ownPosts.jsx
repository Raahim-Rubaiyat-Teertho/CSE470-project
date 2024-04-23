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

export default function OwnPosts () {
    const [posts, setPosts] = useState([])
    const [deleted, setDeleted] = useState(false)
    const [toDelete, setToDelete] = useState('')

    const [uname, setUname] = useState('');

    useEffect(() => {
        const fetchSessionId = async () => {
            try {
                const id = await getSessionId();
                setUname(id);
            } catch (error) {
                console.error("Error fetching session ID:", error);
            }
        };

        fetchSessionId();
    }, []);

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
                const data = await fetch(`http://localhost:8000/posts/${uname}`);
                const data_json = await data.json();
                setPosts(data_json.reverse());
            }
            fetchData ();
        }, []
    )

    async function handleUpvote(postId) {
        try {
          const response = await fetch(`http://localhost:8000/posts/${postId}/upvote`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ uname })
          });
          if (response.ok) {
            const updatedPosts = posts.map((post) => {
              if (post._id === postId) {
                if (post.upvoted_by.includes(uname)) {
                  // User already upvoted, so remove their upvote
                  const updatedUpvotedBy = post.upvoted_by.filter((name) => name !== uname);
                  return { ...post, upvotes: post.upvotes - 1, upvoted_by: updatedUpvotedBy };
                } else {
                  // User hasn't upvoted, so add their upvote
                  return { ...post, upvotes: post.upvotes + 1, upvoted_by: [...post.upvoted_by, uname] };
                }
              } else {
                return post;
              }
            });
            setPosts(updatedPosts);
          } else {
            console.error("Failed to upvote post");
          }
        } catch (error) {
          console.error("Error upvoting post:", error);
        }
      }
    return (
        <div>
            <div className="m-11 mx-20">
                {Array.isArray(posts) && posts.map((post) => (
                    <div className="mb-7" key={post._id}><Card>
                    <CardHeader className='flex flex-row justify-between'>
                        <CardTitle>{post.title}</CardTitle>
                        <DropdownMenu>
                        <DropdownMenuTrigger><svg xmlns="http://www.w3.org/2000/svg" className='w-3 h-3'viewBox="0 0 192 512"><path d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"/></svg></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Link href={`/posts/edit/${post._id}`}><DropdownMenuItem>Edit</DropdownMenuItem></Link>
                            <Link href={`/posts/delete/${post._id}`}><DropdownMenuItem>Delete</DropdownMenuItem></Link>
                        </DropdownMenuContent>
                        </DropdownMenu>

                    </CardHeader>
                    <CardContent>
                    <CardDescription>{post.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                    {/* <div className="mr-3">
                    <svg className="hover:animate-bounce" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM385 231c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71V376c0 13.3-10.7 24-24 24s-24-10.7-24-24V193.9l-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 119c9.4-9.4 24.6-9.4 33.9 0L385 231z"/></svg>
                    </div>
                    <div className="pr-3">{post.upvotes}</div>
                    <div>{post.uname}</div>
                     */}

                    <div className="mr-3">
                        <button onClick={() => handleUpvote(post._id)}>
                        <svg className={`hover:animate-bounce`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25" fill={`${post.upvoted_by.includes(uname) ? 'green' : ''}`}><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM385 231c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71V376c0 13.3-10.7 24-24 24s-24-10.7-24-24V193.9l-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 119c9.4-9.4 24.6-9.4 33.9 0L385 231z"/></svg>
                        </button>
                        </div>
                        <div className="pr-3">{post.upvotes}</div>
                    <div>{post.uname}</div>
                    </CardFooter>
                    
                </Card>
                </div>
                
                ))}
            </div>
        </div>
    )
}