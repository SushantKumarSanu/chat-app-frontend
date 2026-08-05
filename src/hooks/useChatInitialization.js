import { useEffect, useState } from "react";
import api from "../services/api";

function useChatInitialization({ setChatlist , setotherUserActivity , user }){
    
    const [loading,setLoading] = useState(true);


    useEffect(() => { 
        (async()=>{
            try{
                const usersInitalActvivties = {}
                const chatsRes = await api.get("/api/chat/chats")
                setChatlist(chatsRes.data);
                console.log(chatsRes.data)

                chatsRes.data.forEach(chat => {
                const otherusers = chat.users.find(
                u=> String(u._id) !==String(user?._id)
                )||{};
                if(otherusers?._id){
                    usersInitalActvivties[otherusers._id] = {
                        isOnline:otherusers.isOnline,
                        typing:false
                    }
                }
                });
                setotherUserActivity(usersInitalActvivties);

            }catch(error){
                console.error(error.message);
            }finally{
                setLoading(false);
            };
        })();
    },[ setChatlist , setotherUserActivity , user ]);

    return {
        loading,
    };

}


export default useChatInitialization;