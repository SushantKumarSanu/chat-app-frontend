import type { StateCreator } from "zustand";
import type { Chat } from "../../types/chat.type";

interface ActiveChatState{
    activeChat:Chat|null,
    setActiveChat:(chat:Chat)=>void 
}

export const createActiveChatSlice:StateCreator<ActiveChatState>= (set)=>(
    {
        activeChat:null,
        setActiveChat:(chat)=>set({ activeChat:chat })
    }
);


export type {ActiveChatState};

