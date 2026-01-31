import { useEffect, useState } from "react";
import api from "../services/api.js";


function Chat(){
    const [username,setUsername] = useState(null)
    useEffect(() => { 
        (async()=>{
        try{    
        const res = await api.get("/api/protected/profile");
        console.log("login info",res.data.user);
        const user = res.data.user
        setUsername(user.username);
        }catch(error){
            console.error(error.message);
        }
    })();
},[]);


    return <>
    <div className="chats">
        <h1>{username}</h1>
    </div>
    </>
}


export default Chat;