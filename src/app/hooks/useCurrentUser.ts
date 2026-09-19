import { useEffect } from "react";
import api from "../../services/api";
import useUserStore from "../store/userStore";
import axios from "axios";


interface Props{
  setUserLoading:(UserLoading:boolean)=>void
}

function useCurrentUser({setUserLoading}:Props){
  const setUser = useUserStore((state)=>state.setUser);
  const clearUser = useUserStore((state)=>state.clearUser);

      useEffect(()=>{
    (async () => {
      try{
        const userRes = await api.get("/api/protected/profile/userdetails");
        setUser(userRes.data.user);
      }catch(err){
        if(axios.isAxiosError(err)){
          console.log(err.response)
        }
        clearUser();
      }finally{
        setUserLoading(false);
      }; 
    })();
   },[setUser,clearUser,setUserLoading]);

}
export default useCurrentUser;