import Link from "next/link"

export default function PostMusicButton () {
    return (
        <div>
            <Link href="./create/music">
                <button className="p-24 border-2 border-black rounded-lg hover:shadow-lg hover:delay-75">
                    <h2 className="font-medium pb-3">
                        Upload new music
                    </h2>
                    <p className="text-muted-foreground">Share your music</p>
                </button>
            </Link>
        </div>
    )
}