export type GroupChatType = {
    id: string,
    user_id: string;
    title: string, 
    passcode: string,
    created_at: string
}

export type GroupChatUserType = {
    id: number;
    name: string;
    group_id: string;
    created_at: string;
}

export type MessageType = {
    id: string;
    group_id: string;
    name: string;
    message: string;
    created_at: string;
}