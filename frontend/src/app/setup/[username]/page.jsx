"use client"

import { getSessionId } from "@/app/login/handleSessions";
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function ProfileSetup() {
    const [ls, setLs] = useState("ls1");
    const [data, setData] = useState("")
    const [user, setUser] = useState("")
    const art_price = 2000
    const aud_price = 1000
    

    async function setupData (formData) {
        const categ = formData.get("type")
        console.log(categ)
        setData(categ)
        const sess = await getSessionId();
        console.log(sess)

        const lnk = `http://localhost:8000/users/uname/${sess}`;
        const lnk_ft = await fetch(lnk);
        const lnk_j = await lnk_ft.json()
        setUser(lnk_j)
    }

    function submit () {
        setLs("ls2")
    }

    async function goPay () {
        var price = 0

        if(data == "artist") {
            price += 2000
        }

        else {
            price = 1000
        }

        fetch(
            "http://localhost:8000/order", {
                method: "POST",
                headers: {"content-type" : "application/json"},
                body: JSON.stringify({type : data, cost : price, user})
            }
        )
        .then(res => res.json())
        .then(res => {
            window.location.replace(res.url)
            console.log(res)
            console.log(user)
        })
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
                        Your total is {art_price} taka

                        <div>
                            <Button className='mt-5' onClick={goPay}>Move to payment</Button>
                        </div>
                    </h1>
                    :
                    <h1 className="text-xl mt-10 text-center">
                        Your total is {aud_price} taka
                        <div>
                            <Button className='mt-5' onClick={goPay}>Move to payment</Button>
                        </div>
                    </h1>
                    
                }
            </div>
        </>
    )
}