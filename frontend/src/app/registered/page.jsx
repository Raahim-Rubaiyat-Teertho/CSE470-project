import Link from "next/link";

export default function RegSuccess() {
    return (
        <div className="h-screen flex justify-center flex-col items-center">
            <h1 className="text-4xl font-bold">Account created successfully! Go to <Link href='./login' className="h-screen text-green-600">Login Page</Link> </h1>
        </div>
    )
}