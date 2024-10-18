import { CHAT_GROUP_USERS_URL } from "@/lib/apiEndPoints";

export async function fetchChatUsers(id: string) {
    const res = await fetch(`${CHAT_GROUP_USERS_URL}?group_id=${id}`, {
        cache: "no-cache"
    })

    if(!res.ok) {
        throw new Error("Failed to fetch chat users' data!");
    }

    const response = await res.json();
    
    if(response?.data) {
        return response?.data
    }

    return [];
}