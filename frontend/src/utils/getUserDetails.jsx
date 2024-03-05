import { getSessionId } from "@/app/login/handleSessions";

export default async function GetUserDetails () {
    const user = await getSessionId();
    
    const user_fetch = await fetch(`http://localhost:8000/users/uname/${user}`);
    const user_json = await user_fetch.json();
    return user_json;
}