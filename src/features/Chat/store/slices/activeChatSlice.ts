import type { StateCreator } from "zustand";
import type { Chat } from "../../types/chat.type";

interface ActiveChatState{
    activeChat:Chat|null,
    setActiveChat:(chat:Chat)=>void,
    updateActiveChat:(update:(activeChat:Chat)=>Chat)=>void 
}

export const createActiveChatSlice:StateCreator<ActiveChatState>= (set)=>(
    {
        activeChat:null,
        setActiveChat:(chat)=>set({ activeChat:chat }),
        updateActiveChat:(update)=>set((state)=>{
            if(state.activeChat===null){
                return state
            }
            return{
                activeChat:update(state.activeChat)
            }
        })
    }
);


export type {ActiveChatState};

