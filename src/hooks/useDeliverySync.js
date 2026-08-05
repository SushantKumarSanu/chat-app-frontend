import { useEffect } from "react";
import { socket } from "../services/socket";


function useDeliverySync({setMessages}){

    useEffect(()=>{
        const handleDelivery = ({messageId,user})=>{
            return setMessages(prev=>
            prev.map(msg=>{
                if(String(msg._id)===String(messageId)){
                    return {...msg,
                        deliveredTo:[...msg.deliveredTo,user]
                    };    
                }
                return msg;
            })
           );
        };
        socket.on("message recieved",handleDelivery)


        return ()=> socket.off("message recieved",handleDelivery);
    },[setMessages]);


};


export default useDeliverySync ;