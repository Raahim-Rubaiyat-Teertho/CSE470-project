'use client'
import { getSessionData } from "@/app/login/actions"
import { deleteSessionId, getSessionId, setSessionId } from "@/app/login/handleSessions"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



export default function UserDashboard({params}) {
    const sess = params.username
    const [data, setData] = useState("")

    function handleLogout () {
      window.location.replace('/login')
      deleteSessionId("session-id")
    }
    
    async function getInfo () {
      const lnk= `http://localhost:8000/users/uname/${sess}`;
      const lnk_f = await fetch(lnk);
      const lnk_j = await lnk_f.json();
      setData(lnk_j)
      console.log(lnk_j)
    }

    async function handleEdit(formData) {
      const name = formData.get('name');
      const username = formData.get('username');
    
      console.log({ name, username });
    
      const updated_data = { ...data, name: name, uname: username };
    
      try {
        const response = await fetch(
          `http://localhost:8000/users/account/edit/${data.uname}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(updated_data),
          }
        );
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const result = await response.json();
        console.log(result);
        deleteSessionId('session-id')
        window.location.replace('/login')
      } catch (error) {
        console.error('Error:', error);
      }
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
            <Button className="mr-2" onClick = {handleLogout}>Logout</Button>
            <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={handleEdit}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue= {data.name}
              className="col-span-3" name="name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue= {data.uname}
              className="col-span-3" name="username"
            />
          </div>
          <DialogDescription className='text-center'>You will have to log in again for this action</DialogDescription>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
          </div>
        </div>
      </div>
    </div>
            
        </>
    )
}