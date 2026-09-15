import type { StateCreator } from "zustand";
import type { ChatList } from "../../types/chatList.type";


interface ChatListState{
    chatList:ChatList,
    setChatList:(chatList:ChatList)=>void
}


export const createChatListSlice:StateCreator<ChatListState> = (set)=>({
    chatList:[],
    setChatList:(chatList)=>set({chatList})
})

export type {ChatListState}