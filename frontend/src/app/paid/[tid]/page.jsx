import Link from "next/link";

export default function Paid () {
    return (
        <div className="h-screen flex justify-center flex-col items-center">
            <title>Payment Successful!</title>
            <h1 className="text-4xl font-bold">Payment completed successfully! Go to the <Link href='../login' className="h-screen text-green-600">Login Page</Link> </h1>
        </div>
    )
}