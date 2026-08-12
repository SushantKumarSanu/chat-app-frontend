import { useEffect, useRef, useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import searchIcon from '../../assets/images/search-line.svg'
import api from '../../services/api';




function SearchBox(){
    



    const[query,setQuery]= useState("");
    const[searchResult,setSearchResult] = useState([]);
    const searchTimer = useRef(null);




    useEffect(()=>{
        if(searchTimer.current){
            clearTimeout(searchTimer.current);
        } 
    },[]);




    const handleSearchChange = (e)=>{
        const value = e.target.value;
        setQuery(value);


        if(searchTimer.current) {
            clearTimeout(searchTimer.current)
        };
        
        
        if(!value.trim()){
            setSearchResult([]);
            return;
        }
 

        searchTimer.current =
            setTimeout(
                async()=>{
                    try{
                        const res = await api.get(`/api/users/search?query=${value}`)
                        setSearchResult(res.data.result);
                    }catch(error){
                        console.log(error.message);
                    }
                },500);

    }



    const handleOpenConversation = 
        async(result)=>{
            try{
                const res = await api.post('/api/chat/chats',{
                userId:result._id
            });
            }catch(error){
                console.log(error.message)
                }
            }



    return  <div className="search-box">
                <div className='p-4 shrink-0'>
                    <div className="relative group">
                        {/* <img src= {searchIcon} alt="" />  */}
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm group-focus-within:text-primary transition-colors duration-300">search</span>
                        <input className="w-full bg-surface-container-highest/50 border border-outline-variant/30 rounded-full py-2.5 pl-10 pr-4 text-on-surface font-body-md focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 placeholder:text-on-surface-variant/50 shadow-inner" type="text" value={query} onChange={handleSearchChange}placeholder='Search'/>
                    </div>
                </div>
                <div className="search-result">
                    {query && searchResult.length === 0 && (
                        <div className="search-card">No users found</div>
                    )}
                    {searchResult?.map((user)=>{
                        return  <div className='search-card' key={user._id} onClick={()=>{handleOpenConversation(user)}}>
                                    <span>{user?.email}</span>
                                </div>
                    })}
                </div>
            </div>
}




export default SearchBox;