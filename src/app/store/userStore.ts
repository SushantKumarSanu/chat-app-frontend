import { create } from "zustand";
import { User } from "../../shared/types/user.type";
import { devtools } from "zustand/middleware";


interface UserState{
    user:User|null;
    setUser:(user:User)=>void;
    clearUser:()=>void;
}


const useUserStore = create<UserState>()(
    devtools((set)=>({
        user:null,
        setUser:(user)=>set({ user },false,"user/setUser"),
        clearUser:()=>set({user:null},false,"user/clearUser"),
    }))
);

export default useUserStore;