import { CHAT_GROUP_URL } from "@/lib/apiEndPoints";


export async function fetchChatGroups(token: string | null | undefined) {
    if(token==null || token==undefined) return [];

    const res = await fetch(CHAT_GROUP_URL, {
        headers: {
            Authorization: token
        },
        next: {
            revalidate: 60*30,
            tags: ["chat-group"]
        }
    })

    if(!res.ok) {
        throw new Error("Failed to fetch chat group data")
    }

    const response = await res.json();
    if(response?.data) {
        return response?.data;
    }

    return [];
}

export async function fetchChatGroup(id: string) {
    // console.log(`${CHAT_GROUP_URL}/${id}`);
    
    
    const res = await fetch(`${CHAT_GROUP_URL}/${id}`, {
        cache: "no-cache"
    });

    console.log("The response is: ", res);
    

    if(!res.ok) {
        throw new Error("Failed to fetch Chat Group data");
    }

    const response = await res.json();
    
    if(response?.data) {
        console.log(response.data);
        
        return response?.data;
    }

    return null;
}