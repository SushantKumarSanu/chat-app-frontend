import type {ReactNode} from "react";
import { Navigate } from "react-router-dom"
import useUserStore from "../../../app/store/userStore";

function GuestGuard({children}:{children:ReactNode}){
    const user = useUserStore((state)=>state.user);


    if(user){
        return <Navigate to= "/chat" replace/>
    }
    return children;
}


export default GuestGuard ;