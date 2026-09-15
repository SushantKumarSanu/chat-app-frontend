import type { StateCreator } from "zustand";
import type { OtherUserActivity } from "../../types/otherUsersActivity.type";


interface OtherUsersActivityState{
    otherUserActivity:OtherUserActivity,
    setOtherUserActivity:(otherUserActivity:OtherUserActivity)=>void
}


export const createOtherUserActivitySlice:StateCreator<OtherUsersActivityState>=(set)=>({
    otherUserActivity:{},
    setOtherUserActivity:(otherUserActivity)=>set({otherUserActivity})
});



export type {OtherUsersActivityState}