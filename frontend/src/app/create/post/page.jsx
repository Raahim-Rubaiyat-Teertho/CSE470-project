'use client'

import Navbar from "@/components/ui/navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getSessionId } from "@/app/login/handleSessions";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"
import { useRouter } from 'next/navigation'

export default function CreatePost ({ props }) { 
    const router = useRouter()
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

    async function uploadPost (formData) {
        const title = formData.get("title");
        const content = formData.get('content');
        const body = {
            uname: uname,
            title : title,
            description : content,
            upvotes : 0,
            upvoted_by : []
        }

        try {
            const response = await fetch('http://localhost:8000/posts/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                toast('Posted Successfully!', {
                    action: {
                        label : 'See Posts',
                        onClick: () => router.push('/posts')
                    }
                })
            } else {
                console.error('Could not post. Try again.');
            }
        } catch (error) {
            console.error('Error');
        }
    }

    return (
        <div>
            <title>Create | Post</title>
            <Navbar />

            <h1 className="text-center text-3xl font-semibold mt-7">Create a post</h1>

            <form action={uploadPost} className="mx-52 ">
                <Input type='text' placeholder='Title' className='font-bold mt-7 mb-7 placeholder:font-medium' name='title'/>
                <Textarea placeholder='Content' className='placeholder:font-medium' name='content'/>
                <Button className='mt-5'>Post</Button>
            </form>
            <Toaster />
        </div>
    )
}