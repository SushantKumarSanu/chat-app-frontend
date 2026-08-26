import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./layouts/AuthLayout/pages/Login.jsx";
import AuthGuard from "../src/layouts/authLayout/guards/AuthGuard.jsx"
import GuestGuard from "../src/layouts/authLayout/guards/GuestGuard"
import MainLayer from "./layouts/mainLayout/MainLayout.jsx";
import useSocketConnection from "./app/hooks/useSocketConnection.js";
import useCurrentUser from "./app/hooks/useCurrentUser.js";
import SignUp from "./layouts/AuthLayout/pages/SignUp.jsx";
function App() {
  const [user,setUser] = useState(null);
  const [userLoading,setUserLoading] = useState(true);


  useCurrentUser({setUser,setUserLoading});
  useSocketConnection({user});


  if(userLoading) return <div className="load">Loading...</div>
  
  return (
    <Routes>
      <Route path="/register" element={<GuestGuard user={user} ><SignUp setUser={setUser}/></GuestGuard>}/>
      <Route path="/" element={<GuestGuard user={user}><Login setUser={setUser}/></GuestGuard>}/>
      <Route path="/chat" element={<AuthGuard user={user}><MainLayer user={user} setUser={setUser}/></AuthGuard>}/>

    </Routes>
  )
}

export default App;
