import { useEffect } from "react";
import { socket } from "../services/socket";


function useUserActivitySync({setotherUserActivity}){
    useEffect(()=>{
        const handleOnline = ({user})=>{
             setotherUserActivity(prev=>({
                ...prev,
                [String(user)]:{
                    ...prev[user],
                    isOnline:true
                }
            }));
        };

        const handleOffline = ({user})=>{
            setotherUserActivity(prev=>({
                ...prev,
                [String(user)]:{
                    ...prev[user],
                    isOnline:false
                }
            }));
        }
        const handleTyping = ({chatId,user})=>{
            setotherUserActivity(prev=>({
                ...prev,
                [user]:{
                 ...prev[user],
                  typing:chatId
                }
            }));
        };
        const handleStopTyping = ({user})=>{
             setotherUserActivity(prev=>({
                ...prev,
                [user]:{
                    ...prev[user],
                    typing:undefined
                }
            }));
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
    },[setotherUserActivity]);
};

export default useUserActivitySync;