
import 'remixicon/fonts/remixicon.css';
import type { ChangeEvent } from 'react';


interface props{
    searchQuery:string,
    setSearchQuery:(value:string)=>void
}




function SearchBox({searchQuery,setSearchQuery}:props){    

    const handleSearchChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value;
        setSearchQuery(value);
    }



    return  <div className="search-box">
                <div className="p-3 md:p-4 shrink-0">
                    <div className="relative group">
                        {/* <img src= {searchIcon} alt="" />  */}
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 
                        text-on-surface-variant text-sm group-focus-within:text-primary transition-colors 
                        duration-300">search</span>
                        <input className="w-full bg-surface-container-highest/50 border border-outline-variant/30 
                        rounded-full py-2.5 pl-10 pr-4 text-on-surface font-body-md focus:outline-none 
                        focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 
                        placeholder:text-on-surface-variant/50 shadow-inner" type="text" value={searchQuery}
                        onChange={handleSearchChange}placeholder='Search'/>
                    </div>
                </div>

            </div>
}




export default SearchBox;