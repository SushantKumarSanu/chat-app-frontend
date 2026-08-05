import { useEffect } from "react";
import { socket } from "../services/socket";

function useReadSync({ setChatlist , setActiveChat }){

    useEffect(()=>{

        const handleReadReciept = ({updatedChat})=>{

            setChatlist(prev=>
                prev.map(chat=>
                    chat?._id === updatedChat?._id
                    ?{...chat,
                     lastRead:updatedChat.lastRead
                    }
                    :chat
                )
            );

            setActiveChat(prev=>
                prev?._id === updatedChat?._id
                ? {...prev,
                   lastRead:updatedChat.lastRead
                }
                : prev
            );

        };

        socket.on("message read",handleReadReciept);

        return () => socket.off("message read",handleReadReciept);

    },[setChatlist,setActiveChat])
};

export default useReadSync;