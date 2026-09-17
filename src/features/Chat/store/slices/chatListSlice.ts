import type { StateCreator } from "zustand";
import type { ChatList } from "../../types/chatList.type";


interface ChatListState{
    chatList:ChatList,
    setChatList:(chatList:ChatList)=>void,
    updateChatList:(update:(chatList:ChatList)=>ChatList)=>void
}


export const createChatListSlice:StateCreator<ChatListState> = (set)=>({
    chatList:[],
    setChatList:(chatList)=>set({chatList}),
    updateChatList:(update)=>set(state=>({chatList:update(state.chatList)}))
})

export type {ChatListState}