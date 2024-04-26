'use client'

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getSessionId } from "@/app/login/handleSessions";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"
import { useRouter } from 'next/navigation'

import Navbar from "@/components/ui/navbar";

export default function CreateMusic () {

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


    async function handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append('uname', uname)

        try {
            const response = await fetch('http://localhost:8000/music/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                toast('Posted Successfully!', {
                    action: {
                        label: 'See Songs',
                        onClick: () => router.push('/songs')
                    }
                });
            } else {
                console.error('Could not post. Try again.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <title>Create | Music</title>
            <Navbar />

            <h1 className="text-center text-3xl font-semibold mt-7">Post Your Music</h1>


<form onSubmit={handleFormSubmit} className="mx-52" encType="multipart/form-data">
    <Input type='text' placeholder='Title' className='font-bold mt-7 mb-7 placeholder:font-medium' name='title'/>
    <Input type='file' name='music'/>
    <Button type="submit" className='mt-5'>Post</Button>
</form>
            <Toaster />
        </div>
    )
}