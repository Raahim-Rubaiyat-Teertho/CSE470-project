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
    return (
        <div>
            <title>Create | Music</title>
            <Navbar />

            <h1 className="text-center text-3xl font-semibold mt-7">Post Your Music</h1>

            <form  className="mx-52 ">
                <Input type='text' placeholder='Title' className='font-bold mt-7 mb-7 placeholder:font-medium' name='title'/>
                <Input type='file' name='music'/>
                <Button className='mt-5'>Post</Button>
            </form>
            <Toaster />
        </div>
    )
}