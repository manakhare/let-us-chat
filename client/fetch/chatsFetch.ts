import { CHAT_MESSAGES_URL } from "@/lib/apiEndPoints";

export async function fetchChatMessages(groupId: string) {

    try {
        // console.log(`${CHAT_MESSAGES_URL}/${groupId}`);
        
        const res = await fetch(`${CHAT_MESSAGES_URL}/${groupId}`, {
            cache: "no-cache"
        })
    
        if(!res.ok) {
            throw new Error("Failed to fetch messages");
        }
    
        const response = await res.json();
    
        if(response?.data) {
            return response?.data
        }
    
        return [];
    
    } catch (error) {
        console.log(error);
        
    }
}