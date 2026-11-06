
import { socket } from "../../../services/socket";
import { useEffect } from "react";



function useSocketError(){


const handleSocketError = ({success,code,message}:{success:boolean,code:string,message:string})=>{
    console.error("Socket Error:",success,code,message);
};


useEffect(()=>{
    socket.on("socket error",handleSocketError);
    return ()=>{
        socket.off("socket error",handleSocketError);
    }
},[]);

};

export default useSocketError;