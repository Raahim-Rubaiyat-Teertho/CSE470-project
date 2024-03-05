import Link from "next/link"

export default function CreateBlogButton () {
    return (
        <div>
            <Link href='./create/post'>
                <button className="p-24 border-2 border-black rounded-lg hover:shadow-lg hover:delay-75">
                    <h2 className="font-medium pb-3">Create Post</h2>
                    <p className="text-muted-foreground">Share your thoughts </p>
                </button>
            </Link>
        </div>
    )
}