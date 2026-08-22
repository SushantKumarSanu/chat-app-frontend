import { useEffect } from "react";
import api from "../../services/api";


function useCurrentUser({setUser,setUserLoading}){

      useEffect(()=>{
    (async () => {
      try{
        const userRes = await api.get("/api/protected/profile/userdetails");
        setUser(userRes.data.user);
      }catch(err){
        setUser(null);
      }finally{
        setUserLoading(false);
      }; 
    })();
   },[setUser,setUserLoading]);

}
export default useCurrentUser;