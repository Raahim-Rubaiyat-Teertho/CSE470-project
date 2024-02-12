import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function LoginPage() {
    return(
        <div className="h-screen flex justify-center items-center flex-col w-fit mx-auto p-5">
            <div className="px-7 border-2 py-20 rounded-lg">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight pb-5 text-center">
                Login
            </h3>

            <div>
                <div className="pb-5">
                    <Input type="email" placeholder = "Email" className='mb-2'/>
                    <Input type="password" placeholder = "Password"/>
                </div>

                <div className="flex justify-center">
                    <Button>Login</Button>
                </div>
            </div>
            </div>
        </div>
    )
}