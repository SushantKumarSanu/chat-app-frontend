import { useEffect } from "react";
import { socket } from "../../services/socket";
import useUserStore from "../store/userStore";


function useSocketConnection(){

  const user = useUserStore((state)=>state.user);



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