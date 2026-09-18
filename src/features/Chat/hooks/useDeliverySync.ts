import { useEffect } from "react";
import { socket } from "../../../services/socket";
import { useChatStore } from "../store/chatStore";


function useDeliverySync(){
    const updateMessages = useChatStore(state=>state.updateMessages);

    useEffect(()=>{
        const handleDelivery = ({messageId,user}:{messageId:string,user:string})=>{

            updateMessages(messages=>
                messages.map(msg=>
                    msg._id===messageId ?
                    {
                        ...msg,
                        deliveredTo:[...msg.deliveredTo,user]
                    }
                    :msg
                )
            );


        //     setMessages(prev=>
        //     prev.map(msg=>{
        //         if(String(msg._id)===String(messageId)){
        //             return {...msg,
        //                 deliveredTo:[...msg.deliveredTo,user]
        //             };    
        //         }
        //         return msg;
        //     })
        //    );
        };
        socket.on("message recieved",handleDelivery)


        return ()=> {
            socket.off("message recieved",handleDelivery);
        }
    },[updateMessages]);


};


export default useDeliverySync ;