'use client'

import { useRouter } from 'next/navigation'
import { getSessionId } from "@/app/login/handleSessions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/navbar";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditPost () {
    const [post, setPost] = useState({})
    // const [body, setBody] = useState({})
    const [uname, setUname] = useState()
    const params = useParams();
    const router = useRouter();
    const [clickAgain, setClickAgain] = useState(false)

    // function handleSubmit (formData) {
    //     const title = formData.get('title');
    //     const description = formData.get('description');
    //     setBody({uname: uname, title, description, upvotes:0})
    //     console.log(body)
    // }
    async function handleSubmit(formData) {
        try {
            const title = formData.get('title');
            const description = formData.get('description');
            const body = {uname: uname, title, description, upvotes:0}
            const response = await fetch(`http://localhost:8000/posts/edit/id=${params.postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                console.log('Post edited successfully');
                // You can add further handling here if needed
                router.push(`/user/${uname}`)

            } else {
                console.error('Failed to edit post');
            }
        } catch (error) {
            console.error('Error editing post:', error);
        }
    }
    useEffect (
        () => {
            async function fetchPost ()  {
                const name = await getSessionId();
                setUname(name)
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
            <h1 className="text-center mt-5 text-3xl">Edit Post</h1>

            <form className="mx-20 mt-10" action={handleSubmit}>
                <Input defaultValue={post.title} className='font-bold placeholder:font-medium' placeholder='Title' name='title'/>
                <Textarea defaultValue={post.description} className='mt-5 placeholder:font-medium'placeholder='Description' name='description'/>

                <div className="mt-5">
                    <Button onClick={() => {setClickAgain(true)}}>Edit</Button>
                </div>
            </form>

            {/* <div className='mt-5'>
                {
                    clickAgain && 
                    <p>Click again to confirm changes</p>
                }
            </div> */}
        </div>
    )
}