"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { handleLogin } from "./actions";
import { useRouter } from 'next/navigation'


export default async function LoginPage() {
    const router = useRouter()
    async function search(formData) {
        const email = formData.get("email");
        const pass = formData.get('password');

        const data = {'email' : email, 'pass': pass}
        console.log(data);

        const lnk = `http://localhost:8000/users/email/${email}`;
        const lnk_fetch = await fetch(lnk);
        const lnk_json = await lnk_fetch.json();
        console.log(lnk_json);

        if(lnk_json.pass != pass) {
            alert('Wrong Password')
        }

        else {
            handleLogin(lnk_json.username);
            router.push(`/user/${lnk_json.uname}`)
        }
      }

    return(
        <div className="h-screen flex justify-center items-center flex-col w-fit mx-auto p-5">
            <div className="px-7 border-2 py-20 rounded-lg">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight pb-5 text-center">
                Login
            </h3>

            <form action={search}>
                <div className="pb-5">
                    <Input type="email" placeholder = "Email" name='email' className='mb-2'/>
                    <Input type="password" placeholder = "Password" name='password'/>
                </div>

                <div className="flex justify-center">
                    <Button>Login</Button>
                </div>
            </form>
            </div>
        </div>
    )
}