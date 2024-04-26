'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/navbar";
import { getSessionId } from "@/app/login/handleSessions";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
  } from "@/components/ui/card";

export default function Search () {
    const [posts, setPosts] = useState([]);
    const [pressed, setPressed] = useState(false);
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

    async function handleSearch (formData) {
        const title = formData.get('title')
        console.log(title)
        setPressed(true)

        const title_fetch = await fetch(`http://localhost:8000/posts/title/${title}`);
        const fetch_json = await title_fetch.json();
        console.log(fetch_json);
        setPosts(fetch_json);
    }

    
      async function handleUpvote(postId) {
        try {
          const response = await fetch(`http://localhost:8000/post/${postId}/upvote`, {
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
            <title>Search | Post</title>
            <Navbar />
            <h1 className="text-4xl font-bold text-center mt-10">Search For A Post</h1>
            <form action={handleSearch} className="mx-64 mt-10 flex flex-col">
                <Input type='text' placeholder='Search' name='title'/>
                <Button type='submit' className='mt-5'>Search</Button>
            </form>
            {
                console.log(posts)
            }

            <div>
            {posts.length > 0 ? posts.map((post) => (
            <div className="mb-7 mx-5 mt-10" key={post.id}><Card>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{post.description}</CardDescription>
            </CardContent>
            <CardFooter>
            <div className="mr-3">
              <button onClick={() => handleUpvote(post._id)}>
              <svg className={`hover:animate-bounce`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25" fill={`${post.upvoted_by.includes(uname) ? 'green' : ''}`}><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM385 231c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71V376c0 13.3-10.7 24-24 24s-24-10.7-24-24V193.9l-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 119c9.4-9.4 24.6-9.4 33.9 0L385 231z"/></svg>
              </button>
            </div>
            <div className="pr-3">{post.upvotes}</div>
            <div>{post.uname}</div>
            </CardFooter>
          </Card></div>
          
        )) : pressed ? <p className="mt-10 font-bold text-center">Not Found</p> : <p></p>}
            
          </div>
            </div>
        
    )
}