'use client'

import { useState } from "react"
import OwnPosts from "./ownPosts"
import OwnSongs from "./ownSongs"

export default function DashboardOwnPosts () {
    const [showOwnPosts, setShowOwnPosts] = useState(true)
    const [showOwnMusic, setShowOwnMusic] = useState(false)

    function handleSetShowOwnPosts () {
        setShowOwnPosts(true)
        setShowOwnMusic(false)

    }

    function handleSetShowOwnMusic () {
        setShowOwnMusic(true)
        setShowOwnPosts(false)
    }
    return (
        <div>
        {/* <h2 className="mt-10 font-bold text-2xl text-center">Your posts</h2> */}
        <div className="flex justify-center mt-10">
          <button className={`px-4 py-2 mr-3 border-2 rounded-md ${showOwnPosts ? 'bg-black text-white border-2 border-black' : 'bg-white text-black'}`} onClick={handleSetShowOwnPosts}>Your posts</button>
          <button className={`px-4 py-2 border-2 rounded-md ${showOwnMusic ? 'bg-black text-white border-2 border-black' : 'bg-white text-black'}`} onClick={handleSetShowOwnMusic}>Your music</button>
        </div>

        <div>
            {
                showOwnPosts ?

                <OwnPosts /> : <OwnSongs />
            }
        </div>
        
      </div>
    )
}