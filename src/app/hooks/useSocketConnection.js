import { useEffect } from "react";
import { socket } from "../../services/socket";


function useSocketConnection({user}){
    useEffect(()=>{
        if(!user?._id) return;
        const token = localStorage.getItem("token");
        socket.auth = {token};
        socket.connect();
    
        socket.on("connected",()=>{
          console.log("socket authenticated");
        })
    
        return ()=>{
          socket.disconnect();
        };
    },[user?._id]);
};

export default useSocketConnection;