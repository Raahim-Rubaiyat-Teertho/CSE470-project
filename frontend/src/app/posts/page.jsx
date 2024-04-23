"use client"
import React, { useState, useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import { getSessionId } from "@/app/login/handleSessions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Posts() {
  const [posts, setPosts] = useState([]);

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

  useEffect(() => {
    fetch("http://localhost:8000/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data.reverse()))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

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
      <title>Posts</title>
      <Navbar />
      
      <div className="m-11 mx-20">
        <h2 className="text-2xl font-bold text-center mb-7">Posts</h2>
        {posts.map((post) => (
            <div className="mb-7" key={post.id}><Card>
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
          
        ))}
      </div>
    </div>
  );
}
