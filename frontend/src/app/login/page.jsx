"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import {getSessionId, setSessionId} from "./handleSessions"
import Head from 'next/head';


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
            setSessionId(lnk_json.uname);
            const sess = await getSessionId();
            router.push(`/user/${sess}`)
        }
      }

    return(
        <div className="h-screen flex justify-center items-center flex-col w-fit mx-auto p-5">
            <title>Login</title>
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