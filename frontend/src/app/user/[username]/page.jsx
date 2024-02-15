// 'use client'
import { getSessionData } from "@/app/login/actions"
import { getSessionId } from "@/app/login/handleSessions"
// import { useEffect } from "react"

export default async function UserDashboard({params}) {
    const sess = await getSessionId();
    console.log(sess);
    return(
        <>
            <title>Dashboard</title>
            <div className="bg-gray-200 min-h-screen py-8">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-md p-8">
        <h1 className="text-3xl font-semibold mb-4">Welcome, hbhjvgh</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Username:</p>
            <p>asdgag</p>
          </div>
          <div>
            <p className="font-medium">Email:</p>
            <p>hsrsghsr</p>
          </div>
          <div>
            <p className="font-medium">Date of Birth:</p>
            <p>gsdggd</p>
          </div>
          <div>
            <p className="font-medium">Category:</p>
            <p>gdgsdgsdgs</p>
          </div>
        </div>
      </div>
    </div>
            
        </>
    )
}