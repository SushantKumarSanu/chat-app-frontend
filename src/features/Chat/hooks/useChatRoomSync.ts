import { socket } from "../../../services/socket";
import { useEffect, useRef } from "react";
import { useChatStore } from "../store/chatStore";
import { useShallow } from "zustand/react/shallow";

function useChatRoomSync(){
    
    const chatIds = useChatStore(useShallow(state=>state.chatList.map(chat=>chat._id))); 


    const joinedChat = useRef(new Set<string>());

    const invalidChat = useRef(new Set<string>());

    const unJoinedChat = useRef(new Set<string>());
    const attemptCounter = useRef(0);



    const joinRoomHandler = (chatId:string):Promise<void> =>{
        return new Promise((resolve) => {
            if(attemptCounter.current>4){
                attemptCounter.current = 0 
                resolve();
                return;
            };

            attemptCounter.current++;

            socket.timeout(5000).emit("join chat",chatId,
                (err:Error,response:{success:boolean,code:string})=>{

                    if(err){

                        if(attemptCounter.current===5){
                            unJoinedChat.current.add(chatId);
                            attemptCounter.current = 0;
                            resolve();
                            return
                        };

                        joinRoomHandler(chatId).then(resolve);
                        return;

                    }else if(response.success){

                        joinedChat.current.add(chatId);
                        attemptCounter.current = 0;
                        resolve();
                        return;

                    }else if(!response.success&&response.code==="NOT_AUTHENTICATED"){

                        attemptCounter.current = 0;
                        resolve();
                        return;

                    }else if(!response.success&&response.code==="INVALID_CHAT"){

                        attemptCounter.current = 0;
                        invalidChat.current.add(chatId);
                        resolve();
                        return;

                    }else if(!response.success&&response.code==="INTERNAL_ERROR"){

                         if(attemptCounter.current===5){
                            unJoinedChat.current.add(chatId);
                        };
                        joinRoomHandler(chatId).then(resolve);
                        return
                    };

                    attemptCounter.current = 0;
                    resolve();
                    return;
                }
            )
        })
    } 



    useEffect(()=>{
        if(chatIds.length===0) return;

        const syncChat = async()=>{
            for(const chatId of chatIds){

                if(joinedChat.current.has(chatId)
                || invalidChat.current.has(chatId)
                || unJoinedChat.current.has(chatId)
                || !chatId ){
                    continue;
                };
                await joinRoomHandler(chatId);
            };
        }
        syncChat();

    },[chatIds]);
}
export default useChatRoomSync;