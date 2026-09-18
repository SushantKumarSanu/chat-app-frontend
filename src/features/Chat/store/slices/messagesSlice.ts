import type { StateCreator } from "zustand"
import type { Messages } from "../../types/messages.type"



interface MessagesState{
    messages:Messages,
    setMessages:(messages:Messages)=>void
    updateMessages:(update:(messages:Messages)=>Messages)=>void
}


export const createMessagesSlice:StateCreator<MessagesState> = (set)=>({
    messages:[],
    setMessages:(messages)=>set({messages}),
    updateMessages:(update)=>set(state=>({messages:update(state.messages)}))
});

export type {MessagesState}
