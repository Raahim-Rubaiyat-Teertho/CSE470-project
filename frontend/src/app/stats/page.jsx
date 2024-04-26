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
  } from "@/components/ui/card";

  export default function Stats () {
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

    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        fetch(`http://localhost:8000/stats/artist/${uname}`)
          .then((response) => response.json())
          .then((data) => setPosts(data))
          .then(console.log(posts))
          .catch((error) => console.error("Error fetching posts:", error));
      }, []);

    return (
      <h1>Stats</h1>
    )
  }

  