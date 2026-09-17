import type { StateCreator } from "zustand";
import type { OtherUsersActivity } from "../../types/otherUsersActivity.type";


interface OtherUsersActivityState{
    otherUsersActivity:OtherUsersActivity,
    setOtherUsersActivity:(otherUserActivity:OtherUsersActivity)=>void
    updateOtherUsersActivity:(update:(otherUserActivity:OtherUsersActivity)=>OtherUsersActivity)=>void
}


export const createOtherUsersActivitySlice:StateCreator<OtherUsersActivityState>=(set)=>({
    otherUsersActivity:{},
    setOtherUsersActivity:(otherUsersActivity)=>set({otherUsersActivity}),
    updateOtherUsersActivity:(update)=>set(state=>({otherUsersActivity:update(state.otherUsersActivity)}))
});



export type {OtherUsersActivityState}