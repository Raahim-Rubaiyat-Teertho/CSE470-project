"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'

export default async function RegisterPage() {
    const router = useRouter()

    async function reg(formData) {
        const name = formData.get("name");
        const email = formData.get('email');
        const uname = formData.get('uname');
        const pass = formData.get("pass");
        const dob = formData.get('dob');
        const category = "not_set";
        const payment =  {paid : false, paid_date : "none"};

        const body = {name, email, uname, pass, dob, category, payment}; 

        console.log({name, email, uname, pass, dob})

        try {
            const response = await fetch('http://localhost:8000/account/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                console.log('User registered successfully');
                // Handle success, e.g., redirect to another page
                router.push('./registered')
            } else {
                console.error('Error registering user');
                // Handle error, e.g., display an error message
            }
        } catch (error) {
            console.error('Error during registration:', error);
            // Handle other errors
        }
    
    }

    return(
        <div className="h-screen flex justify-center items-center flex-col w-fit mx-auto p-5">
            <title>Register</title>
            <div className="px-7 border-2 py-20 rounded-lg">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight pb-5 text-center">
                Register
            </h3>

            <form action={reg}>
                <div className="pb-5">
                    <Input type="text" placeholder="Your Name" className='mb-2' name="name"/>
                    <Input type="text" placeholder="Enter a Username" className='mb-2' name="uname"/>
                    <Input type="email" placeholder = "Email" className='mb-2' name="email"/>
                    <Input type="password" placeholder = "Password" className='mb-2' name="pass"/>
                    <Input type="date" placeholder="Date of Birth" name="dob"/>
                </div>

                <div className="flex justify-center">
                    <Button>Register</Button>
                </div>
            </form>
            </div>
        </div>
    )
}