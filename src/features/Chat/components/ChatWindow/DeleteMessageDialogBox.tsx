import React from "react";

import { formatTime } from "../../utils/formatTime";
import type { DeleteMessage } from "./MessageList";
import api from "../../../../services/api";
import { useChatStore } from "../../store/chatStore";
import axios from "axios";

interface prop{
  setDeleteMessage:(view:null)=>void,
  selectedMessage:DeleteMessage,
  isDeleting :React.MutableRefObject<boolean> 
};


function DeleteMessageDialogBox({selectedMessage,setDeleteMessage,isDeleting}:prop){

  const updateMessages =  useChatStore(state=>state.updateMessages);
  const updateChatList = useChatStore(state=>state.updateChatList);
  const updateActiveChat = useChatStore(state=>state.updateActiveChat);


  const handleDeleteMessage = async()=>{
    try {
      console.log("delete Message handler run")
      const res = await api.delete(`/api/messages/messages/${selectedMessage.messageId}`);
      isDeleting.current = true

      if(res.data.chatId){
        updateActiveChat((chat)=>{
          return{...chat,lastMessage:res.data.lastMessage}
        });

        updateChatList((chatList)=>{
          return chatList.map((chat)=>{
            if(chat._id===res.data.chatId){
              return{...chat,lastMessage:res.data.lastMessage}
            }
            return chat
          })
        });

        updateMessages((messages)=>{
          return messages.map((message)=>{
            if(message._id===selectedMessage.messageId){
              return{...message,content:"This message was deleted by you."}
            }
            return message;
          });
        });
      }else{
        updateMessages((messages)=>{
          return messages.map((message)=>{
            if(message._id===selectedMessage.messageId){
              return{...message,content:"This message was deleted by you."}
            }
            return message;
          });
        }); 
      }
      setDeleteMessage(null);
    } catch (error) {
       if (axios.isAxiosError(error)) {
    console.error("Axios error:", error);
    console.error("Status:", error.response?.status);
    console.error("Status text:", error.response?.statusText);
    console.error("Response data:", error.response?.data);
    console.error("Response headers:", error.response?.headers);
    console.error("Request URL:", error.config?.url);
    console.error("Request method:", error.config?.method);
  } else {
    console.error("Unknown error:", error);
  }
    }
  }



    return<>
     <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl max-w-md w-full p-6 shadow-2xl relative flex flex-col gap-4">

                  <div className="flex items-start gap-4">
                    <div className=" w-11 h-11 rounded-full bg-error/10 border border-error/20 flex items-center justify-center 
                    flex-shrink-0 text-error">
                      <span className="material-symbols-outlined text-[24px]">delete_forever</span>
                    </div>
                    <div className="flex-1 pt-0.5 pr-2">
                      <h2 className=" text-lg font-semibold text-on-surface leading-tight">Delete Message?</h2>
                      <p className="text-sm text-on-surface-variant mt-2 leading-relaxed max-w-[320px]">
                        Are you sure you want to delete this message?
                      </p>
                    </div>
                    <button className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest
                     p-1 rounded-lg transition-colors flex-shrink-0 inline-flex items-center justify-center" onClick={()=>setDeleteMessage(null)}>
                        <span className="material-symbols-outlined !text-[20px] !leading-none">close</span>
                    </button>
                  </div>

                  <div className=" bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-3.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-primary">{selectedMessage.userName}</span>

                      <span className="text-[11px] text-on-surface-variant">{formatTime(selectedMessage.createdAt)}</span>
                    </div>

                    <p className=" text-[13.5px] text-on-surface/90 italic leading-relaxed">{selectedMessage.content}</p>
                  </div>

    
                  <div className=" flex items-center justify-end gap-3  pt-5 border-t border-outline-variant/20">
                   <button className="px-4 py-2 text-sm font-medium text-on-surface-variant bg-surface-container-high/60
                    hover:bg-surface-container-highest hover:text-on-surface border border-outline-variant/30 rounded-lg transition-colors"
                    onClick={()=>setDeleteMessage(null)}>
                    Cancel
                    </button>
                    <button className="px-4 py-2 text-sm font-medium bg-error/15 hover:bg-error/25 text-error border border-error/20 rounded-lg transition-colors shadow-sm flex items-center gap-1.5" onClick={handleDeleteMessage}>
                    <span className="material-symbols-outlined text-[18px]" >delete</span>
                    <span>Delete</span>
                    </button>
                  </div>
               </div>
              </div>
    </>
}


export default DeleteMessageDialogBox;