import { useState , useEffect } from "react";
import api from "../services/api"; 


function useMessageInitialization({ activeChat , setMessages }){

    const [messageLoading,setmessageLoading] = useState(false); 

    useEffect(()=>{
        
        if(!activeChat?._id) return;

        setmessageLoading(true);      

        (async()=>{

            try{

                const messages = await api.get(`/api/messages/messages/${activeChat?._id}`);
                setMessages([...messages.data].reverse());

            }catch(error){

                console.error(error.message);
                console.error(error.stack);

            }finally{
             
            setmessageLoading(false);

            };

        })();

    },[ setMessages , activeChat?._id ]);
    

    return{
        messageLoading
    }
};

export default useMessageInitialization;