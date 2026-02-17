function ChatSidebar({chatlist,user,loading,onSelectChat,typingByChat}){

    
    return<>

    <div className="chatlist">
        <h2>Chatlist</h2>
        {
        chatlist?.map((elem)=>{

            const otherusers = elem.users.find(
                u => u._id !== user._id
            );

        return <div key={elem._id} className="chat" onClick={()=>{
            onSelectChat(elem);
        }}>
            <div>
            <h1>{otherusers?.username??"Guest"}</h1>
            <h3 className="typing">{typingByChat[elem._id]&&"typing"}</h3>
            </div>
        </div>

        })}
    </div>
    </>
}


export default ChatSidebar;