import { useEffect } from "react";
import { socket } from "../../../services/socket";
import { useChatStore } from "../store/chatStore";





function useUserActivitySync(){

    const updateOtherUsersActivity = useChatStore((state)=>state.updateOtherUsersActivity);


    useEffect(()=>{
        const handleOnline = ({user}:{user:string})=>{
            updateOtherUsersActivity((otherUsersActivity)=>{
                return{
                    ...otherUsersActivity,
                    [user]:{
                        ...otherUsersActivity[user],
                        isOnline:true

                    }
                }
            });
        };

        const handleOffline = ({user}:{user:string})=>{

            updateOtherUsersActivity((otherUsersActivity)=>{
                return {
                    ...otherUsersActivity,
                    [user]:{
                    ...otherUsersActivity[user],
                    isOnline:false
                    }
                };
            });
        };

        const handleTyping = ({chatId,user}:{chatId:string,user:string})=>{
            updateOtherUsersActivity((otherUsersActivity)=>{
                return{
                        ...otherUsersActivity,
                        [user]:{
                            ...otherUsersActivity[user],
                            typing:chatId
                        }
                    };
            });
        };
        const handleStopTyping = ({user}:{user:string})=>{
            updateOtherUsersActivity((otherUsersActivity)=>{
                return{
                    ...otherUsersActivity,
                    [user]:{
                        ...otherUsersActivity[user],
                        typing:undefined
                    }
                }
            });
        };
        socket.on("user online",handleOnline);
        socket.on("user offline",handleOffline);
        socket.on("typing",handleTyping);
        socket.on("stop typing",handleStopTyping);
        return ()=> {
            socket.off("user online",handleOnline);
            socket.off("user offline",handleOffline);
            socket.off("typing",handleTyping);
            socket.off("stop typing",handleStopTyping);
        }
    },[updateOtherUsersActivity]);
};

export default useUserActivitySync;