import { useEffect, useState } from "react";
import api from "../../../services/api";
import useUserStore from "../../../app/store/userStore";
import { useChatStore } from "../store/chatStore";
import type { OtherUsersActivity } from "../types/otherUsersActivity.type";
import type { Chat } from "../types/chat.type";
import type { User } from "../../../shared/types/user.type";
import axios from "axios";

function useChatInitialization(){
    
    const [loading,setLoading] = useState(true);
    const user = useUserStore((state)=>state.user);
    const setChatList = useChatStore((state)=>state.setChatList);
    const setotherUsersActivity = useChatStore((state)=>state.setOtherUsersActivity);


    useEffect(() => { 
        (async()=>{
            try{
                const usersInitalActvivties:OtherUsersActivity = {}
                const chatsRes = await api.get("/api/chat/chats")
                setChatList(chatsRes.data);
                console.log(chatsRes.data)

                chatsRes.data.forEach((chat:Chat) => {
                const otherusers:User|undefined = chat.users.find(
                u=> String(u._id) !==String(user?._id)
                )
                if(otherusers?._id){
                    usersInitalActvivties[otherusers._id] = {
                        isOnline:otherusers.isOnline,
                        typing:false
                    }
                }
                });
                setotherUsersActivity(usersInitalActvivties);

            }catch(error){
                if(axios.isAxiosError(error))
                console.error(error.message);
            }finally{
                setLoading(false);
            };
        })();
    },[ setChatList , setotherUsersActivity , user?._id ]);

    return {
        loading,
    };

}


export default useChatInitialization;