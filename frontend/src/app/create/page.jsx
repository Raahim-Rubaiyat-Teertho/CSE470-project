'use client'

import CreateBlogButton from "@/components/ui/CreateBlogButton";
import PostMusicButton from "@/components/ui/PostMusicButton";
import Navbar from "@/components/ui/navbar";
import GetUserDetails from "@/utils/getUserDetails";
import { useEffect, useState } from "react";

export default  function Create() {
    const [dets, setDets] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_dets = await GetUserDetails();
                setDets(user_dets);
                console.log(user_dets);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchData();
    }, []);

    return(
        <div>
            <title>Create</title>
            <Navbar />

            <div className="flex justify-center pt-24">   
                <div className="mx-7">
                    <CreateBlogButton props={dets}/>
                </div>

                {dets.category=='artist' && (<div className="mx-7">
                    <PostMusicButton/>
                </div>)}
            </div>
        </div>
    )
}