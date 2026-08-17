import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./services/api.js";
import { socket } from "./services/socket.js";
import Login from "./pages/Login.jsx";
import Chat from "./pages/chat.jsx";
import AuthGuard from "./components/AuthGuard.jsx";
import GuestGuard from "./components/GuestGuard.jsx";

function App() {
  const [user,setUser] = useState(null);
  const [authLoading,setauthLoading] = useState(true)

  useEffect(()=>{
    (async () => {
      try{
        const userRes = await api.get("/api/protected/profile");
        setUser(userRes.data.user);
      }catch(err){
        setUser(null);
      }finally{
        setauthLoading(false);
      }; 
    })();
   },[]);
   
   
  useEffect(()=>{
    if(!user) return;
    const token = localStorage.getItem("token");
    socket.auth = {token};
    socket.connect();

    socket.on("connected",()=>{
      console.log("socket authenticated");
    })

    return ()=>{
      socket.disconnect();
    };
  },[user]);
  



  if(authLoading) return <div className="load">Loading...</div>
  
  return (
    <Routes>
        <Route path="/" element={<GuestGuard user={user}><Login setUser={setUser}/></GuestGuard>}/>
      <Route path="/chat" element={<AuthGuard user={user}><Chat user={user} setUser={setUser}/></AuthGuard>}/>
    </Routes>
  )
}

export default App;
