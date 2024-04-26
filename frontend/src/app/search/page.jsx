'use client'

import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import Link from "next/link";

export default function Search () {
    return (
        <div>
            <title>Search</title>
            <Navbar />
            <h1 className="font-bold text-4xl text-center mt-10">Search</h1>

            <div className="flex justify-center mt-10 gap-x-5">
                <Link href='./search/song'>
                    <Button>Search For A Song</Button>
                </Link>

                <Link href='./search/post'>
                    <Button>Search For A Post</Button>
                </Link>
            </div>
        </div>
    )
}