import { useState , useEffect } from "react";
import api from "../../../services/api"; 
import axios from "axios";
import { useChatStore } from "../store/chatStore";


function useMessageInitialization(){

    const [messageLoading,setmessageLoading] = useState(false);

    const activeChat = useChatStore((state)=>state.activeChat);
    const activeChatId = activeChat?._id;

    const setMessages =  useChatStore((state)=>state.setMessages);

    useEffect(()=>{
        
        if(!activeChatId) return;

        setmessageLoading(true);      

        (async()=>{

            try{

                const messages = await api.get(`/api/messages/messages/${activeChatId}`);
                setMessages([...messages.data].reverse());

            }catch(error){
                if(axios.isAxiosError(error)){
                    console.error(error.message);
                    console.error(error.stack);
                }

            }finally{
            setmessageLoading(false);
            };

        })();

    },[ setMessages , activeChatId ]);
    

    return{
        messageLoading
    }
};

export default useMessageInitialization;