"use client"
import React, { useState, useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data.reverse()))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div>
      <Navbar />
      
      <div className="m-11 mx-20">
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
            <svg className="hover:animate-bounce" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM385 231c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71V376c0 13.3-10.7 24-24 24s-24-10.7-24-24V193.9l-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 119c9.4-9.4 24.6-9.4 33.9 0L385 231z"/></svg>
            </div>
            <div>{post.uname}</div>
            
            </CardFooter>
            
          </Card></div>
          
        ))}
      </div>
    </div>
  );
}
