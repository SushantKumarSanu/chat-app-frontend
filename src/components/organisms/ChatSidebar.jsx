import { useEffect, useRef, useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import searchIcon from '../../assets/images/search-line.svg'
import api from '../../services/api.js';

function ChatSidebar({chatlist,user,loading,onSelectChat,otherUserActivity,unreadByChat,unreadCount,setChatlist}){

    const[query,setQuery]= useState("");
    const[searchResult,setSearchResult] = useState([]);
    const searchTimer = useRef(null);
    const [reqRes,setReqRes] = useState();


        useEffect(()=>{
            if(searchTimer.current){
                clearTimeout(searchTimer.current);
            } 
    },[]);
    return<>
    <div className="sidebar">
        <div className="sidebar-header">
            <div className="avatar">PFL</div>
            <span className="name">{user?.username}</span>
        </div>
        <div className="search-box">
            <div className='search-section'>
            <div className="search-icon">
               <img src= {searchIcon} alt="" /> 
            </div>
            <div className="search-value"><input type="text" value={query} onChange={(e)=>{
                const value = e.target.value;

                setQuery(value);

        
                if(searchTimer.current) {
                    clearTimeout(searchTimer.current)
                };
                
                if(!value.trim()){
                    setSearchResult([]);

                    return;
                }


        
                searchTimer.current =
                    setTimeout(
                        async()=>{
                            try{
                                    const res = await api.get(`/api/users/search?query=${value}`)
                                    setSearchResult(res.data.result);

                            }catch(error){
                                    console.log(error.message);
                            }
                    },500);


            }} placeholder='Search'/></div>
            </div>
            <div className="search-result">
                {query && searchResult.length === 0 && (
                <div className="search-card">No users found</div>
                )}
                {searchResult?.map((result)=>{
                    return <div className='search-card' key={result._id} onClick={async()=>{
                        try{
                            const res = await api.post('/api/chat/chats',{
                                userId:result._id
                            });
                            setReqRes(res);
                        }catch(error){
                            console.log(error.message)
                        }
                    }}>
                        <span>{result?.email}</span>
                    </div>
                })}
                
                
                </div>
        </div>
            {
            chatlist?.map((elem)=>{

                const otherusers = user?._id
                    ? elem.users.find(u => String(u._id) !== String(user._id))
                    :null;
                const lastContent = elem.lastMessage?.content
            return <div key={elem._id} className="chat" onClick={()=>{
                const modifiedElem = {...elem};
                modifiedElem.unreadCount = 0;
                onSelectChat(modifiedElem);
                setChatlist(prev=>{
                    return prev.map((chat)=>{
                        if(String(chat._id)===String(modifiedElem._id)){
                            return{...chat,...modifiedElem}
                        };
                        return chat;
                    })
                })

            }}>

                <div className="avatar-wrap">
                    <div className="avatar">PFL</div>

                    {otherUserActivity[otherusers?._id]?.isOnline&&<span className="status-dot online"></span>}
                </div>
                <div className="contact-info">
                    <div className="contact-top">
                        <span className="name">{otherusers?.username??"Guest"}</span>
                        {elem.unreadCount>0 && <span className="unread-badge">{elem.unreadCount}</span>}
                    </div>
                    {otherUserActivity[otherusers?._id]?.typing
                    ?<span className="typing">typing</span>
                    :<span className="message-prev">{lastContent??"no messages yet"}</span> }

                </div>
            </div>

            })}
        </div> 
    </>
}


export default ChatSidebar;


