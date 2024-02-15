"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function ProfileSetup() {
    const [ls, setLs] = useState("ls1");
    const [data, setData] = useState("")

    async function setupData (formData) {
        const categ = formData.get("type")
        console.log(categ)
        setData(categ)
    }

    function submit () {
        setLs("ls2")
    }

    return(
        <>
            <title>Profile Setup</title>

            <div className="mx-72 mt-10">
                <h1 className="text-4xl font-bold text-center">Let's set you up!</h1>

                <form action={setupData} className="mt-20 text-center">
                        <h1 className="text-xl">Are you an artist or an audience?</h1>
                        <div className="mt-4">
                            <input type="checkbox" name="type" value="artist"/>
                            <label for="artist" className="mr-5"> Artist</label>
                            <input type="checkbox" name="type" value="audience"/>
                            <label for="audience"> Audience</label>
                        </div>

                            <Button className="mt-5" onClick={submit}>Next</Button>
                </form>

                {   (ls == "ls1")? <></>:
                    (ls == "ls2" && data=='artist') ?
                    <h1 className="text-xl mt-10 text-center">
                        Your total is 2000 taka
                    </h1>
                    :
                    <h1 className="text-xl mt-10 text-center">
                        Your total is 1000 taka
                    </h1>
                    
                }
            </div>
        </>
    )
}