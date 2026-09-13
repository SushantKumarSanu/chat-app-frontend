import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./layouts/AuthLayout/pages/Login.jsx";
import AuthGuard from "./layouts/AuthLayout/Guards/AuthGuard.jsx"
import GuestGuard from "./layouts/AuthLayout/Guards/GuestGuard.jsx"
import MainLayer from "./layouts/MainLayout/MainLayout.jsx";
import useSocketConnection from "./app/hooks/useSocketConnection.js";
import useCurrentUser from "./app/hooks/useCurrentUser.js";
import SignUp from "./layouts/AuthLayout/pages/SignUp.jsx";


function App() {

  
  const [userLoading,setUserLoading] = useState(true);

  useCurrentUser({setUserLoading});
  useSocketConnection();


  if(userLoading) return <div className="load">Loading...</div>
  
  return (
    <Routes>
      <Route path="/register" element={<GuestGuard  ><SignUp/></GuestGuard>}/>
      <Route path="/" element={<GuestGuard ><Login/></GuestGuard>}/>
      <Route path="/chat" element={<AuthGuard ><MainLayer /></AuthGuard>}/>

    </Routes>
  )
}

export default App;
