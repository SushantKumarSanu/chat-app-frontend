import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login.jsx"
import Chat from "./pages/chat.jsx"
import AuthGuard from "./components/AuthGuard.jsx"
import GuestGuard from "./components/GuestGuard.jsx"

function App() {
  return (
    <Routes>
        <Route path="/" element={<GuestGuard><Login /></GuestGuard>}/>
      <Route path="/chat" element={<AuthGuard><Chat/></AuthGuard>}/>
    </Routes>
  )
}

export default App;
