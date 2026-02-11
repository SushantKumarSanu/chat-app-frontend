function ChatSidebar({chatlist,user,loading,onSelectChat}){

    
    return<>

    <div className="chatlist">
        <h2>Chatlist</h2>
        {
        chatlist?.map((elem)=>{

            const otherusers = elem.users.find(
                u => u._id !== user._id
            );

        return <div key={elem._id} className="chat" onClick={()=>{
            console.log(elem)
            onSelectChat(elem);
        }}><h1>{otherusers?.username??"Guest"}</h1></div>

        })}
    </div>
    </>
}


export default ChatSidebar;