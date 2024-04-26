'use client'

import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import Link from "next/link";

export default function Stats () {
    return (
        <div>
            <Navbar />
            <div className="mt-10 flex justify-center gap-x-10">

                <Link href='./stats/audience'>
                    <Button>Posts Statistics</Button>
                </Link>

                <Link href='./stats/artist'>
                    <Button>Song Statistics</Button>
                </Link>
            </div>
        </div>
    )
}