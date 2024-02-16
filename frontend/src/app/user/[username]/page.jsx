'use client'
import { getSessionData } from "@/app/login/actions"
import { getSessionId } from "@/app/login/handleSessions"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'

export default function UserDashboard({params}) {
    const sess = params.username
    const [data, setData] = useState("")
    
    async function getInfo () {
      const lnk= `http://localhost:8000/users/uname/${sess}`;
      const lnk_f = await fetch(lnk);
      const lnk_j = await lnk_f.json();
      setData(lnk_j)
      console.log(lnk_j)
    }

    useEffect(
      () => {
        getInfo();
      }, []
    );

    return(
        <>
            <title>Dashboard</title>
            <div className=" min-h-screen py-8">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-md p-8">
        <h1 className="text-3xl font-semibold mb-4 text-center">Welcome, {data.name}</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Username:</p>
            <p>{data.uname}</p>
          </div>
          <div>
            <p className="font-medium">Email:</p>
            <p>{data.email}</p>
          </div>
          <div>
            <p className="font-medium">Date of Birth:</p>
            <p>{data.dob}</p>
          </div>
          <div>
            <p className="font-medium">Category:</p>
            <p>{data.category}</p>
          </div>

          <div>
            <Button>Logout</Button>
            <Button className="ml-2">Edit Profile</Button>
          </div>
        </div>
      </div>
    </div>
            
        </>
    )
}