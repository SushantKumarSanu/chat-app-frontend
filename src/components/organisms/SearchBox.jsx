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
                <div className='search-section'>
                    <div className="search-icon">
                        <img src= {searchIcon} alt="" /> 
                    </div>
                    <div className="search-value"><input type="text" value={query} onChange={handleSearchChange}placeholder='Search'/>
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