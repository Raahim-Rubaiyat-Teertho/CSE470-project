'use server'
import { cookies } from "next/headers";

export async function getSessionId() {
    const cookieStore = cookies();
    return cookieStore.get("session-id")?.value;
  }
  
export async function setSessionId(sessionId) {
    const cookieStore = cookies();
    cookieStore.set("session-id", sessionId);
}

export async function deleteSessionId(sessionId) {
  const cookieStore = cookies()
  cookieStore.set(sessionId, "")
}