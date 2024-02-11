import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main>
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-rose-300 via-pink-400 to-violet-400">
          <div className="p-3 border-2 border-r-4 border-l-4 rounded-md">
            <h1 className="font-black text-6xl text-white">Listen.Express</h1>
          </div>
        </div>

        <div className="h-screen bg-gradient-to-r from-rose-300 via-pink-400 to-violet-400">
          <div className="flex justify-center">
            <h1 className="text-4xl font-semibold text-center text-white px-52">Listen to other's creations and share your music with the world!</h1>
          </div>

          <div className="flex justify-center pt-20">
          <Button aschild variant="outline" className='text-white bg-inherit px-7 mr-10'>
          <Link href="/login">Login</Link>
          </Button>
          <Button aschild variant="outline" className='text-white bg-inherit px-5'>
          <Link href="/register">Register</Link>
          </Button>

          </div>
        </div>
    </main>
  );
}
